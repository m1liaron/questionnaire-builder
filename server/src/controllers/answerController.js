import { Answer } from "../models/models.js";
import { StatusCodes } from "http-status-codes";

const createAnswer = async (req, res) => {
	try {
		const existingAnswer = await Answer.create(req.body);

		res.status(StatusCodes.CREATED).send(existingAnswer);
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: true, message: error.message });
	}
};

export { createAnswer };
