import { NextRequest , NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


export async function POST(request : NextRequest){
    try{
        const body = await request.json();
        /*
            body : {
                    pid Int @id
                    pName String
                    pLink String
                    pDifficulty String
                    isAttempted Boolean
                    isSolved Boolean
                    isFavourite Boolean
                    code String
                    User User @relation(fields: [uid], references: [Uid])
                    uid Int
            }
        */
        const { 
            pid,
            pName ,
            pLink , 
            pDifficulty , 
            isAttempted , 
            isSolved , 
            isFavourite , 
            code , 
            uid,
            result
        } = body;
        const isPresent = await prisma.solved.findUnique({
            where : {
                uid : Number(uid),
                pid : Number(pid)
            }
        });
        if(result == -1){
            if(isPresent && !isSolved){
                const response = await prisma.solved.update({
                    where : {
                        uid : Number(uid),
                        pid : Number(pid)
                    },
                    data : {
                        isAttempted : true,
                        code
                    }
                });

                return NextResponse.json({
                    message : "Problem Added as Attempted",
                    success : true
                });
            }
            else if(!isPresent){
                const response = await prisma.solved.create({
                    data : {
                        pid : Number(pid),
                        pName,
                        pLink,
                        pDifficulty,
                        isAttempted : true,
                        isSolved : false,
                        isFavourite : false,
                        code,
                        uid : Number(uid)
                    }
                });

                return NextResponse.json({
                    message : "Problem Created and Added as Attempted",
                    success : true
                });
            }
        }

        if(result == 1){
            if(isPresent){
                const response = await prisma.solved.update({
                    where : {
                        uid : Number(uid),
                        pid : Number(pid)
                    },
                    data : {
                        isAttempted : false,
                        isSolved : true,
                        code
                    }
                });

                return NextResponse.json({
                    message : "Problem Added as Solved",
                    success : true
                });
            }
            else if(!isPresent){
                const response = await prisma.solved.create({
                    data : {
                        pid : Number(pid),
                        pName,
                        pLink,
                        pDifficulty,
                        isAttempted : false,
                        isSolved : true,
                        isFavourite : false,
                        code,
                        uid : Number(uid)
                    }
                });

                return NextResponse.json({
                    message : "Problem Created and Added as Solved",
                    success : true
                });
            }
        }

        if(result == 0){
            if(isPresent){
                const response = await prisma.solved.update({
                    where : {
                        uid : Number(uid),
                        pid : Number(pid)
                    },
                    data : {
                        isFavourite : true
                    }
                });

                return NextResponse.json({
                    message : "Problem Added as Favorite",
                    success : true
                });
            }
            else if(!isPresent){
                const response = await prisma.solved.create({
                    data : {
                        pid : Number(pid),
                        pName,
                        pLink,
                        pDifficulty,
                        isAttempted : false,
                        isSolved : false,
                        isFavourite : true,
                        code,
                        uid : Number(uid)
                    }
                });

                return NextResponse.json({
                    message : "Problem Created and Added as Favorite",
                    success : true
                });
            }
        }
    }
    catch(err : any){
        return NextResponse.json({
            error : err.message
        } , {
            status : 500
        })
    }
}