import { getLongUrl, storeClicks } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";



const RedirectLink = () => {

    const {id} = useParams()

    const {loading, data, fetchData: fn} = useFetch(getLongUrl, id);

    const {loading:loadingStats, fetchData:fnStats} = useFetch(storeClicks, {
        id: data?.id,
        original_url: data?.original_url
    });


    useEffect(() => {
        fn()
    }, [])

    useEffect(() => {
        if(!loading && data) {
            fnStats();
        }
    }, [loading])

    if(loading || loadingStats) {
        return (
            <>
                <BarLoader width={"100%"} color="#36d7b7"/>
            </>
        );
    }
    return <div>
        Redirect Link
    </div>
}


export default RedirectLink;