"use client"
import React , {use, useState} from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Navbar from "../navbar/page";

export default function Profile(){
    const router = useRouter();
    const [User , setUser] = useState({
        _id: "Nothing",
        username: "",
        email: ""
    });

    const GetUser = async() => {
        try {
            const data = await axios.get("api/users/me");
            console.log("User Data" , data);
            const update = {
                _id: data.data.data._id,
                username: data.data.data.username,
                email: data.data.data.email
            }
            setUser(update);
        } catch (error) {
            console.log("Error getting user" , error);
            toast.error("Error getting user");
        }
    } 

    const Logout = async() => {
        try {
            await axios.get("api/users/logout");
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error) {
            console.log("Error Logging out" , error);
            toast.error("Error Logging out");
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen ">
                <h1 className="text-3xl font-bold mb-4">Profile</h1>
                <hr/>
                <h1 className="text-2xl text-green-500 font-semibold">Profile Page</h1>
                <h2 className="text-xl font-semibold bg-purple-500 text-white p-2 rounded-md">
                    {
                        User._id === "Nothing" ? "Nothing" : <Link href={`/profile/${User._id}`}>{User.username}</Link>
                    }
                </h2>
                <button className="mt-4 text-blue-500 bg-red-300 p-2 rounded-md" onClick={Logout}>Logout</button>
                <button className="mt-4 text-blue-500 bg-red-300 p-2 rounded-md" onClick={GetUser}>Get User Profile</button>
                
            </div>
        </>
    )
}