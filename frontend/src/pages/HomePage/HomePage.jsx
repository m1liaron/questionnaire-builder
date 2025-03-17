import {QuizList} from "../../components/QuizList/QuizList.jsx";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AppPath} from "../../common/enums/AppPath.js";
import { MdOutlineSort } from "react-icons/md";

const HomePage = () => {
    return (
        <div className="p-3">
            <header className="d-flex justify-content-between">
                <h1>Quiz Catalog</h1>
                <div>
                    <Button>
                        <MdOutlineSort size={20} />
                    </Button>
                </div>
            </header>

            <Link to={AppPath.CreateQuiz}>
                <Button>Create Quiz</Button>
            </Link>
            <QuizList/>
        </div>
    )
}

export {HomePage };