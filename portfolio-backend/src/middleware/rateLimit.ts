import { rateLimitWindowMs } from "../config/env";

export const rateLimitStore = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

export const cleanupExpiredRateLimits = (now: number) => {
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetAt) {
      rateLimitStore.delete(key);
    }
  }
};

export const applyRateLimit = (key: string, limit: number) => {
  const now = Date.now();
  cleanupExpiredRateLimits(now);
  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return { allowed: true as const };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return { allowed: false as const };
  }

  return { allowed: true as const };
};
