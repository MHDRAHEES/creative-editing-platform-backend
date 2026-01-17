import bcrypt from "bcryptjs";
import User from "../Models/user.js";
import generateToken from "../Helper/generate_token.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminEmail = "admin@gmail.com";
    const role = email === adminEmail ? "admin" : "user";

    const user = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword, // ✅ FIXED
      role,
    });

    res.status(201).json({
      isLogin: true,
      success: true,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Signup error:", error); // 👈 IMPORTANT
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      isLOgin:true,
      token: generateToken(user._id),
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    isLOgin:true,
    user: req.user,
  });
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // 🔒 hide passwords

    res.status(200).json({
      success: true,
      users: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
