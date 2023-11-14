import React from "react";
import Image from "next/image";

const AuthLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div >
            {children}
        </div>
    )
}
export default AuthLayout
