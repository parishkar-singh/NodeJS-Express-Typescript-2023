'use client';
import { useAuth } from "@/context/AuthContext";
import {useRouter} from "next/navigation";

export default function Home() {
    const { user, login, logout } = useAuth();
    const router=useRouter()

    return (
        <main className={`flex flex-col items-center justify-center gap-2 h-screen w-screen`}>
            {user ? (
                <>
                    <span className={`text-2xl font-black text-blue-500`}>{user.username}</span>
                    <span className={`text-2xl font-black text-blue-500`}>{user.email}</span>
                    <span className={`text-2xl font-black text-blue-500`}>MongoDB: {user.id}</span>
                    <button className={`bg-white p-3 w-32 rounded-3xl text-black`} onClick={logout}>
                        Logout
                    </button>
                </>
            ) : (
                <div>
                    <button className={`bg-white p-3 w-32 rounded-3xl text-black`} onClick={()=>router.push('/auth/signin')}>
                        Login
                    </button>
                    <button className={`bg-white p-3 w-32 rounded-3xl text-black`} onClick={()=>router.push('/auth/signup')}>
                        Sign Up
                    </button>
                </div>
            )}
        </main>
    );
}
