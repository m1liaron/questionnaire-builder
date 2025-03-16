import { Quiz } from "./Quiz.js";
import { Question } from "./Question.js";
import { Answer } from "./Answer.js";
import { Result } from "./Result.js";
import { ResultQuestion } from "./ResultQuestion.js";

// Questionnaire - Question
Quiz.hasMany(Question, { as: "questions", foreignKey: "quizId" });
Question.belongsTo(Quiz, { as: "quiz", foreignKey: "quizId" });

// Question - Answer
Question.hasMany(Answer, { as: "answers", foreignKey: "quizId" });
Answer.belongsTo(Question, { as: "answers", foreignKey: "quizId" });

// Result - ResultQuestion
Result.hasMany(ResultQuestion, { as: "resultQuestions", foreignKey: "resultId" });
ResultQuestion.belongsTo(Result, { as: "result", foreignKey: "resultId" });


export {
    Quiz,
    Question,
    Answer,
    Result,
    ResultQuestion
}