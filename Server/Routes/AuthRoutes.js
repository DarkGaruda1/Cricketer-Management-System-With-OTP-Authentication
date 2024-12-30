import express from "express";
import { signup } from "../Controllers/AuthController/SignUp.js";
import { login } from "../Controllers/AuthController/Login.js";
import { sendVerificationOTP } from "../Controllers/AuthController/SendAccountVerificationOTP.js";
import { authMiddleware } from "../Middlewares/AuthMiddleware.js";
import { verifyAccount } from "../Controllers/AuthController/VerifyAccount.js";
import { logout } from "../Controllers/AuthController/Logout.js";
import { sendPasswordResetOTP } from "../Controllers/AuthController/SendPasswordResetOTP.js";
import { resetPassword } from "../Controllers/AuthController/PasswordReset.js";
import { isAuthenticated } from "../Controllers/AuthController/IsAuthenticated.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.post("/sendAccountVerificationOTP", authMiddleware, sendVerificationOTP);
router.post("/verifyAccount", authMiddleware, verifyAccount);
router.post("/sendPasswordResetOTP", authMiddleware, sendPasswordResetOTP);
router.post("/resetPassword", authMiddleware, resetPassword);
router.get("/isAuthenticated", authMiddleware, isAuthenticated);

export default router;
