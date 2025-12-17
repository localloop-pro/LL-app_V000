"use client";

/**
 * Minimal `useToast` implementation backed by `sonner`.
 *
 * Why this exists:
 * - This repo primarily uses `sonner` for toasts.
 * - Some parts of the codebase expect a shadcn-like API: `toast({ title, description })`.
 * - We intentionally do NOT expose any internal state here (Sonner manages it).
 */

import { toast as sonnerToast } from "sonner";

export type ToastInput = {
  title?: string;
  description?: string;
  /**
   * Optional variant hint. Sonner doesn't have the exact same variants as shadcn
   * toasts, but we can map destructive → error for a reasonable UX.
   */
  variant?: "default" | "destructive";
  /**
   * Optional duration in ms.
   */
  duration?: number;
};

export function toast({ title, description, variant, duration }: ToastInput) {
  const message = title?.trim() || "Notice";

  const options = {
    ...(description !== undefined ? { description } : {}),
    ...(duration !== undefined ? { duration } : {}),
  };

  if (variant === "destructive") {
    return sonnerToast.error(message, options);
  }

  return sonnerToast(message, options);
}

export function useToast() {
  return {
    toast,
    dismiss: (toastId?: string | number) => {
      if (toastId === undefined) {
        sonnerToast.dismiss();
        return;
      }
      sonnerToast.dismiss(toastId);
    },
  };
}
