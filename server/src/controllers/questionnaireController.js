import {Questionnaire} from "../models/models.js";
import {StatusCodes} from "http-status-codes";

const createQuestionnaire = async (req, res) => {
    try{
        const existingQuestionnaire = await Questionnaire.create(req.body);

        res.status(StatusCodes.CREATED).send(existingQuestionnaire);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error.message})
    }
}
const getQuestionnaire = async (req, res) => {
    try{
        const { quizId } = req.params;
        const findQuestionnaire = await Questionnaire.findByPk(quizId);
        if(!findQuestionnaire) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: true, message: 'Questionnaire Not Found' });
        }

        res.status(StatusCodes.OK).json(findQuestionnaire);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error.message})
    }
}
const updateQuestionnaire = async (req, res) => {
    try{
        const { quizId } = req.params;
        const updatedQuestionnaire = await Questionnaire.update(req.body, {
            where: { id: quizId },
            returning: true
        });
        if(updatedQuestionnaire[0] === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: true, message: 'Questionnaire Not Found' });
        }
        res.status(StatusCodes.OK).json(updatedQuestionnaire);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error.message})
    }
}
const removeQuestionnaire = async (req, res) => {
    try{
        const { quizId } = req.params;
        const findQuestionnaire = await Questionnaire.findByPk(quizId);
        if(!findQuestionnaire) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: true, message: 'Questionnaire Not Found' });
        }
        await findQuestionnaire.destroy();
        res.status(StatusCodes.OK).json(findQuestionnaire);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error.message})
    }
}


export {
    createQuestionnaire,
    getQuestionnaire,
    updateQuestionnaire,
    removeQuestionnaire
}