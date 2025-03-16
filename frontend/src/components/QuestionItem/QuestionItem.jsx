import { FaTrash } from "react-icons/fa";

const QuestionItem = ({
  question,
  index,
  answers,
  onRemoveQuestion,
  onQuestionChange,
  onAnswerChange
}) => {
  const { id, question: questionText, type } = question;

    const filteredAnswers = answers.filter(answer => answer.questionId === id);

  return (
    <div className="border border-2 m-2 p-2">
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
              value={questionText}
              onChange={(e) => onQuestionChange(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor={`type-${id}`} className="form-label">
              Type
            </label>
            <select name="type" id={`type-${id}`} value={type}>
              <option value="Text">Text</option>
              <option value="Single Choice">Single Choice</option>
              <option value="Multiple Choices">Multiple Choices</option>
            </select>
          </div>
        </div>
        <FaTrash size={30} color="red" cursor="pointer" onClick={() => onRemoveQuestion(id)} />
      </div>
      <div>
        <span>Answers</span>
          {filteredAnswers.map((answer, idx) => (
            <ul className="list-group">
                <li key={answer.id} className="list-group-item">
                <div>
                    <label htmlFor={`answer-${answer.id}`} className="form-label">
                    Choice {idx + 1}
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id={`answer-${answer.id}`}
                    value={answer.answer}
                    onChange={(e) => onAnswerChange(answer.id, e.target.value)}
                    />
                </div>
                </li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export { QuestionItem };
