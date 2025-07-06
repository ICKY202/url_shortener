import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FilterIcon } from "lucide-react";
import { BarLoader } from "react-spinners";
import {useEffect, useState} from 'react';

import {getUrls} from '../db/apiUrls';
import {getClicks} from '../db/apiClicks';
import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context";
import LinkCard from "@/components/ui/link-card";

const Dashboard = () => {
    const [query, setQuery] = useState("");
    const {user} = UrlState();
    const {data: urls, error, loading, fetchData: fnUrls} = useFetch(getUrls, user?.id);
    const {data: clicks, loading:loadingClicks, fetchData: fnClicks} = useFetch(getClicks, urls?.map((url) => url.id));
    console.log(user.id, urls, clicks);
    useEffect(() => {
        fnUrls();
    }, []);

    useEffect(() => {
        if(urls?.length){
            console.log("hello");
            fnClicks();
        } 
    }, [urls?.length]);

    const filteredUrls = urls?.filter((url) => url?.title?.toLowerCase().includes(query.toLowerCase()));


    return <div className="flex flex-col gap-4">
            {loading || loadingClicks && <BarLoader width={"100%"} color="#397f75"/>}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Links created</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{urls?.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Link Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{clicks?.length}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-between">
                <h1 className="text-4xl font-extrabold">My Links</h1>
                <Button>Create Link</Button>
            </div>
            <div className="relative">
                <Input value={query} type="text" placeholder="Filter the urls" onChange={(e) => setQuery(e.target.value)}/>
                <FilterIcon className="absolute top-2 right-1 p-1"/>
            </div>
            {error && <Error message={error?.message} />}
            {(filteredUrls || []).map((url, id) => {
                return <LinkCard key={id} url={url} fetchUrls={fnUrls} />
            })}
    </div>

}


export default Dashboard;


