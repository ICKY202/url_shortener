import supabase from "./supabaseConnect";



export async function getClicks(urlIds) {
    console.log(urlIds);
    const {data, error} = await supabase.from('clicks').select('*').in('url_id', urlIds);

    if(error) throw new Error(error);

    return data;

}

export async function getClicksForUrl(url_id) {
    const {data, error} = await supabase.from('clicks').select('*').eq('url_id', url_id).single();
    if(error) throw new Error(error);

    return data;
}