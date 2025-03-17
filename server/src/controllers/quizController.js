import { Answer, Question, Quiz, Result } from "../models/models.js";
import { StatusCodes } from "http-status-codes";
import { sequelize } from "../db/sequelize.js";

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
		const foundQuizzes = await Quiz.findAll({
			include: [
				{
					model: Question,
					as: "questions",
					attributes: ["id"],
				},
				{
					model: Result,
					as: "results",
					attributes: ["id"],
				},
			],
		});
		if (!foundQuizzes || !foundQuizzes.length) {
			return res.status(StatusCodes.OK).json([]);
		}

		const quizzesWithCount = foundQuizzes.map((quiz) => {
			const quizObj = quiz.toJSON();
			quizObj.questionsAmount = quizObj.questions
				? quizObj.questions.length
				: 0;
			quizObj.amountOfCompletions = quizObj.results
				? quizObj.results.length
				: 0;
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
		await foundQuiz.update({ name, description, questionsAmount: reqQuestions.length, }, { transaction });

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

export { createQuiz, getQuiz, getQuizzes, updateQuiz, removeQuiz };
