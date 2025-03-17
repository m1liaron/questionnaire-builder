import {Answer, Question, Quiz} from "../models/models.js";
import { StatusCodes } from "http-status-codes";

/**
 * quizData {object} name, description
 * questions {array} of {object} with id, question, type
 * answers {array} of {object} with id, answer, isRight
 * @returns {Promise<void>}
 */

const createQuiz = async (req, res) => {
	const { quiz } = req.body;
	try {
		const createdQuiz = await Quiz.create({ name: quiz.name, description: quiz.description });
		await Promise.all(
			quiz.questions.map(async ({ text, type, answers }) => {
				const createdQuestion = await Question.create({
					text,
					quizId: createdQuiz.id,
					type,
				});

				if(Array.isArray(answers)) {
					await Promise.all(
						answers.map(async ({ answer, isCorrect }) => {
							await Answer.create({
								answer,
								isCorrect,
								questionId: createdQuestion.id
							})
						})
					)
				}
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
		const findQuiz = await Quiz.findByPk(quizId, {
			include: [{
				model: Question,
				as: "questions",
				include: [{ model: Answer, as: "answers" }]
			}]
		});
		if (!findQuiz) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: true, message: "Questionnaire Not Found" });
		}

		res.status(StatusCodes.OK).json(findQuiz);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error.message });
	}
};
const getQuizzes = async (req, res) => {
	try {
		const foundQuizzes = await Quiz.findAll({
			include: [{
				model: Question,
				as: "questions",
				attributes: ["id"]
			}]
		});
		if (!foundQuizzes || !foundQuizzes.length) {
			return res
				.status(StatusCodes.OK)
				.json([]);
		}

		const quizzesWithCount = foundQuizzes.map((quiz) => {
			const quizObj = quiz.toJSON();
			quizObj.questionsAmount = quizObj.questions ? quizObj.questions.length : 0;
			return quizObj;
		});
		res.status(StatusCodes.OK).json(quizzesWithCount);
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
		const findQuiz = await Quiz.findByPk(quizId, {
			include: {
				model: Question,
				as: "questions",
				include: [{ model: Answer, as: "answers" }]
			}
		});
		if (!findQuiz) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: true, message: "Quiz Not Found" });
		}

		await Promise.all(
			findQuiz.questions.flatMap((question) =>
				question.answers.map((answer) => answer.destroy())
			)
		);

		await Promise.all(findQuiz.questions.map((question) => question.destroy()));
		await findQuiz.destroy();
		res.status(StatusCodes.OK).json(quizId);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error.message });
	}
};

export { createQuiz, getQuiz, getQuizzes, updateQuiz, removeQuiz };
