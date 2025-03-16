import express from "express";
const router = express.Router();

import { getQuiz, getQuizzes, createQuiz, updateQuiz, removeQuiz} from "../controllers/quizController.js";

router.route("/").post(createQuiz).get(getQuizzes);
router.route("/:id").get(getQuiz).patch(updateQuiz).delete(removeQuiz);