import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import type { Request, Response } from 'express';

/**
 * Supabase server client for the Angular Express host (cookie-based session).
 * Loads credentials from the same env names as `.env.local` (read at call time so
 * `dotenv` in `server.ts` runs first).
 */
export const createExpressServerClient = (req: Request, res: Response) => {
  const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseKey = process.env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY'];

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY',
    );
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(req.headers.cookie ?? '').map(({ name, value }) => ({
          name,
          value: value ?? '',
        }));
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options));
        });
        for (const [key, headerValue] of Object.entries(headers)) {
          res.setHeader(key, headerValue);
        }
      },
    },
  });
};
