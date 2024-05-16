"use client"

export default function SpecProfile({params} : any){
    return(
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-xl">Id is <span className="bg-green-500 p-2 rounded-md text-white">{params.id}</span>
            </h1>
        </div>
    )
}