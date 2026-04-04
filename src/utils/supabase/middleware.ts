import type { NextFunction, Request, Response } from 'express';

import { createExpressServerClient } from './server';

/**
 * Refreshes the Supabase auth session from cookies on each request (Express equivalent
 * of Next.js middleware + `getUser()`).
 */
export async function supabaseSessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!process.env['NEXT_PUBLIC_SUPABASE_URL'] || !process.env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY']) {
    next();
    return;
  }

  try {
    const supabase = createExpressServerClient(req, res);
    await supabase.auth.getUser();
  } catch {
    // Best-effort refresh; continue serving the page without blocking.
  }

  next();
}
