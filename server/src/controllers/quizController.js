import { StatusCodes } from "http-status-codes";
import { sequelize } from "../db/sequelize.js";
import {
	Answer,
	Question,
	Quiz,
	Result,
	ResultQuestion,
} from "../models/models.js";

/**
 * quizData {object} name, description
 * questions {array} of {object} with id, question, type
 * answers {array} of {object} with id, answer, isRight
 * @returns {Promise<void>}
 */

const createQuiz = async (req, res) => {
	const { quiz } = req.body;
	try {
		const createdQuiz = await Quiz.create({
			name: quiz.name,
			description: quiz.description,
			questionsAmount: quiz.questionsAmount,
		});
		await Promise.all(
			quiz.questions.map(async ({ text, type, answers }) => {
				const createdQuestion = await Question.create({
					text,
					quizId: createdQuiz.id,
					type,
				});

				if (Array.isArray(answers)) {
					await Promise.all(
						answers.map(async ({ answer, isCorrect }) => {
							await Answer.create({
								answer,
								isCorrect,
								questionId: createdQuestion.id,
							});
						}),
					);
				}
			}),
		);

		const foundQuiz = await Quiz.findOne({
			where: { id: createdQuiz.id },
			include: [
				{
					model: Question,
					as: "questions",
					include: [{ model: Answer, as: "answers" }],
				},
			],
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
			include: [
				{
					model: Question,
					as: "questions",
					include: [{ model: Answer, as: "answers" }],
				},
			],
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
		const { sort = "name", order = "ASC", page = 1, limit = 5 } = req.query;
		const orderDirection = order.toUpperCase() === "DESC" ? -1 : 1;
		const pageNumber = Number.parseInt(page, 10);
		const itemsPerPage = Number.parseInt(limit, 10);

		const foundQuizzes = await Quiz.findAll({
			include: [
				{ model: Question, as: "questions", attributes: ["id"] },
				{ model: Result, as: "results", attributes: ["id"] },
			],
			order: [["createdAt", "DESC"]], // Default sorting in DB
		});

		const quizzesWithCount = foundQuizzes.map((quiz) => ({
			...quiz.toJSON(),
			questionsAmount: quiz.questions?.length || 0,
			amountOfCompletions: quiz.results?.length || 0,
		}));

		// Handle sorting dynamically for computed fields
		if (["questionsAmount", "amountOfCompletions"].includes(sort)) {
			quizzesWithCount.sort((a, b) => (a[sort] - b[sort]) * orderDirection);
		} else {
			quizzesWithCount.sort(
				(a, b) => a[sort].localeCompare(b[sort]) * orderDirection,
			);
		}

		const offset = (pageNumber - 1) * itemsPerPage;
		const paginatedQuizzes = quizzesWithCount.slice(
			offset,
			offset + itemsPerPage,
		);
		const haveMoreQuizzes = offset + itemsPerPage < quizzesWithCount.length;

		res.status(200).json({ quizzes: paginatedQuizzes, haveMoreQuizzes });
	} catch (error) {
		res.status(500).json({ error: true, message: error.message });
	}
};

const getStatisticsQuiz = async (req, res) => {
	try {
		const { quizId } = req.params;
		const findQuiz = await Quiz.findByPk(quizId, {
			include: [
				{
					model: Result,
					as: "results",
					include: [
						{
							model: ResultQuestion,
							as: "resultQuestions",
							include: [
								{
									model: Question,
									as: "question",
									include: [{ model: Answer, as: "answers" }],
								},
							],
						},
					],
				},
			],
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

const updateQuiz = async (req, res) => {
	const { quizId } = req.params;
	const {
		quiz: { name, description, questions: reqQuestions },
	} = req.body;
	const transaction = await sequelize.transaction();

	try {
		// Find the quiz with its associations
		const foundQuiz = await Quiz.findByPk(quizId, {
			include: [
				{
					model: Question,
					as: "questions",
					include: [{ model: Answer, as: "answers" }],
				},
			],
			transaction,
		});

		if (!foundQuiz) {
			await transaction.rollback();
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: true, message: "Quiz not found" });
		}

		// Update the quiz fields
		await foundQuiz.update(
			{ name, description, questionsAmount: reqQuestions.length },
			{ transaction },
		);

		// Process each question in the request
		for (const questionData of reqQuestions) {
			let question;
			if (questionData.id) {
				// Update existing question
				question = await Question.findByPk(questionData.id, { transaction });
				if (question) {
					await question.update(
						{ text: questionData.text, type: questionData.type },
						{ transaction },
					);
				} else {
					// In case the id doesn't match an existing record, create new
					question = await Question.create(
						{
							text: questionData.text,
							type: questionData.type,
							quizId: foundQuiz.id,
						},
						{ transaction },
					);
				}
			} else {
				// Create new question if no id provided
				question = await Question.create(
					{
						text: questionData.text,
						type: questionData.type,
						quizId: foundQuiz.id,
					},
					{ transaction },
				);
			}

			// Process answers for the current question, if provided
			if (Array.isArray(questionData.answers)) {
				for (const answerData of questionData.answers) {
					let answer;
					if (answerData.id) {
						// Update existing answer
						answer = await Answer.findByPk(answerData.id, { transaction });
						if (answer) {
							await answer.update(
								{
									answer: answerData.answer,
									isCorrect: answerData.isCorrect,
									questionId: question.id,
								},
								{ transaction },
							);
						} else {
							// Create new answer if not found by id
							answer = await Answer.create(
								{
									answer: answerData.answer,
									isCorrect: answerData.isCorrect,
									questionId: question.id,
								},
								{ transaction },
							);
						}
					} else {
						// Create new answer if no id provided
						await Answer.create(
							{
								answer: answerData.answer,
								isCorrect: answerData.isCorrect,
								questionId: question.id,
							},
							{ transaction },
						);
					}
				}
			}
		}

		await transaction.commit();

		// Refetch the updated quiz with associations to return in the response
		const updatedQuiz = await Quiz.findByPk(quizId, {
			include: [
				{
					model: Question,
					as: "questions",
					include: [{ model: Answer, as: "answers" }],
				},
			],
		});

		res.status(StatusCodes.OK).json(updatedQuiz);
	} catch (error) {
		await transaction.rollback();
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
				include: [{ model: Answer, as: "answers" }],
			},
		});
		if (!findQuiz) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ error: true, message: "Quiz Not Found" });
		}

		await Promise.all(
			findQuiz.questions.flatMap((question) =>
				question.answers.map((answer) => answer.destroy()),
			),
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

export {
	createQuiz,
	getQuiz,
	getQuizzes,
	updateQuiz,
	removeQuiz,
	getStatisticsQuiz,
};
