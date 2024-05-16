"use client"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup(){
    const router = useRouter();
    const [user , setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });
    const [Loading , setLoading] = React.useState(false);
    const onSignUp = async (e : any) => {
        e.preventDefault();
        try {
            setLoading(true);
            if(! user.email || !user.password || !user.username){
                toast.error("Please fill all the fields");
                return;
            }
            console.log(user)
            const data = await axios.post("/api/users/signup" , user);
            console.log("Sign Up Success" , data)
            toast.success("Sign Up Success");
            router.push("/login");
        } catch (error) {
            console.log("Error Signing Up" , error);
            toast.error("Error Signing Up");
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Username" className="p-2 border border-gray-300 rounded-md" 
                    value={user.username} onChange={
                        (e) => setUser({
                            ...user,
                            username: e.target.value
                        })
                    }
                />
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
                >{Loading ? "Processing" : "Sign Up"}</button>
            </form>
            <Link href="/login">
                <h1 className="mt-4 text-blue-500">Already have an account? Login</h1>
            </Link>
        </div>
    )
}