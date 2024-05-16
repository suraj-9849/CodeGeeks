"use client"
import { use, useEffect, useState } from "react";
import Navbar from "../navbar/page"
import Link from "next/link"
import axios from "axios";

export default function Questions(){
    interface rule {
        pid : number,
        pName : string
    }
    const [data , setData] = useState<rule[]>([]);
    useEffect(() => {
        axios.get("/api/problems/getAllProblems").then(res => {
            setData(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    } , [])
    console.log("hello" , data)
    return (
        <>
            <Navbar />
            <div className="h-full bg-white pt-20 p-5 flex flex-col items-center">
                <h1 className="font-bold text-3xl pb-4">Questions</h1>
                {
                    data.map((item , index) => (
                        <div key={index} className="flex justify-between px-4 items-center w-2/4 bg-slate-100 rounded-full my-2" style={{
                            height : "50px"
                        }}>
                            <h1 className="text-md">{item.pid}. {item.pName}</h1>
                            <Link href = {`/questions/${item.pid}`} className="text-md text-blue-500">solve</Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
