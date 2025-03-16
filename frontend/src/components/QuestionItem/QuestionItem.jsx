import { FaTrash } from "react-icons/fa";

const QuestionItem = ({
  question,
  index,
  answers,
  onRemoveQuestion,
  onQuestionChange,
  onTypeChange,
  onAnswerChange,
  onToggleCorrectAnswer,
  onAddAnswer
}) => {
  const { id, question: questionText, type } = question;

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
              <option value="Text">Text</option>
              <option value="Single Choice">Single Choice</option>
              <option value="Multiple Choices">Multiple Choices</option>
            </select>
          </div>
        </div>
        <FaTrash size={30} color="red" cursor="pointer" onClick={() => onRemoveQuestion(id)} />
      </div>

      {type !== "Text" && (
          <div>
            <span>Answers</span>
            <ul className="list-group">
              {type !== "Text" && answers.map((answer, idx) => (
                  <li key={answer.id} className="list-group-item">
                    <div className="d-flex align-items-center gap-3">
                      {type === "Single Choice" && (
                          <input
                              type="radio"
                              name={`correct-${id}`}
                              checked={answer.isCorrect || false}
                              onChange={() => onToggleCorrectAnswer(id, answer.id, "single")}
                          />
                      )}
                      {type === "Multiple Choices" && (
                          <input
                              type="checkbox"
                              checked={answer.isCorrect || false}
                              onChange={() => onToggleCorrectAnswer(id, answer.id, "multiple")}
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
                            onChange={(e) => onAnswerChange(answer.id, e.target.value)}
                        />
                      </div>
                    </div>
                  </li>
              ))}
            </ul>
            {(type === "Single Choice" || type === "Multiple Choices") && answers.length < 5 && (
                <button type="button" onClick={() => onAddAnswer(id)}>
                  Add Answer
                </button>
            )}
          </div>
      )}
    </div>
  );
};

export {QuestionItem};
