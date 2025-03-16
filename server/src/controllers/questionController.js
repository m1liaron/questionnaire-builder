import { Question } from "../models/models.js";
import {StatusCodes} from "http-status-codes";

const createQuestion = async (req, res) => {
    try{
        const existingQuestionnaire = await Question.create(req.body);

        res.status(StatusCodes.CREATED).send(existingQuestionnaire);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error.message})
    }
}
const getQuestions = async (req, res) => {
    try{
        const { questionId } = req.params;
        const findQuestion = await Question.findAll({
            where: { id: questionId }
        });
        if(!findQuestion) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: true, message: 'Questionnaire Not Found' });
        }

        res.status(StatusCodes.OK).json(findQuestion);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error.message})
    }
}
const updateQuestion = async (req, res) => {
    try{
        const { questionId } = req.params;
        const updatedQuestion = await Question.update(req.body, {
            where: { id: questionId },
            returning: true
        });
        if(updatedQuestion[0] === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: true, message: 'Questionnaire Not Found' });
        }
        res.status(StatusCodes.OK).json(updatedQuestion);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error.message})
    }
}
const removeQuestion = async (req, res) => {
    try{
        const { questionId } = req.params;
        const findQuestion = await Question.findByPk(questionId);
        if(!findQuestion) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: true, message: 'Questionnaire Not Found' });
        }
        await findQuestion.destroy();
        res.status(StatusCodes.OK).json(findQuestion);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error.message})
    }
}

export {
    createQuestion,
    getQuestions,
    updateQuestion,
    removeQuestion
}