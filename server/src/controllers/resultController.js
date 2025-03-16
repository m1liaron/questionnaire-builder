import { Result, ResultQuestion } from "../models/models.js";
import { StatusCodes } from "http-status-codes";

const createResult = async (req, res) => {
	try {
		const result = await Result.create({});

		const resultQuestions = await Promise.all(
			[...req.body].map(({ questionId, answerId }) => {
				ResultQuestion.create({
					resultId: result.id,
					questionId,
					answerId,
				});
			}),
		);

		res.status(StatusCodes.CREATED).json(resultQuestions);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error.message });
	}
};

const getResults = async (req, res) => {
	const { resultId } = req.params;
	try {
		const results = await Result.findAll({
			where: { id: resultId },
			include: [{ model: ResultQuestion, as: "resultQuestions " }],
		});
		res.status(StatusCodes.CREATED).json(results);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error.message });
	}
};

export { createResult, getResults };
