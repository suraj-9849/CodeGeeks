import { NextRequest ,NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const { email , password } = reqBody;

        const euser = await prisma.user.findUnique({
            where : {
                email
            }
        })

        //if user is not found
        if(!euser){
            return NextResponse.json({
                error : "User not found"
            }, {
                status : 400
            })
        }

        const isMatch = await bcryptjs.compare(password , euser.password);

        //if password is incorrect
        if(!isMatch){
            return NextResponse.json({
                error : "Invalid Credentials"
            },  {
                status : 400
            })
        }

        //creating jwt token
        const tokenData = {
            id : euser.Uid,
            username : euser.name,
            email : euser.email
        }

        const token = jwt.sign({
            tokenData,
        } , process.env.JWT_SECRET!,
        {
            expiresIn : "1d"
        })

        const response =  NextResponse.json({
            data : {
                name : euser.name,
                email : euser.email,
            },
            message : "Login Successful",
            successs : true
        })
        response.cookies.set("token" , token , {
            httpOnly : false
        })

        return response;

    } catch (error : any) {
        console.log("Error logging in user", error);
        return NextResponse.json({
            error : error.message,
        } , {
            status : 500,
        })
    }
}