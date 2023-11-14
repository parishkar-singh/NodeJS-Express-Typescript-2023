'use client'
// import {setError, setLoading, setUserData} from "@/redux/authSlice";
import getGoogleOauthURL from "@/utils/googleURL";
import axios from "axios";
import {string} from "zod";
// import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
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
const Callback: React.FC = () => {
    // const dispatch = useDispatch();
    // const userState = useSelector((state: { user: UserState }) => state.user);
    const router=useRouter()
    const mapResponseToPayload = (response: any) => {
        return {
            id: response._id,
            username: response.name,
            email: response.email,
            picture: response.picture ? response.picture : undefined,
        };
    };
    const onGoogleAuth = async () => {
        try {
            // dispatch(setLoading(true));
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users/me`, {withCredentials: true})
            const payload: Payload = mapResponseToPayload(response.data);
            // dispatch(setUserData(payload));
            // dispatch(setLoading(false));
        } catch (e: any) {
            // dispatch(setError(e.message));
            // dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            onGoogleAuth()
            router.push('/survey')
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`flex flex-col items-center justify-center`}>
        <h1>Loading.</h1>
        </div>
    )
}
export default Callback
