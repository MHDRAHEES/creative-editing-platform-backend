import Booking from "../Models/booking.js";

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Data not found",
      });
    }

    await Booking.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}