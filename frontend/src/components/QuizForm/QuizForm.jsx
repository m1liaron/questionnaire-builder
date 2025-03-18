import {
	DndContext,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { QuestionItem } from "../QuestionItem/QuestionItem";

const QuizForm = ({ initialQuiz, onSubmit, submitButtonText }) => {
	const [quiz, setQuiz] = useState(initialQuiz);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 10 },
		}),
	);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (!over || active.id === over.id) return;

		const oldIndex = quiz.questions.findIndex((q) => q.id === active.id);
		const newIndex = quiz.questions.findIndex((q) => q.id === over.id);

		setQuiz((prev) => ({
			...prev,
			questions: arrayMove(prev.questions, oldIndex, newIndex),
		}));
	};

	const generateNewId = (items) => {
		return items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
	};

	const handleAddQuestion = () => {
		const newQuestionId = generateNewId(quiz.questions);
		const newQuestion = {
			id: newQuestionId,
			text: `Question ${newQuestionId}`,
			type: "Text",
			answers: [],
		};
		setQuiz((prev) => ({
			...prev,
			questions: [...prev.questions, newQuestion],
		}));
	};

	const handleRemoveQuestion = (questionId) => {
		setQuiz((prev) => ({
			...prev,
			questions: prev.questions.filter((q) => q.id !== questionId),
		}));
	};

	const handleRemoveAnswer = (answerId, questionId) => {
		setQuiz((prev) => ({
			...prev,
			questions: prev.questions.map((q) =>
				q.id === questionId
					? {
							...q,
							answers: q.answers.filter((answer) => answer.id !== answerId),
						}
					: q,
			),
		}));
	};

	const handleQuestionChange = (questionId, newText) => {
		setQuiz((prev) => ({
			...prev,
			questions: prev.questions.map((q) =>
				q.id === questionId ? { ...q, text: newText } : q,
			),
		}));
	};

	const handleAnswerChange = (questionId, answerId, newText) => {
		setQuiz((prev) => ({
			...prev,
			questions: prev.questions.map((q) =>
				q.id === questionId
					? {
							...q,
							answers: q.answers.map((a) =>
								a.id === answerId ? { ...a, answer: newText } : a,
							),
						}
					: q,
			),
		}));
	};

	const handleTypeChange = (questionId, newType) => {
		setQuiz((prev) => ({
			...prev,
			questions: prev.questions.map((q) =>
				q.id === questionId ? { ...q, type: newType } : q,
			),
		}));

		if (newType === "Text") {
			setQuiz((prev) => ({
				...prev,
				questions: prev.questions.map((q) => {
					if (q.id === questionId) {
						return { ...q, answers: q.answers.slice(0, 1) };
					}
					return q;
				}),
			}));
		}
	};

	const handleToggleCorrectAnswer = (questionId, answerId, mode) => {
		setQuiz((prev) => ({
			...prev,
			questions: prev.questions.map((q) => {
				if (q.id === questionId) {
					let updatedAnswers;
					if (mode === "single") {
						// For single choice, mark only the chosen answer as correct.
						updatedAnswers = q.answers.map((a) => ({
							...a,
							isCorrect: a.id === answerId,
						}));
					} else {
						// For multiple choices, toggle the isCorrect value.
						updatedAnswers = q.answers.map((a) =>
							a.id === answerId ? { ...a, isCorrect: !a.isCorrect } : a,
						);
					}
					return { ...q, answers: updatedAnswers };
				}
				return q;
			}),
		}));
	};

	const handleAddAnswer = (questionId) => {
		setQuiz((prev) => ({
			...prev,
			questions: prev.questions.map((q) => {
				if (q.id === questionId && q.answers.length < 5) {
					const newAnswerId = generateNewId(q.answers);
					return {
						...q,
						answers: [
							...q.answers,
							{ id: newAnswerId, answer: "Answer", isCorrect: false },
						],
					};
				}
				return q;
			}),
		}));
	};

	const onChangeTitle = (value) => {
		setQuiz((prev) => ({ ...prev, name: value }));
	};

	const onChangeDescription = (value) => {
		setQuiz((prev) => ({ ...prev, description: value }));
	};

	const validateQuizData = () => {
		if (!quiz.name.trim()) {
			toast.error("Quiz title is required!");
			return false;
		}

		if (!quiz.description.trim()) {
			toast.error("Quiz description is required!");
			return false;
		}

		if (!quiz.questions.length) {
			toast.error("Add at least 1 question!");
			return false;
		}

		for (const question of quiz.questions) {
			if (!question.text.trim() || question.text.startsWith("Question")) {
				toast.error(`Question "${question.text}" needs to be modified.`);
				return false;
			}

			if (question.type !== "Text" && question.answers.length < 2) {
				toast.error(
					`Question "${question.text}" must have at least 2 answers.`,
				);
				return false;
			}

			for (const answer of question.answers) {
				if (!answer.answer.trim() || answer.answer.startsWith("Answer")) {
					toast.error(
						`Answer "${answer.answer}" for question "${question.text}" needs to be modified.`,
					);
					return false;
				}
			}
		}

		return true;
	};

	const handleSubmit = async () => {
		if (validateQuizData) {
			onSubmit({ quiz });
		}
	};

	return (
		<div>
			<ToastContainer />
			<div className="mb-5">
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Title
					</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={(e) => onChangeTitle(e.target.value)}
						value={quiz.name}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Description
					</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={(e) => onChangeDescription(e.target.value)}
						value={quiz.description}
					/>
				</div>
				<button
					type="submit"
					className="btn btn-success"
					onClick={handleSubmit}
				>
					{submitButtonText}
				</button>
			</div>
			<button
				type="button"
				className="btn btn-primary"
				onClick={handleAddQuestion}
			>
				Add Question
			</button>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={quiz.questions.map((q) => q.id)}
					strategy={verticalListSortingStrategy}
				>
					{quiz.questions.map((q, index) => (
						<QuestionItem
							key={q.id}
							question={q}
							index={index}
							answers={q.answers}
							onRemoveQuestion={handleRemoveQuestion}
							onRemoveAnswer={handleRemoveAnswer}
							onQuestionChange={handleQuestionChange}
							onTypeChange={handleTypeChange}
							onAnswerChange={handleAnswerChange}
							onToggleCorrectAnswer={handleToggleCorrectAnswer}
							onAddAnswer={handleAddAnswer}
						/>
					))}
				</SortableContext>
			</DndContext>
		</div>
	);
};

export { QuizForm };
