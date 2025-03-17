import {QuizList} from "../../components/QuizList/QuizList.jsx";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AppPath} from "../../common/enums/AppPath.js";

const HomePage = () => {
    return (
        <div className="p-3">
            <h1>Quiz Catalog</h1>

            <Link to={AppPath.CreateQUiz}>
                <Button>Create Quiz</Button>
            </Link>
            <QuizList/>
        </div>
    )
}

export {HomePage };