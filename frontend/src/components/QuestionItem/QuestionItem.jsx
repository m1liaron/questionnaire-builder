import { FaTrash } from "react-icons/fa";

const QuestionItem = ({ id, index, handleRemoveQuestion}) => {
    return (
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
    )
}

export { QuestionItem };