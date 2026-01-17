import express from "express";
import upload from "../middleware/upload.middleware.js";
import { uploadFile, getAllMedia } from "../Controller/media_controller.js";
import protect from "../middleware/auth_middleware.js"; // optional if you want auth
import { toggleFavourite, getFavourites } from "../Controller/media_controller.js";



const router = express.Router();

// POST - Upload a file
router.post("/upload", protect, upload.single("file"), uploadFile);

// GET - Get all uploaded media
router.get("/media", protect, getAllMedia);

//favourites get and post

router.post('/favourite/:MediaID',protect,toggleFavourite);
router.get('/favourites',protect,getFavourites)

export default router;
