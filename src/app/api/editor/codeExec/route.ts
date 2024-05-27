import fs from 'fs'
import { NextRequest , NextResponse} from 'next/server'
import {cppExec} from '@/helpers/cppExec'
import { tester } from '@/helpers/tester';


export async function POST(request : NextRequest ){
    try {
        const body = await request.json();
        const {pid ,  code , input , lang , timeLimit , memoryLimit , submit} = body;
        switch(lang){
            case "cpp":
                const obj = await cppExec(code, input, timeLimit, memoryLimit);
                console.log("OutPut result" , obj);
                if(!submit) return NextResponse.json(obj);
                const testResult = await tester(obj.data.output , pid );
                if(testResult){
                    return NextResponse.json({
                        message : "Test Cases Passed",
                        status : 200
                    });
                }
                return NextResponse.json({
                    message : "Test Cases Failed",
                    status : 400
                });
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
            message : `Error running code`,
            err : error,
            status : 500
        });
    }
}