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
 * - Prefer the build-time env var if provided, otherwise use the runtime
 *   browser origin (`window.location.origin`) when available.
 */
const resolvedBaseURL =
  process.env.NEXT_PUBLIC_APP_URL ??
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

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