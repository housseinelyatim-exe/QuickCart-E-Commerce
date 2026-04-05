import {v2} from 'cloudinary'
import {getAuth} from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import {NextResponse} from "next/server";
import connectDB from "@/config/db";
import Product from "@/modals/Product";
import product from "@/modals/Product";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
    try{
        const {userId}= getAuth(request);

        const isSeller = await authSeller(userId);
        if(!isSeller){
            return NextResponse.json({success:false, message:'not authorized'});
        }

        const formData= await request.formData();
        const name=formData.get('name');
        const description=formData.get('description');
        const category=formData.get('category');
        const price=formData.get('price');
        const offerPrice=formData.get('offerPrice');
        const files=formData.getAll('images');

        if (!files || files.length===0){
            return NextResponse.json({success:false, message:'no file uploaded'});
        }

        const result = await Promise.all(
            files.map(async (file)=>{
                const arrayBuffer = await file.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)
                return new Promise((resolve, reject) => {
                    const stream = clouddinary.uploader.upload_stream(
                        {resource_type: 'auto'},
                        (error, result) => {
                            if(error){
                                reject(error)
                            }else {
                                resolve(result)
                            }
                        }
                    )
                    stream.end(buffer)
                })
            })
        )
        const image = result.map(result=>result.secure_url)

        await connectDB()
        const newProduct = await product.create({
            userId,
            name,
            description,
            category,
            price:Number(price),
            offerPrice:Number(offerPrice),
            imamge,
            date: Date.now(),
        })
        return NextResponse.json({success:true, message:'upload success', newProduct});

    }catch(error){
        NextResponse.json({success:false, message:error});
    }
}