import { UAParser } from "ua-parser-js";
import supabase, { supabaseUrl } from "./supabaseConnect";


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

export async function createUrl({title, original_url, custom_url, user_id}, qrcode) {
    const short_url = Math.random().toString(36).substring(2, 6);
    const fileName = `qr-${short_url}`;
    const {error: storageError} = await supabase.storage.from('qr').upload(fileName, qrcode);

    if(storageError) throw new Error(storageError.message);

    const qr = `${supabaseUrl}/storage/v1/object/public/qr/${fileName}`;

    const {data, error} = await supabase.from('urls').insert([
        {
            title,
            original_url,
            custom_url: custom_url || null,
            user_id,
            short_url,
            qr
        }
    ]);

    if(error) throw new Error(error);

    return data;

}


export async function getLongUrl(id) {
    const {data, error} = await supabase.from('urls').select('id, original_url').or(`short_url.eq.${id}, custom_url.eq.${id}`).single();

    if(error) {
        console.error(error);
        throw new Error("Unable to load URLs");
    }

    return data;
}


const parser = new UAParser();

export const storeClicks = async ({id, original_url}) => {
    try {
        const res = parser.getResult();
        const device = res.type || "desktop";

        //htts://ipapi.co/json => to get user location, country

        const response = await fetch("https://ipapi.co/json");

        const {city, country_name: country} = await response.json();

        await supabase.from('clicks').insert({
            url_id: id,
            city: city,
            country: country,
            device: device
        });
        window.location.href = original_url;
    } catch(error) {
        console.error("Error recording click:", error);
    }
}