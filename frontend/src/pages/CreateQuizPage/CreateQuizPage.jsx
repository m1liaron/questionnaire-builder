import { BackButton } from "../../components/common/BackButton/BackButton.jsx";
import {QuestionList} from "../../components/QuestionList/QuestionList.jsx";

const CreateQuizPage = () => {
    return (
        <div className="p-5">
            <BackButton/>
            <h1>Create quiz</h1>

            <QuestionList/>
        </div>
    );
}

export {CreateQuizPage};