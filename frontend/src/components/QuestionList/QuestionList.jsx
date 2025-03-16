import {useState} from "react";
import { QuestionItem } from "../QuestionItem/QuestionItem";
import axios from "axios";
import {apiUrl} from "../../api/apiUrl.js";

const QuestionList = () => {
    const [questions, setQuestions] = useState([{
        id: 1,
        question: 'Question 1',
        type: 'Text'
    }]);
    const [answers, setAnswers] = useState([]);

    const generateNewId = (items) => {
        return items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
      };

      const handleAddQuestion = () => {
        const newQuestionId = generateNewId(questions);
        const newAnswerId = generateNewId(answers);
        setQuestions((prev) => [
          ...prev,
          {
            id: newQuestionId,
            question: `Question ${newQuestionId}`,
            type: "Text"
          }
        ]);
        setAnswers((prev) => [
          ...prev,
          {
            id: newAnswerId,
            questionId: newQuestionId,
            answer: "",
            isCorrect: false
          }
        ]);
      };

      const handleRemoveQuestion = (id) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
        setAnswers((prev) => prev.filter((a) => a.questionId !== id));
      };
    
      const handleQuestionChange = (id, newText) => {
        setQuestions((prev) =>
          prev.map((q) => (q.id === id ? { ...q, question: newText } : q))
        );
      };
    
      const handleAnswerChange = (answerId, newText) => {
        setAnswers((prev) =>
          prev.map((a) => (a.id === answerId ? { ...a, answer: newText } : a))
        );
      };

      const handleTypeChange = (questionId, newType) => {
        setQuestions(questions.map(q => q.id === questionId ? { ...q, type: newType } : q));
        if(newType === "Text") {
            setAnswers((prev) => {
                const related = prev.filter(a => a.questionId === questionId);
                const keep = related.slice(0,1);
                return [...prev.filter((a => a.questionId !== questionId)), ...keep]
            })
        }
     }    

     const handleToggleCorrectAnswer = (questionId, answerId, mode) => {
        if (mode === "single") {
          // For single choice, mark only the chosen answer as correct.
          setAnswers(answers.map(a =>
            a.questionId === questionId ? { ...a, isCorrect: a.id === answerId } : a
          ));
        } else {
          // For multiple choices, toggle the isCorrect value.
          setAnswers(answers.map(a =>
            a.id === answerId ? { ...a, isCorrect: !a.isCorrect } : a
          ));
        }
      };

      const handleAddAnswer = (questionId) => {
        const currentAnswers = answers.filter(a => a.questionId === questionId);
        if (currentAnswers.length < 5) {
          const newAnswerId = generateNewId(answers);
          setAnswers([...answers, { id: newAnswerId, questionId, answer: "", isCorrect: false }]);
        }
      };

      const validateQuizData = () => {
          const questionsValues = Object.values(questions);
          const answersValues = Object.values(answers);
          for(let question of questionsValues) {
              if(question.includes('Question') || !question.length) {
                  return console.error(`Template question has not been changed: ${question}`)
              }
          }

          for(let answer of answersValues) {
              if(answer.includes('Answer') || !answer.length) {
                  return console.error(`Template answer has not been changed: ${answer}`)
              }
          }
      }

    return (
        <form>
            <div className="d-flex gap-3">
                <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>Add Question</button>
                <button type="button" className="btn btn-success" onClick={handleAddQuestion}>Create Quiz</button>
            </div>
            <div>
                {questions.map((q, index) => (
                    <QuestionItem
                        key={q.id}
                        question={q}
                        index={index}
                        answers={answers.filter(a => a.questionId === q.id)}
                        onRemoveQuestion={handleRemoveQuestion}
                        onQuestionChange={handleQuestionChange}
                        onTypeChange={handleTypeChange}
                        onAnswerChange={handleAnswerChange}
                        onToggleCorrectAnswer={handleToggleCorrectAnswer}
                        onAddAnswer={handleAddAnswer}
                    />
                ))}
            </div>
        </form>
    )
}

export {QuestionList};