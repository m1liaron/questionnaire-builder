import {useEffect, useState} from "react";
import axios from "axios";
import {apiUrl} from "../../common/enums/apiUrl.js";
import {useParams} from "react-router-dom";
import { format, parseISO } from "date-fns";
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
import {BackButton} from "../../components/common/BackButton/BackButton.jsx";

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
    const [quiz, setQuiz] = useState({});

    useEffect(() => {
        const getStatistics = async () => {
            const response = await axios.get(`${apiUrl}/quizzes/${quizId}/statistics`);
            setQuiz(response.data)
        }
        getStatistics();
    }, [quizId]);

    if (!quiz || !quiz.results) return <h1>Loading statistics...</h1>;


    const allTimeSpend = quiz.results?.map(result => result.timeSpend);
    const sumTimeSpend = allTimeSpend?.reduce((a,b) => a + b);
    const averageCompletionTime = sumTimeSpend / allTimeSpend?.length;

    const completionsByPeriod = quiz.results.reduce((acc, result) => {
        if (!result.createdAt) return acc;
        
        const date = format(parseISO(result.createdAt), "yyyy-MM-dd"); // Format as YYYY-MM-DD
        const week = format(parseISO(result.createdAt), "yyyy-'W'ww"); // Format as YYYY-WEEK
        const month = format(parseISO(result.createdAt), "yyyy-MM"); // Format as YYYY-MM

        acc.daily[date] = (acc.daily[date] || 0) + 1;
        acc.weekly[week] = (acc.weekly[week] || 0) + 1;
        acc.monthly[month] = (acc.monthly[month] || 0) + 1;

        return acc;
    }, { daily: {}, weekly: {}, monthly: {} });

    // Convert grouped data to Chart.js format
    const createChartData = (groupedData, label) => ({
        labels: Object.keys(groupedData),
        datasets: [
            {
                label: label,
                data: Object.values(groupedData),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    });

    const dailyData = createChartData(completionsByPeriod.daily, "Completions per Day");
    const weeklyData = createChartData(completionsByPeriod.weekly, "Completions per Week");
    const monthlyData = createChartData(completionsByPeriod.monthly, "Completions per Month");

    return (
        <div className="p-5">
            <header className="d-flex align-items-center gap-3">
                <BackButton/>
                <h1>StatisticsPage</h1>
            </header>
            {
                quiz?.results?.length ? (
                    <>
                        <h1>Average Completion Time: {averageCompletionTime}</h1>
                        <div className="d-flex justify-content-center align-items-center flex-wrap">
                            <div className="my-5">
                                <h2>Completions per Day</h2>
                                <Bar data={dailyData} />
                            </div>

                            <div className="my-5">
                                <h2>Completions per Week</h2>
                                <Bar data={weeklyData} />
                            </div>

                            <div className="my-5">
                                <h2>Completions per Month</h2>
                                <Bar data={monthlyData} />
                            </div>
                        </div>
                    </>
                ) : (
                    <h1>No data to show statistics</h1>
                )
            }
        </div>
    )
}

export { StatisticsPage };