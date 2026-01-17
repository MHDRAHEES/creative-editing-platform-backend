import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {type:String,required:false},
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user",},
  favourites:[
    {type:mongoose.Schema.Types.ObjectId,
      ref:'Media',
      defualt:[]
    }
  ]
   
});

export default mongoose.model("User", userSchema, "user"); // third param fixes collection name
