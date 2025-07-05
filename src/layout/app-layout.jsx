import { Outlet } from "react-router-dom";
import Header from "../components/ui/header";

const APPLayout = () => {
    return <div>
        <main className="min-h-screen container">
            <Header/>
            <Outlet/>
        </main>
        <div className="p-10 text-center bg-gray-800 mt-10 text-white">
            made with ❤️ by Vignesh
        </div>
    </div>
}

export default APPLayout;