import {getDataToken} from '@/helpers/getDataToken'
import prisma from '../../../../../prisma/client';
import { NextRequest , NextResponse } from 'next/server';

export async function GET(request : NextRequest){
    try {
        const userId : any  = await getDataToken(request);
        console.log(userId);
        // const data = await user.findById(userId).select('-password');
        const data = await prisma.user.findUnique({
            where : {
                Uid : userId
            },
            select : {
                Uid : true,
                name : true,
                email : true
            }
        })
        return NextResponse.json({
            message : 'User data',
            data : data
        })  
    } catch (error : any) {
        return NextResponse.json({
            status: 500,
            body: {
                message: error.message
            }
        })
    }
}