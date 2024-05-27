import { NextRequest , NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { Fascinate } from "next/font/google";
export async function POST(request : NextRequest ){
    try {
        const body = await request.json();
        const inPresent = await prisma.solved.findUnique({
            where : {
                uid : Number(body.uid),
                pid : Number(body.pid)
            }
        });

        if(inPresent){
            if(body.success){
                const data = await prisma.solved.update({
                    where : {
                        uid : Number(body.uid),
                        pid : Number(body.pid)
                    },
                    data : {
                        isAttempted : false,
                        isSolved : true,
                        code : body.code
                    }
                });
                console.log("Data", data)
            }
            else{
                const data = await prisma.solved.update({
                    where : {
                        uid : Number(body.uid),
                        pid : Number(body.pid)
                    },
                    data : {
                        isAttempted : true,
                        isSolved : false,
                        code : body.code
                    }
                });

                console.log("Data", data)
            }
        }
        else{
            if(body.success){
                const data =  await prisma.solved.create({
                    data : {
                        uid : Number(body.uid),
                        pid : Number(body.pid),
                        pName : body.pname,
                        pLink : "",
                        pDifficulty : body.pdiffiuclty,
                        isAttempted :false,
                        isSolved : true,
                        isFavourite : false,
                        code : body.code
                    }
                });
                console.log("Data", data)
            }
            else{
                const data =  await prisma.solved.create({
                    data : {
                        uid : Number(body.uid),
                        pid : Number(body.pid),
                        pName : body.pname,
                        pLink : "",
                        pDifficulty : body.pdiffiuclty,
                        isAttempted :true,
                        isSolved : false,
                        isFavourite : false,
                        code : body.code
                    }
                });
                console.log("Data", data)
            }
        }
        return NextResponse.json({
            message : `Code Saved Successfully`,
            status : 200
        });
    } catch (error : any) {
        console.log("Error Saving code", error);
        return NextResponse.json({
            message : `Error Saving code`,
            err : error,
            status : 500
        });
    }
}