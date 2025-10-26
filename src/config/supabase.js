import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rlozykcakmbrnfjfjqhe.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsb3p5a2Nha21icm5mamZqcWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODQwMzMsImV4cCI6MjA3NjY2MDAzM30.4eVxu9YIgAwBuKhT7c_U61eGd2X4BQqb4KckFVvf6_g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
