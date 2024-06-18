import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://najibbenammar2023:IMK8OZGeDXBwno7l@cluster0.orhecjy.mongodb.net/Food_Delivry_').then(()=>console.log("DB connected")) ;
}