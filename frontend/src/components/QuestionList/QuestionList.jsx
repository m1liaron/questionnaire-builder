import {useState} from "react";
import {FaTrash} from "react-icons/fa";

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
                {questions?.map((question) => (
                    <div key={question.id} className="d-flex align-items-center gap-5">
                        <div className="d-flex align-items-center">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Question</label>
                                <input type="text" className="form-control" id="exampleInputEmail1"/>
                            </div>
                            <select name="type">
                                <option value="text">Text</option>
                                <option value="single choice">Single Choice</option>
                                <option value="multiple choices">Multiple Choices</option>
                            </select>
                        </div>
                        <FaTrash size={30} color="red" cursor="pointer"
                                 onClick={() => handleRemoveQuestion(question.id)}/>
                    </div>
                ))}
            </div>
        </form>
    )
}

export {QuestionList};