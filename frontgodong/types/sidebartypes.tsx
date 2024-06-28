import { LucideIcon } from "lucide-react";

export interface SidebarItems{
    links:Array<{
        label:String;
        href:string;
        icon?:LucideIcon;
    }>;    
}