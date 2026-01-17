import fs from "fs";
import path from "path";
import Media from "../Models/media.js";

export const deleteImage = async (req, res) => {
  console.log('test1');
  
  try {
    const { id } = req.params;

    // 1. Find image in DB
    const media = await Media.findById(id);
      console.log('test2');
    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // 2. Build file path
    const filePath = path.join(
      process.cwd(),
      "uploads",
      media.filename
    );

    // 3. Delete image from uploads folder
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // 4. Delete record from DB
    await Media.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });

  } catch (error) {
    console.error("Delete Image Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
