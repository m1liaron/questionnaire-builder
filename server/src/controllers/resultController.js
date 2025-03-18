import { StatusCodes } from "http-status-codes";
import { sequelize } from "../db/sequelize.js";
import { Answer, Quiz, Result, ResultQuestion } from "../models/models.js";

const createResult = async (req, res) => {
	// If using transactions, ensure you have access to your sequelize instance
	const transaction = await sequelize.transaction();
	try {
		const { quizId, timeSpend, questions } = req.body;

		// Create the result record
		const result = await Result.create({ quizId, timeSpend }, { transaction });

		// Find the quiz and update its completion count
		const foundQuiz = await Quiz.findByPk(quizId, { transaction });
		if (!foundQuiz) {
			throw new Error("Quiz not found");
		}
		// Increment the amountOfCompletions and save
		foundQuiz.amountOfCompletions = (foundQuiz.amountOfCompletions || 0) + 1;
		await foundQuiz.save({ transaction });

		// Process each question in parallel
		const resultQuestions = await Promise.all(
			questions.map(async (q) => {
				const { questionId, answerId, userAnswer, isAnswerCorrect } = q;
				const resultQuestion = await ResultQuestion.create(
					{
						resultId: result.id,
						questionId,
						answerId,
						userAnswer,
						isAnswerCorrect,
					},
					{ transaction },
				);

				// If there's an answer provided, update its selection count
				if (answerId) {
					const answer = await Answer.findByPk(answerId, { transaction });
					if (answer) {
						answer.amountOfSelection = (answer.amountOfSelection || 0) + 1;
						await answer.save({ transaction });
					}
				}
				return resultQuestion;
			}),
		);

		// Commit the transaction if all operations succeed
		await transaction.commit();
		res.status(StatusCodes.CREATED).json({ result, resultQuestions });
	} catch (error) {
		// Roll back the transaction in case of error
		if (transaction) await transaction.rollback();
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: true,
			message: error.message,
		});
	}
};

const getResults = async (req, res) => {
	const { resultId } = req.params;
	try {
		const results = await Result.findAll({
			where: { id: resultId },
			include: [{ model: ResultQuestion, as: "resultQuestions" }],
		});
		res.status(StatusCodes.CREATED).json(results);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error.message });
	}
};

export { createResult, getResults };
