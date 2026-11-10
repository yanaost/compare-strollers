/**
 * The backend origin, in one place.
 *
 * Reaches the browser through next.config.ts's `env` block, which bridges the
 * deploy host's existing VITE_BASE_URL. Server-side callers (the build-time
 * prefetch) read the environment directly instead.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
