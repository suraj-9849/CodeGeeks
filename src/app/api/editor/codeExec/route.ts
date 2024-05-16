import fs from 'fs'
import { NextRequest , NextResponse} from 'next/server'
import {cppExec} from '@/helpers/cppExec'



export async function POST(request : NextRequest ){
    try {
        const body = await request.json();
        const { code , input , lang , timeLimit , memoryLimit } = body;
        switch(lang){
            case "cpp":
                const obj = await cppExec(code, input, timeLimit, memoryLimit);
                console.log("OutPut result" , obj);
                return NextResponse.json(obj);
                break;
            case "python":
                fs.writeFileSync("code.py" , code);
                break;
            case "java":
                fs.writeFileSync("code.java" , code);
                break;
            case "javascript":
                fs.writeFileSync("code.js" , code);
                break;
            default:
                return NextResponse.json({
                    message : "Invalid language",
                    status : 400
                });
        }

    } catch (error : any) {
        console.log("Error running code", error);
        return NextResponse.json({
            message : "Error running code",
            status : 500
        });
    }
}