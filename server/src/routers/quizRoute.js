import express from "express";
const router = express.Router();

import {
	createQuiz,
	getQuiz,
	getQuizzes,
	getStatisticsQuiz,
	removeQuiz,
	updateQuiz,
} from "../controllers/quizController.js";
import { createQuizValidateMiddleware } from "../middlewares/createQuiz.validate.middleware.js";

router.post("/", createQuizValidateMiddleware, createQuiz);
router.route("/").get(getQuizzes);
router.route("/:quizId").get(getQuiz).patch(updateQuiz).delete(removeQuiz);
router.route("/:quizId/statistics").get(getStatisticsQuiz);

export { router as quizRoute };
