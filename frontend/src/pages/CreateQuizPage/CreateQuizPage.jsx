import { useState } from "react";
import { BackButton } from "../../components/common/BackButton/BackButton.jsx";
import { QuizForm } from "../../components/QuizForm/QuizForm.jsx";

const CreateQuizPage = () => {
    const [quiz, setQuiz] = useState({
        name: "",
        description: "",
        questions: [
            {
                id: 1,
                text: "Question 1",
                type: "Text",
                answers: []
            }
        ]
    });

    const createQuiz = async (data) => {
        await  axios.post(`${apiUrl}/quizzes`, data);
  }

    return (
        <div className="p-5">
            <BackButton/>
            <h1>Create quiz</h1>

            <QuizForm
                initialQuiz={quiz}
                onSubmit={createQuiz}
                submitButtonText={"Create Quiz"}
            />
        </div>
    );
}

export {CreateQuizPage};