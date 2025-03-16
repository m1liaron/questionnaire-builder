import { Quiz } from "./Quiz.js";
import { Question } from "./Question.js";
import { Answer } from "./Answer.js";
import { Result } from "./Result.js";
import { ResultQuestion } from "./ResultQuestions.js";

// Questionnaire - Question
Quiz.hasMany(Question, { as: "questions", foreignKey: "quizId" });
Question.belongsTo(Quiz, { as: "quiz", foreignKey: "quizId" });

// Question - Answer
Question.hasMany(Answer, { as: "answers", foreignKey: "quizId" });
Answer.belongsTo(Question, { as: "answers", foreignKey: "quizId" });

export {
    Quiz,
    Question,
    Answer
}