import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseAnonKey ? "KEY OK" : "KEY MISSING");

// Check if environment variables are properly configured
if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'your_supabase_project_url_here' || 
    supabaseAnonKey === 'your_supabase_anon_key_here') {
  console.warn("⚠️ Supabase environment variables are not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
}

// Create Supabase client - will be null if env vars are missing or placeholder values
export const supabase = (supabaseUrl && supabaseAnonKey && 
                         supabaseUrl !== 'your_supabase_project_url_here' && 
                         supabaseAnonKey !== 'your_supabase_anon_key_here') 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => {
  return supabase !== null && 
         !!supabaseUrl && 
         !!supabaseAnonKey && 
         supabaseUrl !== 'your_supabase_project_url_here' && 
         supabaseAnonKey !== 'your_supabase_anon_key_here';
};