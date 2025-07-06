


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import Error from "@/components/ui/error";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import useFetch from "@/hooks/use-fetch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signup } from "../../db/apiAuth";

export default function Signup() {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({name: "", email: "", password: "", profile_pic: null});
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {loading, data, error, fetchData} = useFetch(signup, formData);
    
    useEffect(() => {
        if(error === null && data) {
            const longUrl = searchParams.get('create');
            navigate('/dashboard?' + `${searchParams.get('create') ? "create=" + longUrl : ""}`);
        }
    }, [data, error]);


    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if(files) console.log(files[0]);
        setFormData((prev) => {
            return {
                ...prev,
                [name]: files ? files[0] : value
            }
        });
    }
    
    const handleSignup = async () => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required("Name is required"),
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().min(6, "password must be at least 6 characters").required('password is required'),
                profile_pic: Yup.mixed().required('Profile picture is required'),
            })
            await schema.validate(formData, {abortEarly: false});
            await fetchData();
        }catch (e) {
            const newErrors = {};
            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Signup if you have already not an account ?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Input 
                        value={formData.name}
                        name="name"
                        type="text"
                        placeholder="Enter Name"
                        onChange={handleChange}
                    />
                    {errors.name && <Error message={errors.name}/>}
                </div>
                <div className="space-y-1">
                    <Input 
                        value={formData.email}
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                    />
                    {errors.email && <Error message={errors.email}/>}
                </div>

                <div className="space-y-1">
                    <Input 
                        value={formData.password}
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                    />
                    {errors.password && <Error message={errors.password} />}
                </div>
                <div className="space-y-1">
                    <Input 
                        name="profile_pic"
                        type="file"
                        onChange={handleChange}
                    />
                    {errors.profile_pic && <Error message={errors.profile_pic} />}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSignup}>{loading ? <BeatLoader size={10} color="#58c7ca" /> : "Signup"}</Button>
            </CardFooter>
        </Card>
    );

}