import supabase from "./supabaseConnect";



export async function getClicks(urlId) {
    const {data, error} = await supabase.from('').select('*').in('url_id', urlId);

    if(error) throw new Error(error);

    return data;

}