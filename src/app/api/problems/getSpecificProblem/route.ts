import { NextRequest , NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request : NextRequest){
    try{
        const { searchParams } = new URL(request.url);
        const pid = searchParams.get("pid");
        const problem = await prisma.problem.findUnique({
            where : {
                pid : Number(pid)
            }
        })
        const examples = await prisma.examples.findMany({
            where : {
                pid : Number(pid)
            }
        })
        return NextResponse.json({
            data : {
                problem,
                examples
            },
            success : true
        })
    }
    catch(err : any){
        return NextResponse.json({
            error : err.message
        } , {
            status : 500
        })
    }
}