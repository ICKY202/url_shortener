
import supabase from "./supabaseConnect";
// import { supabaseUrl } from "./supabaseConnect";

export async function apiAuth({email, password}) {

    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if(error) {
        throw new Error(error.message);
    }

    return data;

    
}