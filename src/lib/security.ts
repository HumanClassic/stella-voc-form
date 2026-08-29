import crypto from "node:crypto";
import { cookies, headers } from "next/headers";

export const CSRF_COOKIE_NAME = "survey_csrf";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function normalizeOrigin(value: string | null): string | null {
  if (!value) return null;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function getAllowedOrigins(): string[] {
  return [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    ...(process.env.APP_URL ? [process.env.APP_URL] : []),
    ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ].filter(Boolean) as string[];
}

export async function validateOrigin(): Promise<void> {
  const headerList = await headers();
  const originHeader = normalizeOrigin(headerList.get("origin"));
  const refererHeader = normalizeOrigin(headerList.get("referer"));
  const hostHeader = headerList.get("host");

  const allowedOrigins = new Set(getAllowedOrigins());

  if (originHeader && !allowedOrigins.has(originHeader)) {
    throw new Error("Origin not allowed.");
  }

  if (refererHeader && !allowedOrigins.has(refererHeader)) {
    throw new Error("Referer not allowed.");
  }

  if (originHeader && hostHeader) {
    const originHost = new URL(originHeader).host;
    if (originHost !== hostHeader && !allowedOrigins.has(originHeader)) {
      throw new Error("Origin host mismatch.");
    }
  }
}

export function createCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function validateCsrfToken(token: string): Promise<void> {
  if (!token) {
    throw new Error("CSRF token missing.");
  }

  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;

  if (!cookieToken || !crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(cookieToken),
  )) {
    throw new Error("CSRF token invalid.");
  }
}

export async function checkRateLimit(): Promise<void> {
  const headerList = await headers();
  const clientIp =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const existing = rateLimitStore.get(clientIp) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > existing.resetAt) {
    rateLimitStore.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    throw new Error("Too many requests. Please try again later.");
  }

  rateLimitStore.set(clientIp, {
    count: existing.count + 1,
    resetAt: existing.resetAt,
  });
}
