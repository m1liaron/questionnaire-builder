import {Questionnaire} from "../models/models.js";
import {StatusCodes} from "http-status-codes";

const createQuestionnaire = async (req, res) => {
    try{

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error.message})
    }
}
const getQuestionnaire = async (req, res) => {
    try{

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error.message})
    }
}
const updateQuestionnaire = async (req, res) => {
    try{

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: error.message})
    }
}
const removeQuestionnaire = async (req, res) => {
    try{

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