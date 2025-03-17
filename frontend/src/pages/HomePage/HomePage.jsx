import {QuizList} from "../../components/QuizList/QuizList.jsx";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AppPath} from "../../common/enums/AppPath.js";
import { MdOutlineSort } from "react-icons/md";
import {useState} from "react";

const HomePage = () => {
    const [showSortModal, setShowSortModal] = useState(false);

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
                <div className="position-absolute border border-2 p-3" style={{right: 0, background: "white"}}>
                    <span>Sort by</span>
                    <div className="d-flex flex-column gap-1">
                        <Button>Name</Button>
                        <Button>Amount Of Questions</Button>
                        <Button>Amount Of Completion</Button>
                    </div>
                </div>
            )}

            <Link to={AppPath.CreateQuiz}>
                <Button>Create Quiz</Button>
            </Link>
            <QuizList/>
        </div>
    )
}

export {HomePage};