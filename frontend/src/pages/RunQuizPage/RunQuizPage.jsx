import {Button, ListGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiUrl} from "../../api/apiUrl.js";
import {useNavigate, useParams} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const RunQuizPage = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState({});

    useEffect(() => {
        const getQuiz = async () => {
            const response = await axios.get(`${apiUrl}/quizzes/${quizId}`);
            setQuiz(response.data);
        }
        getQuiz();
    }, []);

    const navigateBack = () => {
        navigate(-1);
    }

    return (
        <div className="p-5">
            <header className="d-flex align-items-center gap-5">
                <FaArrowLeft cursor="pointer" size={30} onClick={navigateBack}/>
                <h3>{quiz.name}</h3>
            </header>

            {quiz?.questions?.length > 0 && (
                <ListGroup as="ul" className="m-3">
                    <ListGroup.Item as="li" active>
                        Questions
                    </ListGroup.Item>
                    {quiz.questions.map(question => (
                        <ListGroup.Item as="li">{question.text}</ListGroup.Item>
                    ))}
                </ListGroup>
            )}
            <Button>Start Quiz</Button>
        </div>
    )
}

export { RunQuizPage };