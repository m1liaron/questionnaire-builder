import { BsThreeDotsVertical } from "react-icons/bs";
import {useState} from "react";
import {Button, Modal} from "react-bootstrap";

const QuizItem = ({ name, description, questionsAmount = 1 }) => {
    const [showActionsModal, setShowActionsModal] = useState(false);

    return (
        <>
            <div className="border border-3 p-3 " style={{minWidth: "400px"}}>
                <div className="d-flex justify-content-between align-items-center">
                    <h3>{name}</h3>
                    <BsThreeDotsVertical cursor="pointer" onClick={() => setShowActionsModal(!showActionsModal)}/>
                </div>
                <p>{description}</p>

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
                                <Button variant="primary">Edit</Button>
                                <Button variant="secondary">Run</Button>
                                <Button variant="warning">Remove</Button>
                            </Modal.Body>
                        </Modal.Dialog>
                    </div>
            )}

        </>
    )
}

export {QuizItem};