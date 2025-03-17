import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";
import { RiResetLeftFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AppPath } from "../../common/enums/AppPath.js";
import { apiUrl } from "../../common/enums/apiUrl.js";
import { QuizList } from "../../components/QuizList/QuizList.jsx";

const sortOptions = [
	{ key: "name", label: "Name" },
	{ key: "questionsAmount", label: "Amount Of Questions" },
	{ key: "amountOfCompletions", label: "Amount Of Completion" },
];

const HomePage = () => {
	const [quizzes, setQuizzes] = useState([]);
	const [sortBy, setSortBy] = useState("name");
	const [order, setOrder] = useState("ASC");
	const [showSortModal, setShowSortModal] = useState(false);

	useEffect(() => {
		const getQuizzes = async () => {
			try {
				const response = await axios.get(
					`${apiUrl}/quizzes?sort=${sortBy}&order=${order}`,
				);
				setQuizzes(response.data);
			} catch (error) {
				console.error("Error fetching quizzes:", error);
			}
		};

		getQuizzes();
	}, [sortBy, order]);

	const toggleOrder = () => setOrder(order === "ASC" ? "DESC" : "ASC");

	return (
		<div className="p-3">
			<header className="d-flex justify-content-between">
				<h1>Quiz Catalog</h1>
				<div>
					<Button onClick={() => setShowSortModal(!showSortModal)}>
						<MdOutlineSort size={20} />
					</Button>
				</div>
			</header>

			{showSortModal && (
				<div
					className="position-absolute border border-2 p-3"
					style={{ right: 0, background: "white" }}
				>
					<span>Sort by</span>
					<div className="d-flex flex-column gap-1">
						{sortOptions.map(({ key, label }) => (
							<Button key={key} onClick={() => setSortBy(key)}>
								{label}
							</Button>
						))}
					</div>
					<div className="d-flex p-2 justify-content-between">
						{order === "ASC" ? (
							<FaSortAmountUpAlt size={30} onClick={toggleOrder} />
						) : (
							<FaSortAmountDownAlt size={30} onClick={toggleOrder} />
						)}
						<RiResetLeftFill size={30} onClick={() => setSortBy("name")} />
					</div>
				</div>
			)}

			<Link to={AppPath.CreateQuiz}>
				<Button>Create Quiz</Button>
			</Link>
			<QuizList quizzes={quizzes} setQuizzes={setQuizzes} />
		</div>
	);
};

export { HomePage };
