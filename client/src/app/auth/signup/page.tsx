'use client'
import Link from "next/link";
import {AiFillFacebook, AiFillGoogleCircle, AiOutlineLock} from "react-icons/ai";
import OAuthButton from "@/Components/OAuthButton";
import {useForm} from "react-hook-form";
import {object, string, TypeOf} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import axios from "axios";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import AuthInput from "@/Components/AuthInput";
import {MdOutlineMailOutline} from "react-icons/md";
import {IoIosContact} from "react-icons/io";
import Image from "next/image";
import {FcGoogle} from "react-icons/fc";
import getGoogleOauthURL from "@/utils/googleURL";
const createUserSchema = object({
    name: string().nonempty({message: 'Name is required'}),

    password: string({
        required_error: 'Password is required'
    }).min(6, 'Password must be at least 6 characters'),

    passwordConfirmation: string({
        required_error: 'Password confirmation is required'
    }),
    email: string({
        required_error: 'Email is required'
    }).email('Not a valid email'),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
})
type CreateUserInput = TypeOf<typeof createUserSchema>

const SignUp = () => {
    const router = useRouter()
    const [registerError, setRegisterError] = useState(null)
    const {register, formState: {errors}, handleSubmit} = useForm<CreateUserInput>(
        {
            resolver: zodResolver(createUserSchema)
        }
    );
    const onSubmit = async (data: CreateUserInput) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users/`, data)
            router.push('/')
        } catch (e: any) {
            setRegisterError(e.message)
        }
    }
    return (
        <div className={`bg-white p-24 flex flex-col items-center justify-center h-screen w-screen `}>
            <div className={` flex flex-col items-center justify-start  gap-8  `}>
                {/*<Image width={100} alt={``} height={100} src={`/heydaw.png`} className={`w-28`}/>*/}
                <h1 className={`text-neutral-900 text-2xl md:text-4xl font-black text-center md:text-start `}>Welcome to REST api</h1>
                <div>
                    <span className={`text-neutral-500 font-poppins`}>Already have an account?</span>
                    <Link className={`text-[#5b54e0] font-bold font-poppins`} href={`/auth/signin`}>
                        &nbsp;Log in
                    </Link>
                </div>
                <div className={`flex md:hidden items-center md:items-start gap-4 cursor-pointer`}>
                    <a href={getGoogleOauthURL()}>
                        <OAuthButton type={`google`} icon={FcGoogle} text={`Sign In with Google`}/>
                    </a>
                </div>
                <div className={`w-full `}>
                    <hr/>
                </div>
                <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className={`flex flex-col gap-4`}>
                        <AuthInput
                            icon={IoIosContact}
                            placeholder="Your name"
                            type="text"
                            name="name"
                            register={register}
                            error={errors.name?.message as string | undefined}
                        />

                        {/* AuthInput for email */}
                        <AuthInput
                            icon={MdOutlineMailOutline}
                            placeholder="Your email address"
                            type="email"
                            name="email"
                            register={register}
                            error={errors.email?.message as string | undefined}
                        />

                         {/*AuthInput for password */}
                        <AuthInput
                            icon={AiOutlineLock}
                            placeholder="Enter your password"
                            type="password"
                            name="password"
                            register={register}
                            error={errors.password?.message as string | undefined}
                        />

                         {/*AuthInput for password confirmation*/}
                        <AuthInput
                            icon={AiOutlineLock} // You can use the same icon for confirmation or choose a different one
                            placeholder="Confirm your password"
                            type="password"
                            name="passwordConfirmation"
                            register={register}
                            error={errors.passwordConfirmation?.message as string | undefined}
                        />
                    </div>
                        <button type={`submit`} className={`bg-[#5b54e0] mt-8 p-2 px-14 rounded-lg text-white`}>Next
                        </button>
                </form>
                <div className={`w-full `}>
                    <hr/>
                </div>
                <div className={`hidden md:flex items-center md:items-start gap-4 cursor-pointer`}>
                    <a href={getGoogleOauthURL()}>
                    <OAuthButton type={`google`} icon={FcGoogle} text={`Sign Up with Google`}/>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default SignUp;
