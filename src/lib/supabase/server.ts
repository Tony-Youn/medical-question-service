import { createServerClient } from "@supabase/ssr";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

let cookiesFunc: () => Promise<{
  get: (name: string) => { name: string; value: string } | undefined;
  getAll: () => Array<{ name: string; value: string }>;
  set: (
    name: string,
    value: string,
    options?: {
      httpOnly?: boolean;
      secure?: boolean;
      maxAge?: number;
      path?: string;
      sameSite?: "strict" | "lax" | "none";
      domain?: string;
    }
  ) => void;
}>;

try {
  // Dynamic import to prevent static analysis issues
  cookiesFunc = async () => {
    const { cookies } = await import("next/headers");
    return cookies();
  };
} catch (e) {
  // If next/headers is not available, we'll handle it differently
  console.warn("next/headers not available, falling back to req/res cookies");
}

// For App Router - using next/headers
export async function createClient() {
  try {
    // Use cookiesFunc which properly awaits the cookies
    const cookieStore = await cookiesFunc();

    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                // Fix for sameSite type incompatibility
                const safeOptions = options
                  ? {
                      ...options,
                      sameSite: options.sameSite as
                        | "strict"
                        | "lax"
                        | "none"
                        | undefined,
                    }
                  : undefined;

                cookieStore.set(name, value, safeOptions);
              });
            } catch (error) {
              // This can be ignored if you have middleware refreshing user sessions
              console.warn("Unable to set cookies in this context");
            }
          },
        },
      }
    );
  } catch (error) {
    // Fallback for Pages Router (needs req/res objects)
    throw new Error(
      "To use this function in Pages Router, please pass request/response objects using createServerClientFromRequest"
    );
  }
}

// For Pages Router - using req/res objects
export async function createServerClientFromRequest(
  req: Request | { cookies: ReadonlyRequestCookies },
  res?: Response | { cookies: (cookie: ResponseCookie) => void }
) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookiesMap = new Map();
          if ("cookies" in req) {
            // Fix for ReadonlyRequestCookies type issue
            const cookieObj = req.cookies as unknown as Record<string, string>;
            for (const name of Object.keys(cookieObj)) {
              cookiesMap.set(name, cookieObj[name]);
            }
            return Array.from(cookiesMap).map(([name, value]) => ({
              name,
              value,
            }));
          }
          // Handle Request object
          const cookieString = req.headers?.get("cookie") || "";
          cookieString.split(";").forEach((cookie) => {
            const [name, ...rest] = cookie.split("=");
            if (name) {
              const trimmedName = name.trim();
              cookiesMap.set(trimmedName, rest.join("=").trim());
            }
          });
          return Array.from(cookiesMap).map(([name, value]) => ({
            name,
            value,
          }));
        },
        setAll(cookiesToSet) {
          if (!res) return;
          cookiesToSet.forEach(({ name, value, options }) => {
            if ("cookies" in res) {
              res.cookies({
                name,
                value,
                ...options,
              });
            } else {
              // Handle Response object
              const cookieValue = `${name}=${value}`;
              const cookieOptions = options
                ? Object.entries(options)
                    .map(([key, value]) => `${key}=${value}`)
                    .join("; ")
                : "";
              const cookie =
                cookieValue + (cookieOptions ? `; ${cookieOptions}` : "");
              res.headers.append("Set-Cookie", cookie);
            }
          });
        },
      },
    }
  );
}
