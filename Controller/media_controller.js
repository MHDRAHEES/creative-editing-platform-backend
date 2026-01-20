import Media from "../Models/media.js";

// POST - Upload a single file
export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
    const { caption } = req.body;

  try {
    const fileData = await Media.create({
      filename: req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      caption: caption || "", 
      size: req.file.size,
      uploadedBy: req.user?.id  // uncomment if you have auth
    });

    res.status(200).json({
      message: "File uploaded and saved to DB successfully",
      file: fileData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Fetch all uploaded media
export const getAllMedia = async (req, res) => {
  try {
    const mediaList = await Media.find().sort({ uploadedAt: -1 });
    res.status(200).json(mediaList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import User from "../Models/user.js";

/* =======================
   TOGGLE FAVOURITE
======================= */
export const toggleFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mediaId } = req.params;

    const user = await User.findById(userId)||[];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

const isFav = user.favourites.some(
  (id) => id && id.equals(mediaId)
);

if (isFav) {
  user.favourites.pull(mediaId);
} else {
  user.favourites.addToSet(mediaId); // prevents duplicates
}


    await user.save();

    res.json({
      success: true,
      favorites: user.favourites,
      message: isFav
        ? "Removed from favorites"
        : "Added to favorites",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =======================
   GET FAVOURITES
======================= */
export const getFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("favourites"); // ✅ correct field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      favourites: user.favourites,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
