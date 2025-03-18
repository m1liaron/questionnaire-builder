import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../common/enums/apiUrl.js";
import { useParams } from "react-router-dom";
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
    BarElement,
    ArcElement
} from "chart.js";
import { BackButton } from "../../components/common/BackButton/BackButton.jsx";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const StatisticsPage = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState({});

    useEffect(() => {
        const getStatistics = async () => {
            try {
                const response = await axios.get(`${apiUrl}/quizzes/${quizId}/statistics`);
                setQuiz(response.data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };
        getStatistics();
    }, [quizId]);

    if (!quiz || !quiz.results) return <h1>Loading statistics...</h1>;

    // Calculate average completion time
    const allTimeSpend = quiz.results.map(result => result.timeSpend);
    const sumTimeSpend = allTimeSpend.reduce((a, b) => a + b, 0);
    const averageCompletionTime = allTimeSpend.length ? sumTimeSpend / allTimeSpend.length : 0;

    // Group completions by day, week, and month for bar charts
    const completionsByPeriod = quiz.results.reduce((acc, result) => {
        if (!result.createdAt) return acc;
        
        const date = format(parseISO(result.createdAt), "yyyy-MM-dd"); // e.g., 2025-03-18
        const week = format(parseISO(result.createdAt), "yyyy-'W'ww");  // e.g., 2025-W11
        const month = format(parseISO(result.createdAt), "yyyy-MM");     // e.g., 2025-03

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

    // Extract unique questions from results
    const questionsMap = {};
    quiz.results.forEach(result => {
        result.resultQuestions.forEach(rq => {
            if (rq.question && !questionsMap[rq.question.id]) {
                questionsMap[rq.question.id] = rq.question;
            }
        });
    });
    const uniqueQuestions = Object.values(questionsMap);

    // Prepare pie chart data for a given question
    const createPieData = (question) => ({
        labels: question.answers.map(a => a.answer),
        datasets: [
            {
                data: question.answers.map(a => a.amountOfSelection),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#8A2BE2",
                    "#00FA9A"
                ],
            },
        ],
    });

    return (
        <div className="p-5">
            <header className="d-flex align-items-center gap-3">
                <BackButton />
                <h1>StatisticsPage</h1>
            </header>
            {quiz.results.length ? (
                <>
                    <h1>Average Completion Time: {averageCompletionTime.toFixed(2)} seconds</h1>
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                        <div className="my-5">
                            <h2>Completions per Day</h2>
                            <Bar data={dailyData} redraw key="bar-day" />
                        </div>
                        <div className="my-5">
                            <h2>Completions per Week</h2>
                            <Bar data={weeklyData} redraw key="bar-week" />
                        </div>
                        <div className="my-5">
                            <h2>Completions per Month</h2>
                            <Bar data={monthlyData} redraw key="bar-month" />
                        </div>
                    </div>
                    <div className="my-5">
                        <h2>Answer Distribution per Question</h2>
                        <div className="d-flex flex-wrap justify-content-center gap-4">
                            {uniqueQuestions.map(question => (
                                <div key={question.id} style={{ width: "300px" }}>
                                    <h3>{question.text}</h3>
                                    <Pie data={createPieData(question)} redraw key={`pie-${question.id}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <h1>No data to show statistics</h1>
            )}
        </div>
    );
};

export { StatisticsPage };
