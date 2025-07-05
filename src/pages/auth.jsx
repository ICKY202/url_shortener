import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "@/components/ui/login";
import Signup from "@/components/ui/signup";



const Auth = () => {
    const [searchParam] =useSearchParams();
    return <div className="flex flex-col items-center gap-10">
        <h1 className="text-6xl font-extrabold">{searchParam.get('create') ? "Hold up! Lets login first..." : "Login / Signup"}</h1>
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className={"grid w-full grid-cols-2"}>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Login/>
            </TabsContent>
            <TabsContent value="signup">
                <Signup/>
            </TabsContent>
        </Tabs>
    </div>

}

export default Auth;