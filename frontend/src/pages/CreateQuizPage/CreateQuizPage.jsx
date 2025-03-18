import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../common/enums/apiUrl.js";
import { QuizForm } from "../../components/QuizForm/QuizForm.jsx";
import { BackButton } from "../../components/common/BackButton/BackButton.jsx";

const CreateQuizPage = () => {
	const [quiz, setQuiz] = useState({
		name: "",
		description: "",
		questions: [
			{
				id: 1,
				text: "Question 1",
				type: "Text",
				answers: [],
			},
		],
	});
	const navigate = useNavigate();

	const createQuiz = async (data) => {
		await axios.post(`${apiUrl}/quizzes`, data);
		navigate(-1);
	};

	return (
		<div className="p-5">
			<BackButton />
			<h1>Create quiz</h1>

			<QuizForm
				initialQuiz={quiz}
				onSubmit={createQuiz}
				submitButtonText={"Create Quiz"}
			/>
		</div>
	);
};

export { CreateQuizPage };
