import {useEffect, useState} from "react";
import { getQuizzes } from "../../api/quizApi.js";
import {QuizItem} from "../QuizItem/QuizItem.jsx";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([{
            id: "1",
            name: 'Quiz 1',
            description: "Description of quiz",
            questionsAmount: 17
        },
        {
            id: "2",
            name: 'Quiz 2',
            description: "Description of quiz",
            questionsAmount: 17
        },
        {
            id: "3",
            name: 'Quiz 3',
            description: "Description of quiz",
            questionsAmount: 17
        }
    ]);

    useEffect(() => {
        const quizzes = getQuizzes();
        console.log(quizzes)
    }, []);

    return (
        <div className="p-3">
            <h1>Quiz Catalog</h1>

            <div className="d-flex justify-content-center flex-wrap align-items-center gap-5 p-3">
                {quizzes.length && (
                    quizzes.map(quiz => <QuizItem key={quiz.id} {...quiz}/>)
                )}
            </div>
        </div>
    )
}

export { QuizList };