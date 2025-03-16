import {useState} from "react";
import {FaTrash} from "react-icons/fa";
import { QuestionItem } from "../QuestionItem/QuestionItem";

const QuestionList = () => {
    const [questions, setQuestions] = useState([{
        id: 1,
        question: 'Question 1',
        type: 'Text'
    }]);

    const handleAddQuestion = () => {
        setQuestions((prevState) => [...prevState, {
            id: questions.length + 1,
            question: `Question ${questions.length + 1}`,
            type: 'Text'
        }])
    }

    const handleRemoveQuestion = (id) => {
        setQuestions(prevState =>  prevState.filter(question => question.id !== id))
    }

    return (
        <form>
            <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>Add Question</button>
            <div>
                {questions?.map((question, index) => 
                    <QuestionItem 
                        key={question.id} 
                        id={question.id} 
                        index={index}
                        handleRemoveQuestion={handleRemoveQuestion}
                    />)}
            </div>
        </form>
    )
}

export {QuestionList};