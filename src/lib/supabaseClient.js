import { createClient } from '@supabase/supabase-js';

// Vite exposes .env variables on import.meta.env (not process.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bstfctifxvkmklghgwvz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdGZjdGlmeHZrbWtsZ2hnd3Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzNjQwMzksImV4cCI6MjA5OTk0MDAzOX0.YcNHBXOWsqYXY5QWslcHsin6Uo8G7fGphXy5tDoQsTA';
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdGZjdGlmeHZrbWtsZ2hnd3Z6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDM2NDAzOSwiZXhwIjoyMDk5OTQwMDM5fQ.DWqQfiROBB9xkVkISj_V_nq4pmVy5EX0X7XUBW7Yx2s';

// Regular client — used for auth operations (sign in, sign out, auth state)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client with service role key — bypasses Row Level Security for all DB queries
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
