import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../common/enums/apiUrl.js";
import { QuizItem } from "../QuizItem/QuizItem.jsx";

const QuizList = ({ quizzes, setQuizzes }) => {
	const handleRemoveQuiz = async (id) => {
		const response = await axios.delete(`${apiUrl}/quizzes/${id}`);
		if (response.status === 404) {
			toast.error(response.statusText);
		} else if (response.status < 404) {
			setQuizzes((prevState) =>
				[...prevState].filter((quiz) => quiz.id !== id),
			);
			toast.success("Quiz successfully removed.");
		}
	};

	return (
		<div>
			<ToastContainer />
			<div className="d-flex justify-content-center flex-wrap align-items-center gap-5 p-3">
				{quizzes?.map((quiz) => (
					<QuizItem key={quiz.id} {...quiz} onRemoveQuiz={handleRemoveQuiz} />
				))}
			</div>
		</div>
	);
};

export { QuizList };
