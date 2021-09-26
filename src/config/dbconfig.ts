import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB || "");
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }
}

connectDB();