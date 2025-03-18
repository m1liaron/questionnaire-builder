import { FaTrash } from "react-icons/fa";

const AnswerItem = ({
	answer,
	onRemoveAnswer,
	questionId,
	idx,
	type,
	onToggleCorrectAnswer,
	onAnswerChange,
}) => {
	return (
		<li
			key={answer.id}
			className="list-group-item d-flex justify-content-between align-items-center"
		>
			<div className="d-flex align-items-center gap-3">
				{type === "Single Choice" && (
					<input
						type="radio"
						name={`correct-${answer.id}`}
						checked={answer.isCorrect || false}
						onChange={() =>
							onToggleCorrectAnswer(questionId, answer.id, "single")
						}
					/>
				)}
				{type === "Multiple Choices" && (
					<input
						type="checkbox"
						checked={answer.isCorrect || false}
						onChange={() =>
							onToggleCorrectAnswer(questionId, answer.id, "multiple")
						}
					/>
				)}
				<div>
					<label htmlFor={`answer-${answer.id}`} className="form-label">
						Choice {idx + 1}
					</label>
					<input
						type="text"
						className="form-control"
						id={`answer-${answer.id}`}
						value={answer.answer}
						onChange={(e) =>
							onAnswerChange(questionId, answer.id, e.target.value)
						}
					/>
				</div>
			</div>
			<FaTrash
				size={30}
				color="red"
				cursor="pointer"
				onClick={() => onRemoveAnswer(answer.id, questionId)}
			/>
		</li>
	);
};
