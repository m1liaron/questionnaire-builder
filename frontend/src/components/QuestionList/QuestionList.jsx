import {useState} from "react";
import { QuestionItem } from "../QuestionItem/QuestionItem";

const QuestionList = () => {
    const [quiz, setQuiz] = useState({
        name: "",
        description: "",
        questions: [
            {
                id: 1,
                text: "Question 1",
                type: "Text",
                answers: []
            }
        ]
    });

    const generateNewId = (items) => {
        return items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
      };

      const handleAddQuestion = () => {
        const newQuestionId = generateNewId(quiz.questions);
          const newQuestion = {
              id: newQuestionId,
              text: `Question ${newQuestionId}`,
              type: "Text",
              answers: [
                  { id: 1, answer: "", isCorrect: false } // initialize with one answer
              ]
          };
          setQuiz((prev) => ({
              ...prev,
              questions: [...prev.questions, newQuestion],
          }));
      };

      const handleRemoveQuestion = (questionId) => {
          setQuiz((prev) => ({
              ...prev,
              questions: prev.questions.filter((q) => q.id !== questionId)
          }))
      };

    const handleRemoveAnswer = (answerId, questionId) => {
        setQuiz((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
               q.id === questionId ?
                   {
                       ...q,
                       answers: q.answers.filter(answer => answer.id !== answerId)
                   } : q

            )
        }))
    };

    const handleQuestionChange = (questionId, newText) => {
        setQuiz((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId ? { ...q, text: newText } : q
            ),
        }));
    };

    const handleAnswerChange = (questionId, answerId, newText) => {
        setQuiz((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId
                    ? {
                        ...q,
                        answers: q.answers.map((a) =>
                            a.id === answerId ? { ...a, answer: newText } : a
                        ),
                    }
                    : q
            ),
        }));
    };

    const handleTypeChange = (questionId, newType) => {
        setQuiz((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === questionId ? { ...q, type: newType } : q
            ),
        }));

        if(newType === "Text") {
            setQuiz((prev) => ({
                ...prev,
                questions: prev.questions.map((q) => {
                    if(q.id === questionId) {
                        return { ...q, answers: q.answers.slice(0,1)}
                    }
                    return q;
                })
            }))
        }
     }

    const handleToggleCorrectAnswer = (questionId, answerId, mode) => {
        setQuiz((prev) => ({
            ...prev,
            questions: prev.questions.map((q) => {
                if (q.id === questionId) {
                    let updatedAnswers;
                    if (mode === "single") {
                        // For single choice, mark only the chosen answer as correct.
                        updatedAnswers = q.answers.map((a) => ({
                            ...a,
                            isCorrect: a.id === answerId,
                        }));
                    } else {
                        // For multiple choices, toggle the isCorrect value.
                        updatedAnswers = q.answers.map((a) =>
                            a.id === answerId ? { ...a, isCorrect: !a.isCorrect } : a
                        );
                    }
                    return { ...q, answers: updatedAnswers };
                }
                return q;
            }),
        }));
    };

    const handleAddAnswer = (questionId) => {
        setQuiz((prev) => ({
            ...prev,
            questions: prev.questions.map((q) => {
                if (q.id === questionId && q.answers.length < 5) {
                    const newAnswerId = generateNewId(q.answers);
                    return {
                        ...q,
                        answers: [
                            ...q.answers,
                            { id: newAnswerId, answer: "", isCorrect: false },
                        ],
                    };
                }
                return q;
            }),
        }));
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
                {quiz.questions.map((q, index) => (
                    <QuestionItem
                        key={q.id}
                        question={q}
                        index={index}
                        answers={q.answers}
                        onRemoveQuestion={handleRemoveQuestion}
                        onRemoveAnswer={handleRemoveAnswer}
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