// @/components/Layout/SideBarButton.js
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button, ButtonProps } from './ui/button';
import { cn } from '@/lib/utils';
import { SheetClose } from './ui/sheet';

interface SideBarButtonProps extends ButtonProps {
    icon?: LucideIcon;
}

export default function SideBarButton({ icon: Icon, className, children, ...props }: SideBarButtonProps) {
    return (
        <Button
            variant='ghost'
            className={cn(
                'gap-3 justify-start w-full text-black border-1 border-white hover:text-orange-500 hover:border-orange-500',
                className
            )}
            {...props}
        >
            {Icon && <Icon size={20} className="hover:text-orange-500" />}
            <span>{children}</span>
        </Button>
    );
}
export function SideBarButtonSheet(props:SideBarButtonProps){
    return(
        <SheetClose asChild>
            <SideBarButton {...props}/>
        </SheetClose>
    )
}
