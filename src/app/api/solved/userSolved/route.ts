import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request : NextRequest){
    try {
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get("uid");
        const solvedProblems = await prisma.solved.findMany({
            where : {
                uid : Number(uid)
            }
        });
        return NextResponse.json({
            data : solvedProblems,
            success : true
        });
    } catch (error : any) {
        return NextResponse.json({
            message : `Error Getting Solved Problems`,
            err : error,
            status : 500
        });
    }
}