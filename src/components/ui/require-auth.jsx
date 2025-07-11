import { useEffect } from "react";
import { UrlState } from "@/context";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";



export default function RequireAuth({children}) {
    
    const {isAuthenticated, loading, fetchUser} = UrlState();
    console.log(isAuthenticated, loading);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);
    useEffect(() => {
        // fetchUser();
        if(!isAuthenticated && !loading) {
            navigate('/auth');
        }
    }, [isAuthenticated, loading]);

    if(loading) return <BarLoader width={"100%"} color="#36d7b7"/>
    if(isAuthenticated)  return children; 
}
