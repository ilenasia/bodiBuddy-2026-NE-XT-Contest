import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nueicfudszompszjvhys.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_gumD-1X0lNkAMR31BWRzSQ_28FshljQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);