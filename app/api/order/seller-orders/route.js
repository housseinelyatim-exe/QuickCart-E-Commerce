import {getAuth} from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import {NextResponse} from "next/server";
import connectDB from "@/config/db";
import Address from "@/modals/Adsress";
import Order from "@/modals/Order";


export async function GET(request){

    try {
        const {userId}= await getAuth(request)
        const isSeller= await authSeller(userId)

        if(!isSeller){
            return NextResponse.json({success:false, message:'not authorized'})
        }
        await connectDB()
        Address.length
        const orders = await Order.find({}).populate('address items.product')
        return NextResponse.json({success: true, orders})
    }catch(err){
        return NextResponse.json({success:false, message:err.message})
    }
}