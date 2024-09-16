import { createClient } from '@supabase/supabase-js';

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anon key must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
