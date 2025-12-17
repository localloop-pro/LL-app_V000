import { headers } from "next/headers";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { z } from "zod";
import { auth } from "@/lib/auth";

function getOpenRouterFriendlyError(error: unknown): string {
  // We intentionally keep this user-facing and actionable (avoid dumping raw objects).
  const anyErr = error as
    | (Error & { statusCode?: number; responseBody?: string })
    | { statusCode?: number; responseBody?: string }
    | null
    | undefined;

  const statusCode = anyErr && typeof anyErr === "object" ? anyErr.statusCode : undefined;
  const responseBody =
    anyErr && typeof anyErr === "object" && typeof anyErr.responseBody === "string"
      ? anyErr.responseBody
      : undefined;
  const responseBodyLower = responseBody?.toLowerCase();

  // OpenRouter commonly returns 401 with message "User not found." for invalid API keys.
  if (
    statusCode === 401 ||
    responseBodyLower?.includes("user not found") ||
    responseBodyLower?.includes("invalid api key")
  ) {
    return [
      "OpenRouter authentication failed (401).",
      "Check OPENROUTER_API_KEY in .env.local (preferred) or .env (it should start with 'sk-or-'), then restart the dev server so Next.js reloads environment variables.",
    ].join(" ");
  }

  if (statusCode === 429) {
    return "OpenRouter rate limit hit (429). Please wait a bit and try again.";
  }

  if (anyErr instanceof Error) return anyErr.message;
  if (typeof error === "string") return error;
  return "Unknown AI error.";
}

// Zod schema for message validation
const messagePartSchema = z.object({
  type: z.string(),
  text: z.string().max(10000, "Message text too long").optional(),
});

const messageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "assistant", "system"]),
  parts: z.array(messagePartSchema).optional(),
  content: z.union([z.string(), z.array(messagePartSchema)]).optional(),
});

const chatRequestSchema = z.object({
  messages: z.array(messageSchema).max(100, "Too many messages"),
});

export async function POST(req: Request) {
  // Verify user is authenticated
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Parse and validate request body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        error: "Invalid request",
        details: parsed.error.flatten().fieldErrors,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { messages }: { messages: UIMessage[] } = parsed.data as { messages: UIMessage[] };

  // Initialize OpenRouter with API key from environment
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          "OpenRouter API key not configured. Set OPENROUTER_API_KEY in .env.local (preferred) or .env, then restart the dev server.",
      }),
      {
      status: 500,
      headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Catch common misconfigurations early (prevents confusing OpenRouter 401s).
  const looksPlaceholder = apiKey.includes("your-key") || apiKey.includes("placeholder");
  if (!apiKey.startsWith("sk-or-") || looksPlaceholder) {
    return new Response(
      JSON.stringify({
        error:
          "Invalid OPENROUTER_API_KEY. Paste a real OpenRouter key (starts with 'sk-or-') into your .env.local (preferred) or .env and restart the dev server.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // OpenRouter recommends sending these identifying headers.
  // We derive the referer from the request URL when possible, without exposing secrets.
  const origin = (() => {
    try {
      return new URL(req.url).origin;
    } catch {
      return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    }
  })();

  const openrouter = createOpenRouter({
    apiKey,
    headers: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL?.trim() || origin,
      "X-Title": "LL-app-V000",
    },
  });

  const result = streamText({
    model: openrouter(process.env.OPENROUTER_MODEL || "openai/gpt-5-mini"),
    messages: convertToModelMessages(messages),
    onError({ error }) {
      // streamText suppresses throws; log for server-side debugging.
      console.error("[/api/chat] streamText error:", error);
    },
  });

  return (
    result as unknown as {
      toUIMessageStreamResponse: (
        options?: ResponseInit & { onError?: (error: unknown) => string }
      ) => Response;
    }
  ).toUIMessageStreamResponse({
    // Return a clearer message instead of the default masked one.
    onError: getOpenRouterFriendlyError,
  });
}
