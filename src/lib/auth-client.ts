import { createAuthClient } from "better-auth/react";

/**
 * IMPORTANT:
 * This file is imported by Client Components, so we must not rely solely on
 * `process.env.NEXT_PUBLIC_APP_URL` at build time.
 *
 * Root cause for "sign up / sign in button not working":
 * - When `NEXT_PUBLIC_APP_URL` is missing or doesn't match the *actual* origin
 *   (Vercel preview URL, custom domain, etc.), Better Auth will attempt to
 *   initiate OAuth against the wrong host (often `http://localhost:3000`),
 *   making the button appear to do nothing.
 *
 * Fix:
 * - Always prefer the runtime browser origin (`window.location.origin`) when
 *   we're on the client. This ensures we match whatever port/host Next dev
 *   picked (e.g. 3004 when 3000 is busy) so OAuth popups don't fail with
 *   "Load failed".
 */
const resolvedBaseURL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: resolvedBaseURL,
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
} = authClient;