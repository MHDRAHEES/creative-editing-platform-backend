import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },       // saved file name
  fileUrl: { type: String, required: true },  
  caption: {type:String,required:true, trim: true},      // URL to access the file
  fileType: { type: String, required: true },       // 'image/jpeg' or 'video/mp4'
  size: { type: Number },                           // optional
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now }
});

const Media = mongoose.model("Media", mediaSchema);

export default Media;
