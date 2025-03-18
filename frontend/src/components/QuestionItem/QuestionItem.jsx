import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const questionsType = [
	{ key: "Text", label: "Text" },
	{ key: "Single Choice", label: "Single Choice" },
	{ key: "Multiple Choices", label: "Multiple Choices" },
	{ key: "Image", label: "Image" },
];

const QuestionItem = ({
	question,
	index,
	answers,
	onRemoveQuestion,
	onRemoveAnswer,
	onQuestionChange,
	onTypeChange,
	onAnswerChange,
	onToggleCorrectAnswer,
	onAddAnswer,
}) => {
	const { id, text, type } = question;
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		border: "1px solid #ccc",
		padding: "1rem",
		marginBottom: "1rem",
		background: "#fff",
	};

	return (
		<div
			className="border border-2 m-2 p-2"
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			<div className="d-flex align-items-center gap-5">
				<span>{index + 1}</span>
				<div className="d-flex align-items-center gap-3">
					<div className="mb-3">
						<label htmlFor={`question-${id}`} className="form-label">
							Question
						</label>
						<input
							type="text"
							className="form-control"
							id={`question-${id}`}
							value={text}
							onChange={(e) => onQuestionChange(id, e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor={`type-${id}`} className="form-label">
							Type
						</label>

						<select
							name="type"
							id={`type-${id}`}
							value={type}
							onChange={(e) => onTypeChange(id, e.target.value)}
						>
							{questionsType.map((questionType) => (
								<option key={questionType.key} value={questionType.key}>
									{questionType.label}
								</option>
							))}
						</select>
					</div>
				</div>
				<FaTrash
					size={30}
					color="red"
					cursor="pointer"
					onClick={() => onRemoveQuestion(id)}
				/>
			</div>

			{(type !== "Text" || type !== "Image") && (
				<div>
					<span>Answers</span>
					<ul className="list-group">
						{(type === "Single Choice" || type === "Multiple Choices") &&
							answers.length < 5 && (
								<Button type="button" onClick={() => onAddAnswer(id)}>
									Add Answer
								</Button>
							)}
						{(type !== "Text" || type !== "Image") &&
							answers.map((answer, idx) => (
								<li
									key={answer.id}
									className="list-group-item d-flex justify-content-between align-items-center"
								>
									<div className="d-flex align-items-center gap-3">
										{type === "Single Choice" && (
											<input
												type="radio"
												name={`correct-${id}`}
												checked={answer.isCorrect || false}
												onChange={() =>
													onToggleCorrectAnswer(id, answer.id, "single")
												}
											/>
										)}
										{type === "Multiple Choices" && (
											<input
												type="checkbox"
												checked={answer.isCorrect || false}
												onChange={() =>
													onToggleCorrectAnswer(id, answer.id, "multiple")
												}
											/>
										)}
										<div>
											<label
												htmlFor={`answer-${answer.id}`}
												className="form-label"
											>
												Choice {idx + 1}
											</label>
											<input
												type="text"
												className="form-control"
												id={`answer-${answer.id}`}
												value={answer.answer}
												onChange={(e) =>
													onAnswerChange(id, answer.id, e.target.value)
												}
											/>
										</div>
									</div>
									<FaTrash
										size={30}
										color="red"
										cursor="pointer"
										onClick={() => onRemoveAnswer(answer.id, id)}
									/>
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	);
};

export { QuestionItem };
