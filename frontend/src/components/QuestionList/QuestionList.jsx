import {useState} from "react";
import { QuestionItem } from "../QuestionItem/QuestionItem";

const QuestionList = () => {
    const [questions, setQuestions] = useState([{
        id: 1,
        question: 'Question 1',
        type: 'Text'
    }]);
    const [answers, setAnswers] = useState([
        { id: 1, questionId: 1, answer: 'Answer 1' },
    ]);

    const generateNewId = (items) => {
        return items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
      };

      console.log(answers)

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
            answer: ""
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
    
    return (
        <form>
            <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>Add Question</button>
            <div>
                {questions?.map((question, index) => 
                    <QuestionItem 
                        key={question.id} 
                        question={question}
                        index={index}
                        answers={answers}
                        onRemoveQuestion={handleRemoveQuestion}
                        onQuestionChange={(newText) => handleQuestionChange(question.id, newText)}
                        onAnswerChange={handleAnswerChange}
                    />
                )}
            </div>
        </form>
    )
}

export {QuestionList};