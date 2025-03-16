import express from "express";
const router = express.Router();

import {
	getQuestions,
	createQuestion,
	updateQuestion,
	removeQuestion,
} from "../controllers/questionController.js";

router.route("/").post(createQuestion).get(getQuestions);
router.route("/:id").patch(updateQuestion).delete(removeQuestion);

export { router as questionRoute };
