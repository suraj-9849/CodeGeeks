"use client"
import React , {use, useState} from "react";
import Navbar from "../navbar/page";

export default function Profile(){
    const solvedProblems = [
        {
            id : 1,
            name : "Two Sum",
            difficulty : "Easy",
            status : "Accepted"
        },
        {
            id : 2,
            name : "Add Two Numbers",
            difficulty : "Medium",
            status : "Accepted"
        },
        {
            id : 3,
            name : "Longest Substring Without Repeating Characters",
            difficulty : "Medium",
            status : "Accepted"
        }
    ]

    const likedProblems = [
        {
            id : 1,
            name : "Two Sum",
            difficulty : "Easy",
            status : "Accepted"
        },
        {
            id : 2,
            name : "Add Two Numbers",
            difficulty : "Medium",
            status : "Accepted"
        },
        {
            id : 3,
            name : "Longest Substring Without Repeating Characters",
            difficulty : "Medium",
            status : "Accepted"
        },
        {
            id : 4,
            name : "Longest Substring Without Repeating Characters",
            difficulty : "Medium",
            status : "Accepted"
        }

    ]

    const attemptedProblems = [
        {
            id : 1,
            name : "Two Sum",
            difficulty : "Easy",
            status : "Accepted"
        },
        {
            id : 2,
            name : "Add Two Numbers",
            difficulty : "Medium",
            status : "Accepted"
        },
    ]

    const [curr , setCurr] = useState("solved");
    console.log(curr);
    return (
        <div>
            <Navbar />
            <div className="flex items-start h-screen" style={{
                paddingTop : "3.6rem"
                }} >
                <div className="w-1/4 bg-gray-100 h-full">
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                            <div className="ml-4">
                                <div className="font-bold">Vignesh Mudhiraj</div>
                                <div className="font-medium hover:font-semibold ">vignesh@gmail.com</div>
                                <div className="text-gray-600">
                                    <span>
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                         </div>
                        </div>
                    </div>
                    <div className="flex-col w-full m-2">
                        <div className="flex border-y-2 border-black-600 w-100">
                            <div className="flex gap-10 m-4 my-8">
                                <div className=" m-4 p-4 border-2 border-black-600 w-40  h-40 bg-gray-100 rounded-lg">
                                    <div className="text-center font-small text-lg">Solved Problems</div>
                                    <div className="text-center font-small text-2xl mt-6">0</div>
                                </div>
                                <div className=" m-4 p-4 border-2 border-black-600 w-40  h-40 bg-gray-100 rounded-lg">
                                    <div className="text-center font-small text-lg">Attempted Problems</div>
                                    <div className="text-center font-small text-2xl mt-6">0</div>
                                </div>
                                <div className=" m-4 p-4 border-2 border-black-600 w-40  h-40 bg-gray-100 rounded-lg">
                                    <div className="text-center font-small text-lg">Liked Problems</div>
                                    <div className="text-center font-small text-2xl mt-6">0</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex">
                                <div className="font-medium text-xl mt-4 border-black-600  p-4 rounded-lg" onClick={
                                    () => setCurr("solved")
                                } style={
                                    curr === "solved" ? {
                                        background : "rgb(226 232 240)",
                                    } : {}
                                } >Solved Problems</div>
                                <div className="font-medium text-xl mt-4 border-black-600  p-4 rounded-lg" onClick={
                                    () => setCurr("attempted")
                                } 
                                style={
                                    curr === "attempted" ? {
                                        background : "rgb(226 232 240)",
                                    } : {}
                                }
                                >Attempted Problems</div>
                                <div className="font-medium text-xl mt-4 border-black-600  p-4 rounded-lg" onClick={
                                    () => setCurr("liked")
                                }
                                style={
                                    curr === "liked" ? {
                                        background : "rgb(226 232 240)",
                                    } : {}
                                }
                                >Liked Problems</div>
                            </div>
                            {
                                curr === "solved" ? 
                                <div>
                                    <div className="flex justify-between p-4 border-b-2 border-gray-400">
                                            <div className="font-medium w-2/3">Problem</div>
                                            <div className="font-medium w-1/3">Difficulty</div>
                                            <div className="font-medium">Status</div>
                                    </div>
                                    {
                                        solvedProblems.map((problem , key) => {
                                            return (
                                                <div className="flex justify-between p-4 border-b-2 border-gray-400" key={key}>
                                                    <div className="font-medium w-2/3">{problem.name}</div>
                                                    <div className="font-medium w-1/3">{problem.difficulty}</div>
                                                    <div className="font-medium">{problem.status}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div> : curr === "attempted" ?
                                <div>
                                    <div className="flex justify-between p-4 border-b-2 border-gray-400">
                                            <div className="font-medium w-2/3">Problem</div>
                                            <div className="font-medium w-1/3">Difficulty</div>
                                            <div className="font-medium">Status</div>
                                    </div>
                                    {
                                        attemptedProblems.map((problem , key) => {
                                            return (
                                                <div className="flex justify-between p-4 border-b-2 border-gray-400" key={key}>
                                                    <div className="font-medium  w-2/3">{problem.name}</div>
                                                    <div className="font-medium w-1/3">{problem.difficulty}</div>
                                                    <div className="font-medium ">{problem.status}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div> :
                                <div>
                                     <div className="flex justify-between p-4 border-b-2 border-gray-400" >
                                                    <div className="font-medium">Problem</div>
                                                    <div className="font-medium">Difficulty</div>
                                    </div>
                                    {
                                        likedProblems.map((problem , key) => {
                                            return (
                                                <div className="flex justify-between p-4 border-b-2 border-gray-400" key={key}>
                                                    <div className="font-medium">{problem.name}</div>
                                                    <div className="font-medium">{problem.difficulty}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
            </div>
    </div>
    )
}