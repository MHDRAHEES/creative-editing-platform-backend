// controllers/userController.js
import User from "../Models/user.js";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Only allow these fields to be updated
    const allowedFields = ["fullName", "email", "phone", "role"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
