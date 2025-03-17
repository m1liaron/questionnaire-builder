import {useEffect, useState} from "react";
import {QuizItem} from "../QuizItem/QuizItem.jsx";
import axios from "axios";
import {apiUrl} from "../../api/apiUrl.js";
import {toast, ToastContainer} from "react-toastify";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState();

    useEffect(() => {
        const getQuizzes = async () => {
            const response = await axios.get(`${apiUrl}/quizzes`);
            setQuizzes(response.data);
        }
        getQuizzes();
    }, []);

    const handleRemoveQuiz = async (id) => {
        const response = await axios.delete(`${apiUrl}/quizzes/${id}`);
        if(response.status === 404) {
            toast.error(response.statusText);
        } else if(response.status < 404) {
            setQuizzes(prevState => [...prevState].filter(quiz=> quiz.id !== id))
            toast.success("Quiz successfully removed.");
        }
    }

    return (
        <div>
            <ToastContainer/>
            <div className="d-flex justify-content-center flex-wrap align-items-center gap-5 p-3">
                {quizzes?.map(quiz => <QuizItem key={quiz.id} {...quiz} onRemoveQuiz={handleRemoveQuiz}/>)}
            </div>
        </div>
    )
}

export { QuizList };