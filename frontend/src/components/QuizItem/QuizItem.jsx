import { BsThreeDotsVertical } from "react-icons/bs";

const QuizItem = ({ name, description, questionsAmount = 1 }) => {
    return (
        <div className="border border-3 p-3 " style={{ minWidth: "400px" }}>
            <div className="d-flex justify-content-between align-items-center">
                <h3>{name}</h3>
                <BsThreeDotsVertical cursor="pointer"/>
            </div>
            <p>{description}</p>

            <p>Questions: {questionsAmount}</p>
        </div>
    )
}

export { QuizItem };