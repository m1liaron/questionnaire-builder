import { BsThreeDotsVertical } from "react-icons/bs";
import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AppPath} from "../../common/enums/AppPath.js";

const QuizItem = ({ id, name, description, questionsAmount = 1, onRemoveQuiz }) => {
    const [showActionsModal, setShowActionsModal] = useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);

    const handleShowRemoveAlertModal = () => {
        setShowAlertModal(true);
        setShowActionsModal(false);
    }

    const handleRemoveQuiz = () => {
        setShowAlertModal(false);
        onRemoveQuiz(id);
    }

    return (
        <>
            <div className="border border-3 p-3 " style={{minWidth: "400px", maxWidth: "600px"}}>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 style={{ lineBreak: "anywhere"}}>{name}</h3>
                    <BsThreeDotsVertical cursor="pointer" size={30} onClick={() => setShowActionsModal(!showActionsModal)}/>
                </div>
                <p style={{ lineBreak: "anywhere"}}>{description}</p>

                <p>Questions: {questionsAmount}</p>
            </div>
            {showActionsModal && (
                    <div
                        className="modal"
                        style={{display: 'block', position: 'absolute'}}
                    >
                        <Modal.Dialog>
                            <Modal.Header closeButton onClick={() => setShowActionsModal(false)}>
                                <Modal.Title>Actions: {name}</Modal.Title>
                            </Modal.Header>

                            <Modal.Body className="d-flex gap-4">
                                <Link to={AppPath.UpdateQuizPage.replace(':quizId', id)}><Button variant="primary">Edit</Button></Link>
                                <Link to={AppPath.RunQuizPage.replace(':quizId', id)}><Button variant="secondary">Run</Button></Link>
                                <Button variant="warning" onClick={handleShowRemoveAlertModal}>Remove</Button>
                            </Modal.Body>
                        </Modal.Dialog>
                    </div>
            )}
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showAlertModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Are you sure you want to delete this quiz?</h4>
                    </Modal.Body>

                    <Modal.Footer style={{ justifyContent: "space-between" }}>
                        <div className="d-flex gap-3">
                            <Button variant="warning" onClick={handleRemoveQuiz}>Yes</Button>
                            <Button variant="secondary" onClick={() => setShowAlertModal(false)}>No</Button>
                        </div>

                        <Button onClick={() => setShowAlertModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
}

export {QuizItem};