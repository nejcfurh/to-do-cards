/* eslint-disable no-undef */
import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://mgpihvqzjbhiowlsiuac.supabase.co';

let supabaseKey;

if (import.meta.env.NETLIFY === 'true') {
  supabaseKey = process.env.VITE_SUPABASE_KEY;
} else {
  supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
