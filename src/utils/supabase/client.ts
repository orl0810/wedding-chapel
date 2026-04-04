import { createBrowserClient } from '@supabase/ssr';

import { environment } from '../../environments/environment';

export const createClient = () =>
  createBrowserClient(environment.supabaseUrl, environment.supabaseAnonKey);
