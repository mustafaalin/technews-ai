// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// // Create Supabase client - will be null if env vars are missing
// export const supabase = supabaseUrl && supabaseAnonKey 
//   ? createClient(supabaseUrl, supabaseAnonKey)
//   : null;

// // Helper function to check if Supabase is available
// export const isSupabaseAvailable = () => {
//   return supabase !== null && supabaseUrl && supabaseAnonKey;
// };
import { createClient } from '@supabase/supabase-js';

// Ortam değişkenlerini al
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug için log ekleyelim
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseAnonKey ? "KEY OK" : "KEY YOK");

// Eğer değerler yoksa hata logla
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase environment variables tanımlı değil!");
}

// Supabase client oluştur
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

// Supabase hazır mı kontrol fonksiyonu
export const isSupabaseAvailable = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};
console.log("import.meta.env", import.meta.env);
