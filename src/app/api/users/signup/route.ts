import { NextRequest ,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "../../../../../prisma/client";

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const { username , email , password } = reqBody;
        console.log(reqBody)

        const newUser = await prisma.user.findUnique({
            where : {  
                email
            }
        })

        //if user is not found
        if(newUser){
            return NextResponse.json({
                error : "User already exists",
                status : 400
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password , salt);

        // const newUserObj = new user({
        //     username,
        //     email,
        //     password : hashedPassword
        // })

        // const savedUser = await newUserObj.save();
        const savedUser = await prisma.user.create({
            data : {
                name : username,
                email,
                password : hashedPassword,
            }
        })
        console.log(savedUser);

        return NextResponse.json({
            message : "User signed up successfully",
            savedUser : savedUser,
            status : 201
        })

    } catch (error : any) {
        console.log("Error signing up in user", error);
        return NextResponse.json({
            error : error.message,
            status : 500,
        } )
    }
}