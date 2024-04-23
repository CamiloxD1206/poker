import mongoose from "mongoose";
export const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost/planningpokerdb')
        console.log('db is conected')
    } catch (error) {
        console.log(error)
    }
}