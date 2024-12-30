import express from "express";
import { authMiddleware } from "../Middlewares/AuthMiddleware.js";
import { cricMiddleware } from "../Middlewares/CricMiddleware.js";
import { createCricketer } from "../Controllers/CricketerController/CreateCricketer.js";
import { fetchCricketers } from "../Controllers/CricketerController/FetchCricketers.js";
import { fetchCricketersById } from "../Controllers/CricketerController/FetchCricketerByID.js";
import { deleteCricketerById } from "../Controllers/CricketerController/DeleteCricketerByID.js";
import { updateCricketerById } from "../Controllers/CricketerController/UpdateCricketerByID.js";
const router = express.Router();

router.post(
  "/createCricketer",
  authMiddleware,
  cricMiddleware,
  createCricketer
);

router.get("/fetchCricketers", authMiddleware, cricMiddleware, fetchCricketers);
router.get(
  "/fetchCricketer/:id",
  authMiddleware,
  cricMiddleware,
  fetchCricketersById
);
router.delete(
  "/deleteCricketer/:id",
  authMiddleware,
  cricMiddleware,
  deleteCricketerById
);

router.put(
  "/updateCricketer/:id",
  authMiddleware,
  cricMiddleware,
  updateCricketerById
);

export default router;
