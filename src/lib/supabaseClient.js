import { createClient } from '@supabase/supabase-js';

const supabaseUrl = typeof process !== 'undefined' && process.env ? process.env.VITE_SUPABASE_URL : (window.VITE_SUPABASE_URL || 'https://bstfctifxvkmklghgwvz.supabase.co');
const supabaseKey = typeof process !== 'undefined' && process.env ? process.env.VITE_SUPABASE_ANON_KEY : (window.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdGZjdGlmeHZrbWtsZ2hnd3Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzNjQwMzksImV4cCI6MjA5OTk0MDAzOX0.YcNHBXOWsqYXY5QWslcHsin6Uo8G7fGphXy5tDoQsTA');

export const supabase = createClient(supabaseUrl, supabaseKey);

const serviceRoleKey = typeof process !== 'undefined' && process.env ? process.env.SUPABASE_SERVICE_ROLE_KEY : (window.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdGZjdGlmeHZrbWtsZ2hnd3Z6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDM2NDAzOSwiZXhwIjoyMDk5OTQwMDM5fQ.DWqQfiROBB9xkVkISj_V_nq4pmVy5EX0X7XUBW7Yx2s');
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
