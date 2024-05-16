import {NextRequest , NextResponse} from "next/server"
import prisma from "../../../../../prisma/client";

export async function GET(request : NextRequest){
    try{
        const problems = await prisma.problem.findMany({
            select : {
                pid : true,
                pName : true,
            }
        })
        return NextResponse.json({
            data : problems,
            success : true
        })
    }
    catch(err : any){
        // console.log("Error getting problems" , err);
        return NextResponse.json({
            error : err.message
        } , {
            status : 500
        })
    }
}