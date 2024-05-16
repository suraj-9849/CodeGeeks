"use client"
import Cookies from 'js-cookie';
import Image from "next/image"
import logo from "@/app/logo.jpg"
import {decode} from 'jsonwebtoken';
import Link from 'next/link';

export default function Navbar(){
    const token = Cookies.get('token');
    const user : {
        id : string,
        username : string,
        email : string
    } = token ? (decode(token) as any).tokenData : null;
    console.log(user)
    return (
        //create a beautiful navbar which should be very stylish
        <div className="flex items-center justify-between bg-gray-800 p-2 pr-8 fixed w-full ">
            <div className="flex items-center">
                <Image src={logo} className="rounded-full" alt="logo" width={40} height={40}/>
                <h1 className="text-white text-xl font-bold">CodeGeeks</h1>
            </div>
        <div>
            {
                user ? (
                    <div className="flex items-center">
                        <h1 className="text-white text-lg font-bold mr-4">{user.username}</h1>
                        <button className="bg-red-500 text-white p-1 rounded-md"
                        onClick={() => {
                            Cookies.remove('token');
                            window.location.href = "/login";
                        }}
                        >Logout</button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <Link href="/login">
                            <a className="text-white text-lg font-bold mr-4" >Login</a>
                        </Link>
                        <Link href="/signup">
                            <a className="text-white text-lg font-bold">Sign Up</a>
                        </Link>
                    </div>
                )
            }
        </div>
        </div>
    )
}