import { Quiz } from "../models/models.js";
import { StatusCodes } from "http-status-codes";

const createQuiz = async (req, res) => {
	try {
		const existingQuestionnaire = await Quiz.create(req.body);

		res.status(StatusCodes.CREATED).send(existingQuestionnaire);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error.message });
	}
};
const getQuiz = async (req, res) => {
	try {
		const { quizId } = req.params;
		const findQuestionnaire = await Quiz.findByPk(quizId);
		if (!findQuestionnaire) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: true, message: "Questionnaire Not Found" });
		}

		res.status(StatusCodes.OK).json(findQuestionnaire);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error.message });
	}
};
const getQuizzes = async (req, res) => {
	try {
		const { quizId } = req.params;
		const findQuestionnaire = await Quiz.findAll({
			where: { id: quizId },
		});
		if (!findQuestionnaire) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: true, message: "Questionnaire Not Found" });
		}

		res.status(StatusCodes.OK).json(findQuestionnaire);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error.message });
	}
};
const updateQuiz = async (req, res) => {
	try {
		const { quizId } = req.params;
		const updatedQuestionnaire = await Quiz.update(req.body, {
			where: { id: quizId },
			returning: true,
		});
		if (updatedQuestionnaire[0] === 0) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: true, message: "Questionnaire Not Found" });
		}
		res.status(StatusCodes.OK).json(updatedQuestionnaire);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error.message });
	}
};
const removeQuiz = async (req, res) => {
	try {
		const { quizId } = req.params;
		const findQuestionnaire = await Quiz.findByPk(quizId);
		if (!findQuestionnaire) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: true, message: "Questionnaire Not Found" });
		}
		await findQuestionnaire.destroy();
		res.status(StatusCodes.OK).json(findQuestionnaire);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error.message });
	}
};

export { createQuiz, getQuiz, getQuizzes, updateQuiz, removeQuiz };
