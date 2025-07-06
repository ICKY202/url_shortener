
import {useState} from 'react';

const useFetch = (cb, options={}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);


    const fetchData = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const data = await cb(options, ...args);
            console.log(data);
            setData(data);
        }catch(err) {
            setError(err);
        }finally {
            setLoading(false);
        }
    }

    return {loading, error, data, fetchData};
}


export default useFetch;