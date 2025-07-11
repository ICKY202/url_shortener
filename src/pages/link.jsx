import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { getUrl, deleteUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";



const Link = () => {
    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement('a');
        anchor.href = imageUrl;
        anchor.download = fileName;

        document.body.appendChild(anchor);
        anchor.click();

        document.body.removeChild(anchor);
    }
    const{id} = useParams()
    const {user} = UrlState();
    const navigate = useNavigate();

    const {data:url, error, loading, fetchData: fnUrl} = useFetch(getUrl, {id, user_id: user?.id});
    const {data:stats, loading:loadingStats, fetchData: fnClicks} = useFetch(getClicksForUrl, url?.id);
    const {loading:loadingDelete, fetchData: fnDelete} = useFetch(deleteUrl, id);
    console.log(error);

    useEffect(() => {
        fnUrl();
        fnClicks();
    }, []);

    if(error) navigate('/dashboard');
    let link = "";
    if(link) {
        link = url?.custom_url ? url?.custom_url : url.short_url;
    }
    return <>
        {(loading || loadingStats) && <BarLoader className="mb-4" width={"100%"} color="#58c7ca"/>}
        <div className="flex gap-8 justify-between">
            <div className="flex flex-col gap-4 items-start rounded-lg sm:w-2/5">
                <span>{url?.title}</span>
                <a href={`https:/trimrr.in/${link}`} target="_blank" className="flex items-center gap-1 hover:underline cursor-pointer">
                    https:/trimrr.in/{link}
                </a>
                <a href={url?.original_url} target="_blank">
                    {url?.original_url}
                </a> 
                <span className="flex items-end font-extralight text-sm">{new Date(url?.created_at).toLocaleString()}</span>
                <div className="flex gap-2 ">
                    <Button variant="ghost" onClick={() => navigator.clipboard.writeText(`https://trimrr.in/${url?.short_url}`)}>
                        <Copy/>
                    </Button>
                    <Button variant="ghost" onClick={downloadImage}>
                        <Download/>
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            fnDelete().then(() => {
                            navigate("/dashboard");
                            })
                        }
                        disable={loadingDelete}
                    >
                        {loadingDelete ? (<BeatLoader size={5} color="white" />) : (<Trash />)}
                    </Button>
                </div>
                <img src={url?.qr} alt="qrcode" className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain" />
            </div>
            <Card className="sm:w-3/5">
                <CardHeader>
                    <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
                </CardHeader>
                {stats && stats.length ? (
                <CardContent className="flex flex-col gap-6">
                <Card>
                    <CardHeader>
                       <CardTitle>Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{stats?.length}</p>
                    </CardContent>
                </Card>

                <CardTitle>Location Data</CardTitle>
                <Location stats={stats} />
                <CardTitle>Device Info</CardTitle>
                <DeviceStats stats={stats} />
                </CardContent>) : 
                    (<CardContent>
                            {loadingStats === false
                                ? "No Statistics yet"
                                : "Loading Statistics.."}
                    </CardContent>)}
            </Card>
        </div>
    </>

}

export default Link;