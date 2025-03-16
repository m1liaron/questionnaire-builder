import express from "express";
const router = express.Router();

import { getQuiz, createQuiz, updateQuiz, removeQuiz} from "../controllers/quizController.js";

router.route("/").post(createQuiz);
router.route("/:id").get(getQuiz).patch(updateQuiz).delete(removeQuiz);