import { useEffect } from "react";
import { UrlState } from "@/context";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";



export default function RequireAuth({children}) {

    const {isAuthenticated, loading} = UrlState();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated && !loading) {
            navigate('/auth');
        }
    }, [isAuthenticated, loading]);

    if(loading) return <BarLoader width={"100%"} color="#36d7b7"/>

    if(isAuthenticated)  return children;
    
}
