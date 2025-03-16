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

    const handleAddQuestion = () => {
        setQuestions((prevState) => [...prevState, {
            id: questions.length + 1,
            question: `Question ${questions.length + 1}`,
            type: 'Text'
        }]);
        setAnswers((prevState) => [...prevState, {
            id: answers.length + 1,
            question: `Question ${answers.length + 1}`,
            questionId: questions.length + 1,
            answer: ''
        }])
    }

    const handleRemoveQuestion = (id) => {
        setQuestions(prevState =>  prevState.filter(question => question.id !== id))
        setAnswers(prevState => prevState.filter(answer => answer.questionId !== id));
    }

    return (
        <form>
            <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>Add Question</button>
            <div>
                {questions?.map(({ id }, index) => 
                    <QuestionItem 
                        key={id} 
                        id={id} 
                        index={index}
                        answers={answers}
                        handleRemoveQuestion={handleRemoveQuestion}
                    />)}
            </div>
        </form>
    )
}

export {QuestionList};