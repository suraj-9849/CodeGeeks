import { NextRequest, NextResponse} from "next/server";

export async function middleware(request : NextRequest){
    try{
        const path = request.nextUrl.pathname;

        const isPublicPath = path === '/login' || path === '/signup'

        const token = request.cookies.get('token')?.value || undefined;

        if(isPublicPath && token){
            return NextResponse.redirect(new URL('/questions' , request.nextUrl));
        }

        if(!isPublicPath && !token){
            return NextResponse.redirect(new URL('/login' , request.nextUrl))
        }
    }
    catch(e){
        console.log(e);
    }
}

//set Matching path here
export const config =  {
    matcher : [
        '/',
        '/profile',
        '/signup',
        '/login',
        '/questions/:path*',
    ]
}
