import express from "express";
import { authMiddleware } from "../Middlewares/AuthMiddleware.js";
import { getUser } from "../Controllers/UserController/GetUser.js";
const router = express.Router();

router.get("/getUser", authMiddleware, getUser);

export default router;
