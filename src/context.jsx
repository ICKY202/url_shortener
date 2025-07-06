import {createContext, useContext, useEffect} from "react";
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./db/apiAuth";


const UrlContext = createContext();

const UrlProvider = ({children}) => {
    const {data:user, fetchData:fetchUser, loading } = useFetch(getCurrentUser);

    const isAuthenticated = user?.role === 'authenticated';

    useEffect(() => {
        fetchUser();
    }, []);

    return <UrlContext.Provider value={{user, fetchUser, loading, isAuthenticated}}>{children}</UrlContext.Provider>
}
export const UrlState = () => useContext(UrlContext);
export default UrlProvider;

