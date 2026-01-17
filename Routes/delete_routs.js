import express from "express";
import { deleteImage } from "../Controller/mediaDeleteController.js";
import { deleteUser } from "../Controller/authDeleteController.js";
import { deleteBooking } from "../Controller/bookingDelete.js";
const router = express.Router();

// MEDIA delete
router.delete("/media/:id", deleteImage);

// USER delete
router.delete("/user/:id", deleteUser);

router.delete("/booking/:id", deleteBooking);

export default router;


