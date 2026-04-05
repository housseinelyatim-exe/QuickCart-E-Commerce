
import {NextResponse} from "next/server";
import Product from "@/modals/Product";
import connectDB from "@/config/db";


export async function GET(request){
    try {

        await connectDB()
        const products = await Product.find({})
        return NextResponse.json({success:true, message:'products found', products})
    }catch(error){
        return NextResponse.json({success:false, message:error.message})
    }
}