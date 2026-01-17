import express from "express";
import { forBooking, getBookingData } from "../Controller/booking_controller.js";

const router = express.Router();

router.post("/booking", forBooking);
router.get('/booking',getBookingData)

export default router;
