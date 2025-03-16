import { FaTrash } from "react-icons/fa";

const QuestionItem = ({ id, index, answers, handleRemoveQuestion}) => {

    const filteredAnswers = answers.filter(answer => answer.questionId === id);

    return (
        <div className="border border-2 m-2 p-2">
            <div className="d-flex align-items-center gap-5">
                <span>{index+1}</span>
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
                <FaTrash size={30} color="red" cursor="pointer" onClick={() => handleRemoveQuestion(id)}/>
            </div>  
            <div>
                <span>Answers</span>
                {filteredAnswers?.map((answer, index) => (
                    <ul className="d-flex align-items-center gap-4">
                        <span>{index}</span>
                        <li key={answer.id} className="mb-3">
                            <div>
                                <label htmlFor="exampleInputEmail1" className="form-label">Choice</label>
                                <input type="text" className="form-control" id="exampleInputEmail1"/>
                            </div>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export { QuestionItem };