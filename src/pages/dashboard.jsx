import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarLoader } from "react-spinners";

const Dashboard = () => {

    const loader = false;
    return <div className="flex flex-col gep-2">
            {loader && <BarLoader width={"100%"} color="#397f75"/>}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Links created</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>0</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Link Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>0</p>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-between">
                <h1 className="text-4xl font-extrabold">My Links</h1>
                <Button>Create Link</Button>
            </div>
            
    </div>

}


export default Dashboard;


