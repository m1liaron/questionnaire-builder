import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../common/enums/apiUrl.js";
import { QuizForm } from "../../components/QuizForm/QuizForm";
import { BackButton } from "../../components/common/BackButton/BackButton";

const UpdateQuizPage = () => {
	const { quizId } = useParams();
	const [quiz, setQuiz] = useState({});

	const getQuiz = async () => {
		const response = await axios.get(`${apiUrl}/quizzes/${quizId}`);
		setQuiz(response.data);
	};

	useEffect(() => {
		getQuiz();
	}, [quizId]);

	const updateQuiz = async (data) => {
		await axios.patch(`${apiUrl}/quizzes/${quizId}`, data);
	};

	return (
		<div className="p-5">
			<header className="d-flex">
				<BackButton />
				<h1>Update Quiz</h1>
			</header>
			{quiz?.questions?.length && (
				<QuizForm
					initialQuiz={quiz}
					onSubmit={updateQuiz}
					submitButtonText={"Update Quiz"}
				/>
			)}
		</div>
	);
};

export { UpdateQuizPage };
