import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

interface exmp{
    input : string,
    output : string,
    explanation : string
}

interface Problem {
    name: string;
    description: string;
    difficulty: string;
    constraints: string[];
    code: string;
    firstCode: string;
    lastCode: string;
    testCases: string;
    inputTc: string;
    outputTc: string;
    example : exmp[];
}

export async function POST(req : NextRequest) {
    try {
        const body = await req.json();
        console.log("This is question input : " , body);
        const response = await prisma.problem.create({
            data : {
                pName : body.name,
                pDesc : body.description,
                pDifficulty : body.difficulty,
                fcode : body.firstCode,
                pCode : body.code,
                lcode : body.lastCode,
                inpurTC : body.testCases,
                totaltcInp : body.inputTc,
                totaltcOut : body.outputTc,
                constraints : body.constraints
            }
        })
        console.log(response);
        for(var i = 0 ; i < body.example.length ; i++){
            await prisma.examples.create({
                data : {
                    input : body.example[i].input,
                    output : body.example[i].output,
                    explanation : body.example[i].explanation,
                    pid : response.pid
                }
            })
        }
        return NextResponse.json({
            statu : 200,
            message : "Succesfully uploaded"
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status : 500,
            message : `Internal server Error ${error}`
        })
    }
}