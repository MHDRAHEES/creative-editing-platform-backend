import mongoose from "mongoose";
const connectDB= async ()=>{
    try{
        const uri = `${process.env.MONGO_URI}${process.env.DB_NAME}`;
        await mongoose.connect(uri)
        console.log("Data base Connected succesfully");
    }catch(error){
        console.error("Database Connection Error",error);
        process.exit(1)
    }
};
export default connectDB;