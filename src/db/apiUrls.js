import supabase from "./supabaseConnect";


export async function getUrls(userId) {
    const {data, error} = await supabase.from('urls').select('*').eq('user_id', userId);

    if(error) throw new Error("Unable to load urls from supabase");

    return data;
}


export async function deleteUrl(id) {
    const {data, error} = await supabase.from('urls').delete().eq('id', id);

    if(error) throw new Error(error);

    return data;
}