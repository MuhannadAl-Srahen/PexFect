import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wtskvwjjmmsdqoewzndp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0c2t2d2pqbW1zZHFvZXd6bmRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2OTI3NjYsImV4cCI6MjA3MTI2ODc2Nn0.YWHt9325fEWRp1pHfIA7BKo3HDEXEnhF2IwE_Ic6qFQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
