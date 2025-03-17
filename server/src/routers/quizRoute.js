import express from "express";
const router = express.Router();

import {createQuizValidateMiddleware} from "../middlewares/createQuiz.validate.middleware.js";
import {
	getQuiz,
	getQuizzes,
	createQuiz,
	updateQuiz,
	removeQuiz,
} from "../controllers/quizController.js";

router.post("/", createQuizValidateMiddleware, createQuiz);
router.route("/").get(getQuizzes);
router.route("/:quizId").get(getQuiz).patch(updateQuiz).delete(removeQuiz);

export { router as quizRoute };
