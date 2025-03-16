import {apiUrl} from "./apiUrl.js";
import axios from "axios";

const getQuizzes = async () => {
    const response = await axios.get(`${apiUrl}/quizzes`);
    return response.data;
}

const getQuiz = async ({ quizId }) => {
    const response = await axios.get(`${apiUrl}/quizzes/${quizId}`);
    return response.data;
}

export { getQuizzes, getQuiz };