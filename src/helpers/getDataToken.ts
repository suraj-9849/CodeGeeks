import { NextRequest } from "next/server"
import jwt from "jsonwebtoken";
import { log } from "console";

export const getDataToken = async (request : NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodev : any = jwt.verify(token, process.env.JWT_SECRET!);
        return decodev.tokenData.id;
    } catch (error : any) {
        throw new Error(error.message);
    }
}