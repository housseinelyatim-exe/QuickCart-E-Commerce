import {getAuth} from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Address from "@/modals/Adsress";
import {NextResponse} from "next/server";


export async function GET(request){
    try {
        const {userId} = getAuth(request)

        await connectDB()

        const adresses = await Address.find({userId})

        return NextResponse.json({success:true, adresses})
    }catch(error){
        return NextResponse.json({success:false, message: error.message});
    }
}