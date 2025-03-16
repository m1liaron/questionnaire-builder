import { Questionnaire } from "./Questionnaire.js";
import { Question } from "./Question.js";

// Questionnaire - Question
Questionnaire.hasMany(Question, { as: "questions", foreignKey: "quizId" });
Question.belongsTo(Questionnaire, { as: "quiz", foreignKey: "quizId" });

export {
    Questionnaire,
    Question
}