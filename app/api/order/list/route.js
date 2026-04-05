import {getAuth} from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Address from "@/modals/Adsress";
import Product from "@/modals/Product";
import Order from "@/modals/Order";
import {NextResponse} from "next/server";


export async function GET(request) {
    try {
        const {userId}= getAuth(request)
        await connectDB()
        Address.length
        Product.length
        const orders = await Order.find({userId}).populate('adress items.product')
        return NextResponse.json({success: true, orders})
    }catch(error){
        return NextResponse.json({success: false, error: error.message})
    }
}