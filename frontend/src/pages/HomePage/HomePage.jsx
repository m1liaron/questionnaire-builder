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
import Spinner from 'react-bootstrap/Spinner';

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
	const [page, setPage] = useState(1);
	const [haveMoreQuizzes, setHaveMoreQuizzes] = useState(true);

	// When sort options change, reset to first page and clear quizzes
	useEffect(() => {
		setPage(1);
		setQuizzes([]);
	}, [sortBy, order]);

	// Check if the user has scrolled to the bottom
	const isBottomOfPage = () => {
		const scrollTop =
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
		const scrollHeight =
			(document.documentElement && document.documentElement.scrollHeight) ||
			document.body.scrollHeight;
		const clientHeight = document.documentElement.clientHeight || window.innerHeight;
		return scrollTop + clientHeight >= scrollHeight - 50; // 50px buffer
	};

	// Increase page if bottom reached
	const ifBottomPageAndMorePage = () => {
		if (isBottomOfPage() && haveMoreQuizzes) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", ifBottomPageAndMorePage);
		return () => {
			window.removeEventListener("scroll", ifBottomPageAndMorePage);
		};
	}, [haveMoreQuizzes]);

	// Fetch quizzes whenever page, sortBy, or order changes
	useEffect(() => {
		const getQuizzes = async () => {
			try {
				const response = await axios.get(
					`${apiUrl}/quizzes?sort=${sortBy}&order=${order}&page=${page}`
				);
				const { quizzes, haveMoreQuizzes } = response.data || [];
				if (page === 1) {
					setQuizzes(quizzes);
				} else {
					setQuizzes((prevQuizzes) => [...prevQuizzes, ...quizzes]);
				}
				setHaveMoreQuizzes(haveMoreQuizzes)
			} catch (error) {
				console.error("Error fetching quizzes:", error);
			}
		};
		if(haveMoreQuizzes) {
			getQuizzes();
		}
	}, [page, sortBy, order]);

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
			{/* Render the list of quizzes */}
			<QuizList quizzes={quizzes} setQuizzes={setQuizzes} />
			{haveMoreQuizzes && (
				<Button
					style={{ margin: "0 auto" }}
					className="d-flex justify-content-center"
					onClick={() => setPage(page + 1)}
				>
					Loading...
				</Button>
			)}
		</div>
	);
};

export { HomePage };
