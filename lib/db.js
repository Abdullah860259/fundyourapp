import mongoose from "mongoose";
export default async function connectdb() {
    if (mongoose.connections[0].readyState) {
        return;
    }
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB 👌👌👌");
}