import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/modals/Product";

export async function GET(request) {
    try {
        await connectDB();

        // Fetch all products from the database
        const products = await Product.find({});

        return NextResponse.json({ success: true, products });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}