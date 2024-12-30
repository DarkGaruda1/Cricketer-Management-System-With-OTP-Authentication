import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRouter from "./Routes/AuthRoutes.js";
import userRouter from "./Routes/UserRoutes.js";
import cricketerRouter from "./Routes/CricketerRoutes.js";
import { connect } from "./Config/Connect2DB.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connect();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cricketer", cricketerRouter);

app.listen(PORT, () => {
  console.log(`The Server is running on port ${PORT}`);
});
