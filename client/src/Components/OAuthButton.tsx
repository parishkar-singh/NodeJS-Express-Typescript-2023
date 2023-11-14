'use client'
import React from 'react';
import {IconType} from "react-icons";
interface OAuthButtonProps {
    icon:IconType;
    onClick?:()=>void;
    text:string;
    type:string;
}
const OAuthButton:React.FC<OAuthButtonProps> = ({icon:Icon,type,onClick,text}) => {
    return(
        <div className={`rounded-full text-black border-2 flex items-center p-2 gap-2` }>
            <Icon className={`${type==='facebook'?" text-blue-400 ":" "}` } size={40} />
            <span >{text}</span>
        </div>
    )
}
export default OAuthButton;
