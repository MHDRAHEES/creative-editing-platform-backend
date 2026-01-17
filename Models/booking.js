import mongoose from "mongoose";

const BookingSChema= new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {type:String,required:false},
  category: { type: String, required: true },
  description:{type:String,required:false},
  venu_type:{type:String,required:false},
  venue:{type:String,required:true},
  date:{type:Date,required:true},
  session_time:{type:String,required:true}
})

const Booking = mongoose.model("Booking", BookingSChema);
export default Booking;
