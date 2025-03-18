import express from "express";
const router = express.Router();

import {
	getQuestions,
	removeQuestion,
	updateQuestion,
} from "../controllers/questionController.js";

router.route("/").get(getQuestions);
router.route("/:id").patch(updateQuestion).delete(removeQuestion);

export { router as questionRoute };
