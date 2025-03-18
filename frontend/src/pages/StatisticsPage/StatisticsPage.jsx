import {useEffect, useState} from "react";
import axios from "axios";
import {apiUrl} from "../../common/enums/apiUrl.js";
import {useParams} from "react-router-dom";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
import { Bar, Pie } from "react-chartjs-2";

const StatisticsPage = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState({
            "averageCompletionTime": 120,
            "completions": {
                "perDay": [
                    { "date": "2023-03-20", "count": 10 },
                    { "date": "2023-03-21", "count": 15 },
                    { "date": "2023-03-22", "count": 7 }
                ],
                "perWeek": [ /* ... */ ],
                "perMonth": [ /* ... */ ]
            },
            "questionStats": [
                {
                    "questionId": 1,
                    "questionText": "What is your favorite color?",
                    "answers": [
                        { "answer": "Red", "count": 10 },
                        { "answer": "Blue", "count": 5 },
                        { "answer": "Green", "count": 2 }
                    ]
                },
                {
                    "questionId": 2,
                    "questionText": "Which day did you take the quiz?",
                    "answers": [
                        { "answer": "Monday", "count": 7 },
                        { "answer": "Tuesday", "count": 8 },
                        { "answer": "Wednesday", "count": 4 }
                    ]
                }
            ]
        }
    );

    useEffect(() => {
        const getStatistics = async () => {
            const response = await axios.get(`${apiUrl}/quizzes/${quizId}/statistics`);
            setQuiz(response.data)
        }
        getStatistics();
    }, [quizId]);


    return (
        <div className="p-5">
            <h1>StatisticsPage</h1>
            {
                quiz?.results?.length ? (
                    <>

                    </>
                ) : (
                    <h1>No data to show statistics</h1>
                )
            }
        </div>
    )
}

export { StatisticsPage };