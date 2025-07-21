
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yiidyfidkhwtlyucacnd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpaWR5Zmlka2h3dGx5dWNhY25kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTkyOTAsImV4cCI6MjA2MTQzNTI5MH0.yY691_2ZeHP-gMJ8Osl4tLG7r05o5DyRmkXRRQp2yQc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
