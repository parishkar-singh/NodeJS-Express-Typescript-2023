import { IconType } from "react-icons";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface AuthInputProps {
    icon: IconType;
    type: string;
    placeholder?: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string | undefined;
}

const AuthInput: React.FC<AuthInputProps> = ({
                                                 icon: Icon,
                                                 type,
                                                 placeholder,
                                                 name,
                                                 register,
                                                 error,
                                             }) => {
    return (
        <div className={`flex flex-col w-full gap-1`}>
            <div className={`flex w-full bg-white rounded-lg text-black items-center gap-2 px-4 py-2 border-2`}>
                <Icon />
                <input
                    className={`w-full text-black border-none outline-none`}
                    type={type}
                    placeholder={placeholder}
                    {...register(name)} // registering the input with react-hook-form
                />
            </div>
            {error && (
                <p className={`text-red-500 text-sm`}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default AuthInput;
