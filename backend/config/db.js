import mongoose from "mongoose"

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DATABSE CONNECTED SUCCESSFULLY");
    } catch(error){
        console.log("DATABASE CONNECTION FAILED");
        console.log("ERROR");
        process.exit(1);
    }
};

export default connectDB;