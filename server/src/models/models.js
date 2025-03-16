import { Questionnaire } from "./Questionnaire.js";
import { Question } from "./Question.js";
import { Answer } from "./Answer.js";

// Questionnaire - Question
Questionnaire.hasMany(Question, { as: "questions", foreignKey: "quizId" });
Question.belongsTo(Questionnaire, { as: "quiz", foreignKey: "quizId" });

// Question - Answer
Question.hasMany(Answer, { as: "answers", foreignKey: "quizId" });
Answer.belongsTo(Question, { as: "answers", foreignKey: "quizId" });

export {
    Questionnaire,
    Question,
    Answer
}