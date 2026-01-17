import express from "express";
import { signup, login, getProfile,getUsers } from "../Controller/auth_controller.js";
import protect from "../middleware/auth_middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// GET USER DATA
router.get("/profile", protect, getProfile);
router.get("/users",protect,getUsers)

export default router;
