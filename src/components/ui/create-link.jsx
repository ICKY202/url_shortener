import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from 'yup';
import {useState, useRef, useEffect} from 'react';

import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { Card } from "./card";
import { QRCode } from "react-qrcode-logo";


const CreateLink = () => {
     const navigate = useNavigate();
     const ref = useRef();
     const[searchParams, setSearchParams] = useSearchParams();
     const {user} = UrlState()

     const longLink = searchParams.get('create');
     const [errors, setErrors] = useState({});
     const [formData, setFormData] = useState({title: '', original_url: `${longLink ? longLink : ""}`, custom_url: '' });
     
     const schema = yup.object().shape({
        title: yup.string().required('Title is required'),
        original_url: yup.string().url('must be a valid URL').required('long url is required'),
        custom_url: yup.string()
     })
     const handleChange = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.id]: e.target.value
            }
        })
     }
    const {data, error, fetchData:fnCreateurl, loading } = useFetch(createUrl, {...formData, user_id: user?.id})
     console.log(data);
    useEffect(() => {
        if(error == null && data) {
            navigate(`/link/${data[0].id}`);
        }
    }, [error, data]);
    const createLink = async () => {
        console.log("creating link");
        setErrors([]);
        try {
            await schema.validate(formData, {abortEarly: false})
            const canvas = ref.current.canvasRef.current;
            console.log(canvas)
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));
            await fnCreateurl(blob);
        }catch(err) {
            const newErrors = {};
            err?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            })
            setErrors(newErrors)
        }
    }
    return (
        <Dialog defaultOpen={longLink} onChange={(res) => {if(!res) setSearchParams({})}}>
            <DialogTrigger asChild>
                <Button variant="destructive">Create Link</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
                </DialogHeader>
                {formData?.original_url ? <QRCode value={formData?.original_url} size={250} ref={ref}/> : ""}
                <Input id="title" value={formData?.title} placeholder="Short Link's Title" onChange={handleChange}/>
                {errors?.title && <Error message={errors?.title}/>}
                <Input id="original_url" value={formData?.longUrl} placeholder="Enter your loong URL" onChange={handleChange}/>
                {errors?.original_url && <Error message={errors?.original_url}/>}
                <div className="flex items-center gap-2">
                    <Card className="p-2">trimrr.in</Card>
                    <Input id="custom_url" value={formData?.custom_url} placeholder="Custom Link (optional)" onChange={handleChange} />
                </div>
                {error && <Error message={error?.message}/>}
                <DialogFooter className="sm:justify-start">
                    <Button disabled={loading} className= "cursor-pointer" variant="destructive" onClick={createLink}>{loading ? <BeatLoader size={10} color="white"/> : "Create"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateLink;