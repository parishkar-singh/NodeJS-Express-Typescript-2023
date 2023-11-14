'use client'
import Link from "next/link";
import AuthInput from "@/Components/AuthInput";
import {useForm} from "react-hook-form";
import {MdOutlineMailOutline} from "react-icons/md";
import {AiFillFacebook, AiFillGoogleCircle, AiOutlineLock} from "react-icons/ai";
import OAuthButton from "@/Components/OAuthButton";
import {useRouter} from "next/navigation";
import {object, string, TypeOf} from "zod";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";
import getGoogleOauthURL from "@/utils/googleURL";
import {FcGoogle} from "react-icons/fc";
import Image from "next/image";
import {useAuth} from "@/context/AuthContext";

const createSessionSchema = object({
    email: string().nonempty({
        message: "Email is required"
    }),
    password: string().min(6).nonempty({
        message: "Password is required"
    }),
})

interface Payload {
    id: string;
    username: string;
    email: string;
    picture?: string;
}

interface UserState {
    userData: Payload | null;
    loading: boolean;
    error: string | null;
}

type CreateSessionInput = TypeOf<typeof createSessionSchema>

const SignIn = () => {
    const router = useRouter()
    const { user, login, logout } = useAuth();
    const {register, formState: {errors}, handleSubmit} = useForm<CreateSessionInput>({
        resolver: zodResolver(createSessionSchema)
    })
    const [loginError, setLoginError] = useState(null)
    const mapResponseToPayload = (response: any) => {
        return {
            id: response._id,
            username: response.name,
            email: response.email,
            picture: response.picture ? response.picture : undefined,
        };
    };

    const onSubmit = async (data: CreateSessionInput) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions/`, data, {withCredentials: true})
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users/me`, {withCredentials: true})
            login(mapResponseToPayload(response.data));
            console.log(user)
            router.push('/')
        } catch (e: any) {
            setLoginError(e.message)
        }
    }
    const onlogout = async () => {
        try {
            logout();
            router.push('/')
        } catch (e: any) {
            setLoginError(e.message)
        }
    }


    return (
        <div className={` bg-white p-6 md:p-24  flex flex-col items-center justify-center h-screen w-screen`}>
            <div className={` flex flex-col items-center justify-center  gap-8 `}>
                {/*<Image width={200} height={200} src={`/heydaw.png`} className={`w-28`} alt={``}/>*/}
                <h1 className={`text-neutral-900 text-2xl md:text-4xl text-center md:text-start font-black`}>Welcome to REST api</h1>
                <div>
                    <span className={`text-neutral-500 font-poppins`}>Newbies can also sign up?&nbsp;</span>
                    <Link className={`text-[#5b54e0] font-bold font-poppins `} href={`/auth/signup`}>
                        Sign up
                    </Link>
                </div>

                <div className={`flex md:hidden items-center md:items-start gap-4 cursor-pointer`}>
                    <a href={getGoogleOauthURL()}>
                        <OAuthButton type={`google`} icon={FcGoogle} text={`Sign In with Google`}/>
                        {/*<button className={`bg-white text-black p-2 rounded-lg`}>Login with Google</button>*/}
                    </a>
                    {/*<OAuthButton icon={AiFillFacebook} text={`Facebook`}/>*/}
                </div>
                <div className={`w-full `}>
                    <hr/>
                </div>
                {/*<span className={`text-black text-3xl`}>Welcome! {data?.name}</span>*/}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`flex flex-col gap-4`}>
                        <AuthInput
                            icon={MdOutlineMailOutline}
                            placeholder={`Your email address`}
                            type={`email`}
                            name={'email'}
                            register={register}
                            error={errors.email?.message as string | undefined}
                        />
                        <AuthInput
                            icon={AiOutlineLock}
                            placeholder={`Enter your password`}
                            type={`password`}
                            name={'password'}
                            register={register}
                            error={errors.password?.message as string | undefined}
                        />
                    </div>
                    <button type={`submit`} className={`bg-[#5b54e0] mt-8 p-2 px-14 rounded-lg text-white`}>Sign In
                    </button>
                </form>
                <div className={`w-full `}>
                    <hr/>
                </div>
                <div className={`hidden md:flex items-center md:items-start gap-4 cursor-pointer`}>
                    <a href={getGoogleOauthURL()}>
                        <OAuthButton type={`google`} icon={FcGoogle} text={`Sign In with Google`}/>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default SignIn;
