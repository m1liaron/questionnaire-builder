import { Answer } from "./Answer.js";
import { Question } from "./Question.js";
import { Quiz } from "./Quiz.js";
import { Result } from "./Result.js";
import { ResultQuestion } from "./ResultQuestion.js";

// Questionnaire - Question
Quiz.hasMany(Question, { as: "questions", foreignKey: "quizId" });
Question.belongsTo(Quiz, { as: "quiz", foreignKey: "quizId" });

// Question - Answer
Question.hasMany(Answer, { as: "answers", foreignKey: "questionId" });
Answer.belongsTo(Question, { as: "question", foreignKey: "questionId" });

// Result - ResultQuestion
Result.hasMany(ResultQuestion, {
	as: "resultQuestions",
	foreignKey: "resultId",
});
ResultQuestion.belongsTo(Result, { as: "result", foreignKey: "resultId" });

// Result - Quiz
Result.belongsTo(Quiz, { as: "quiz", foreignKey: "quizId" });
Quiz.hasMany(Result, { as: "results", foreignKey: "quizId" });

// ResultQuestion - Question
ResultQuestion.belongsTo(Question, {
	as: "question",
	foreignKey: "questionId",
});
Question.hasMany(ResultQuestion, {
	as: "resultQuestions",
	foreignKey: "questionId",
});

// ResultQuestion - Answer
ResultQuestion.belongsTo(Answer, { as: "answer", foreignKey: "answerId" });
Answer.hasMany(ResultQuestion, {
	as: "resultQuestions",
	foreignKey: "answerId",
});

export { Quiz, Question, Answer, Result, ResultQuestion };
