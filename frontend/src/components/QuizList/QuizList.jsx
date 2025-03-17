import {useEffect, useState} from "react";
import {QuizItem} from "../QuizItem/QuizItem.jsx";
import axios from "axios";
import {apiUrl} from "../../api/apiUrl.js";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState();

    useEffect(() => {
        const getQuizzes = async () => {
            const response = await axios.get(`${apiUrl}/quizzes`);
            setQuizzes(response.data);
        }
        getQuizzes();
    }, []);

    return (
        <div>

            <div className="d-flex justify-content-center flex-wrap align-items-center gap-5 p-3">
                {quizzes?.length && (
                    quizzes.map(quiz => <QuizItem key={quiz.id} {...quiz}/>)
                )}
            </div>
        </div>
    )
}

export { QuizList };