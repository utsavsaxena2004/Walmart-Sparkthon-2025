import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

// Check if we're using demo/placeholder values
export const isSupabaseConfigured = 
  supabaseUrl !== 'https://demo.supabase.co' && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseAnonKey !== 'demo-key' &&
  supabaseAnonKey !== 'your-anon-key' &&
  supabaseAnonKey !== 'your-anon-key-here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          sensory_preferences: any;
          shopping_preferences: any;
          allergens: string[];
          preferred_brands: string[];
          emergency_contact: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          sensory_preferences?: any;
          shopping_preferences?: any;
          allergens?: string[];
          preferred_brands?: string[];
          emergency_contact?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          sensory_preferences?: any;
          shopping_preferences?: any;
          allergens?: string[];
          preferred_brands?: string[];
          emergency_contact?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}