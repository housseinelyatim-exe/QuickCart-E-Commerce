import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    // 1. Fixed 'cahched' to 'cached'
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };

        // 2. Fixed $() to ${} for the environment variable
        cached.promise = mongoose.connect(`${process.env.MONGODB_URL}/QuickCart`, opts).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;