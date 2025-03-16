import { FaTrash } from "react-icons/fa";

const CreateQuizPage = () => {
    return (
        <div className="p-5">
            <h1>Create quiz</h1>

            <form>
                <div className="d-flex align-items-center gap-5">
                    <div className="d-flex align-items-center">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Question</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"/>
                        </div>
                        <select name="cars" id="cars">
                            <option value="text">Text</option>
                            <option value="single choice">Single Choice</option>
                            <option value="multiple choices">Multiple Choices</option>
                        </select>
                    </div>
                    <FaTrash size={30} color="red" cursor="pointer"/>
                </div>
                <button type="submit" className="btn btn-primary">Add Question</button>
            </form>
        </div>
    );
}

export {CreateQuizPage};