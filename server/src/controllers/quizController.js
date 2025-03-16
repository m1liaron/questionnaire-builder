import {Answer, Question, Quiz} from "../models/models.js";
import { StatusCodes } from "http-status-codes";

/**
 * quizData {object} name, description
 * questions {array} of {object} with id, question, type
 * answers {array} of {object} with id, answer, isRight
 * @returns {Promise<void>}
 */

const createQuiz = async (req, res) => {
	const { quizData, questions, answers } = req.body;
	try {
		const createdQuiz = await Quiz.create(quizData);
		await Promise.all(
			questions.map(async ({ id, question, type }) => {
				await Question.create({
					id,
					text: question,
					quizId: createdQuiz.id,
					type
				});

				answers.map(async ({id, answer, isRight }) => {
					await Answer.create({
						id, answer, isRight, questionId: question.id
					})
				})
		}));

		const foundQuiz = await Quiz.findOne({
			where: { id: createdQuiz.id},
			include: [{
				model: Question,
				as: "questions",
				include: [{ model: Answer, as: "answers" }]
			}]
		});

		res.status(StatusCodes.CREATED).json(foundQuiz);
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
		const findQuestionnaire = await Quiz.findAll();
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
