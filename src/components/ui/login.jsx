
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
import {login} from "../../db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {loading, data, error, fetchData} = useFetch(login, formData);
    
    useEffect(() => {
        if(error === null && data) {
            const longUrl = searchParams.get('create');
            navigate('/dashboard?' + `${searchParams.get('create') ? "create=" + longUrl : ""}`);
        }
    }, [data, error]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }
    
    const handleLogin = async () => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().min(6, "password must be at least 6 characters").required('password is required')
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
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to application</CardDescription>
            </CardHeader>
            {error?.message}
            <CardContent className="space-y-2">
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
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogin}>{loading ? <BeatLoader size={10} color="#58c7ca" /> : "Login"}</Button>
            </CardFooter>
        </Card>
    );

}