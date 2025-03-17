import {Button, Form, InputGroup, ListGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiUrl} from "../../api/apiUrl.js";
import {useNavigate, useParams} from "react-router-dom";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import { BackButton } from "../../components/common/BackButton/BackButton.jsx";

const RunQuizPage = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState({});
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [currentAnswers, setCurrentAnswers] = useState([]);
    const [timeSpend, setTimeSpend] = useState(0);

    useEffect(() => {
        let intervalId;
        if(isQuizStarted) {
            intervalId = setInterval(() => {
                setTimeSpend(prevTime => prevTime + 1);
            }, 1000);

            return () => {
                clearInterval(intervalId);
            }
        }
    }, [isQuizStarted])

    useEffect(() => {
        const getQuiz = async () => {
            const response = await axios.get(`${apiUrl}/quizzes/${quizId}`);
            setQuiz(response.data);
        }
        getQuiz();
    }, [quizId]);


    const handleStartQuiz = () => {
        setIsQuizStarted(true);
        setResults([]);
        setQuestionIndex(0);
    }

    const RenderQuestionAnswer = () => {
        const currentQuestion = quiz?.questions[questionIndex]
        if (!currentQuestion) return null;

        switch (currentQuestion.type) {
            case "Text":
                return <Form.Control
                    placeholder="Your Answer"
                    aria-label="Your Answer"
                    aria-describedby="basic-addon1"
                    style={{ maxWidth: 400 }}
                />
            case "Single Choice":
                return (
                    <ListGroup>
                        {currentQuestion.answers.map((answer) => (
                            <div
                                key={answer.id}
                                className="d-flex align-items-center gap-3 p-2"
                            >
                                <input
                                    type="radio"
                                    name="single-choice"
                                    onChange={() => setCurrentAnswer(answer)}
                                    checked={currentAnswer?.id === answer.id}
                                />
                                <ListGroup.Item as="li">{answer.answer}</ListGroup.Item>
                            </div>
                        ))}
                    </ListGroup>
                );
                case "Multiple Choice":
                    return (
                        <ListGroup>
                            {currentQuestion.answers.map((answer) => (
                                <div
                                    key={answer.id}
                                    className="d-flex align-items-center gap-3 p-2"
                                >
                                    <input
                                        type="checkbox"
                                        onChange={() => toggleMultiAnswer(answer)}
                                        checked={
                                            currentAnswers.some((a) => a.id === answer.id) || false
                                        }
                                    />
                                    <ListGroup.Item as="li">{answer.answer}</ListGroup.Item>
                                </div>
                            ))}
                        </ListGroup>
                    );
            default:
                return null;
        }
    }

    const toggleMultiAnswer = (answer) => {
            setCurrentAnswers((prev )  => {
                if (prev.some((a) => a.id === answer.id)) {
                    return prev.filter((a) => a.id !== answer.id);
                } else {
                    return [...prev, answer];
                }
            })
    }

    // Called when user clicks "Answer" button
    const handleAnswerQuestion = async () => {
        const currentQuestion = quiz.questions[questionIndex];
        const rightAnswer = currentQuestion.answers.find(answer => answer.isCorrect);

        let answerPayload = { question: currentQuestion, answer: rightAnswer, userAnswer: "" };
        if (currentQuestion.type === "Text") {
            answerPayload.userAnswer = currentAnswer;
        } else if (currentQuestion.type === "Single Choice") {
            answerPayload.userAnswer = currentAnswer ? currentAnswer.answer : "";
        } else if (currentQuestion.type === "Multiple Choices") {
            answerPayload.userAnswer = currentAnswers.map((a) => a.answer).join(", ");
        }

        setResults((prevResults) => [...prevResults, answerPayload]);

        setCurrentAnswer("");
        setCurrentAnswers([]);

        if (questionIndex < quiz.questions.length - 1) {
            setQuestionIndex((prev) => prev + 1);
        } else {
            // Quiz is finished, send the results to backend
            const finalResults = [...results, answerPayload]
            const validatedResultsData = {
                quizId: quiz.id,
                timeSpend: timeSpend,
                questions: finalResults.map(result => ({
                    questionId: result.question.id,
                    answerId: result.answer ? result.answer.id : null,
                    userAnswer: result.userAnswer,
                    isAnswerCorrect: result.userAnswer === result.answer?.answer,
                }))
            }
            console.log(timeSpend)
            await submitResults(validatedResultsData);
            setIsQuizStarted(false);
            setIsQuizFinished(true);
        }
    };

    const submitResults = async (resultData) => {
        try {
            const response = await axios.post(`${apiUrl}/results`, resultData);
            console.log("Results submitted:", response.data);
            // Optionally, navigate to a results page or show a success message.
        } catch (error) {
            console.error("Failed to submit results:", error);
        }
    };

    return (
        <div className="p-5">
            <header className="d-flex align-items-center gap-5">
                <BackButton/>
                <h3>{quiz.name || "Loading Quiz..."}</h3>
                {isQuizStarted && <span>{timeSpend}</span>}
            </header>

            {isQuizFinished ? (
                <div>
                    {results.map(({ question, answer, userAnswer }, index) => (
                        <ListGroup key={index} className="mb-3">
                            <ListGroup.Item>
                                <strong>Question:</strong> {question.text}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Correct Answer:</strong> {answer?.answer}
                            </ListGroup.Item>
                            <ListGroup.Item
                                style={{
                                    color: userAnswer === answer?.answer ? "green" : "red",
                                }}
                            >
                                <strong>Your Answer:</strong> {userAnswer}
                            </ListGroup.Item>
                        </ListGroup>
                    ))}
                </div>
            ) : isQuizStarted ? (
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <div className="mb-3">
                        <h3>{quiz?.questions[questionIndex]?.text}</h3>
                    </div>
                    <RenderQuestionAnswer />
                    <div className="mb-3">
            <span>
              {questionIndex + 1}/{quiz.questions.length}
            </span>
                    </div>
                    <Button onClick={handleAnswerQuestion}>Answer</Button>
                </div>
            ) : (
                <>
                    {quiz?.questions?.length > 0 && (
                        <ListGroup as="ul" className="m-3">
                            <ListGroup.Item as="li" active>
                                Questions
                            </ListGroup.Item>
                            {quiz.questions.map((question) => (
                                <ListGroup.Item key={question.id} as="li">
                                    {question.text}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                    <Button onClick={handleStartQuiz}>Start Quiz</Button>
                </>
            )}
        </div>
    );
}

export { RunQuizPage };