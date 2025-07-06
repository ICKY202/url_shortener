import { Link, useNavigate } from "react-router-dom";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel,DropdownMenuItem, DropdownMenuSeparator} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import { UrlState } from "@/context";
const   Header = () => {
    const navigate = useNavigate();
    const {user} = UrlState();
    return <nav className="py-2 flex items-center justify-between">
        <Link to="/">
            <img src="/logo.png" alt="trimrr logo" className="h-16"/>
        </Link>
        {!user ? 
            <div>
                <Button onClick={() => navigate('/auth')}>Login</Button>
            </div> 
            : 
            (
                <DropdownMenu>
                    <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                        <Avatar>
                            <AvatarImage  src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>{}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>My Links</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400">
                            <div className="flex items-center cursor-pointer justify-center">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    </nav>
}

export default Header;