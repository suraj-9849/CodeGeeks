"use client"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {toast} from "react-hot-toast"
import { cookies } from "next/headers"

export default function LoginPage(){
    const router = useRouter();
    const [user , setUser] = React.useState({
        email: "",
        password: ""
    });
    const [Loading , setLoading] = React.useState(false);

    const onSignUp = async (e : any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await axios.post("/api/users/login" , user);
            console.log("Login Succes" , data);
            toast.success("Login Success");
            router.push("/questions");
        } catch (error) {
            console.log("Error Logging in" , error);
            toast.error("Error Logging in");
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form className="flex flex-col gap-4">
                <input type="email" placeholder="Email" className="p-2 border border-gray-300 rounded-md" value={user.email} onChange={
                    (e) => setUser({
                        ...user,
                        email: e.target.value
                    })
                }/>
                <input type="password" placeholder="Password" className="p-2 border border-gray-300 rounded-md" value={user.password}
                onChange={(e) => setUser({
                    ...user,
                    password: e.target.value
                })
                }
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md"
                onClick={onSignUp}
                >{Loading ? "Processing" : "Login"}</button>
            </form>
            <Link href="/signup">
                <h1 className="mt-4 text-blue-500">Dont have an account? Sign Up</h1>
            </Link>
        </div>
    )
}