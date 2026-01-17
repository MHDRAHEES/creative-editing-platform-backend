import Booking from "../Models/booking.js";

export const forBooking = async (req, res) => {
  try {
    const { fullName, email, category, phone, description,session_time,date,venu_type,venue } = req.body;
    if (!fullName || !email || !category || !phone || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const booking = await Booking.create({
      fullName,
      email,
      category,
      phone,
      description,
      session_time,
      date,
      venu_type,
      venue
    });
    return res.status(201).json({
      success: true,
      message: "Booking successful",
      booking,
    });

  } catch (error) {
    console.error("Booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getBookingData = async (req, res) => {
  try {
    const bookings = await Booking.find(); // 🔥 fetch from DB

    return res.status(200).json({
      success: true,
      booking_data: bookings, // 🔥 MUST send this
    });

  } catch (error) {
    console.error("Fetch booking error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

