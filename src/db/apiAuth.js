
import supabase, { supabaseUrl } from "./supabaseConnect";
// import { supabaseUrl } from "./supabaseConnect";


export async function login({email, password}) {

    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if(error) {
        throw new Error(error.message);
    }

    return data;

    
}

export async function getCurrentUser() {
    const {data, error} = await supabase.auth.getSession();

    if(error) {
        throw new Error(error.message);
    }

    return data.session?.user || null;
}

export async function signup({name, email, password, profile_pic}) {
    const fileName = `db-${name.split(" ").join("-")}-${Math.random()}`;
    const {error: storageError} = await supabase.storage.from('profile-pic').upload(fileName, profile_pic);
    if(storageError) {
    return new Error(storageError.message);
    }
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                profile_pic: `${supabaseUrl}/storage/v1/object/public/profile-pic/${fileName}`
            }
        }
    });

    if(error) return new Error(error.message);
     return data
}