import express from "express";
const router = express.Router();

import { createAnswer } from "../controllers/answerController.js";

router.route("/").post(createAnswer);

export { router as answerRoute };
