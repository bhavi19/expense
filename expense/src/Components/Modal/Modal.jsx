import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const AppModal = (props) => {

    const [expenseAmount, setExpenseAmount] = useState("0.00")
    const [expenseDescription, setExpenseDescription] = useState("Description")

    const handleSubmit = () => {
        let newData = { expenseAmount: expenseAmount, expenseDescription: expenseDescription, user_id: "6793bcb3a72a1f27902053bd" }
        props.addExpenseData(newData)
        props.handleClose(false)
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Aaj ka kharch</Modal.Title>
                </Modal.Header>
                <Form style={{ margin: "40px" }}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Expense</Form.Label>
                                <Form.Control type="number" placeholder="0.00" onChange={(e) => setExpenseAmount(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>Enter description</Form.Label>
                                <Form.Control type="text" placeholder="description" onChange={(e) => setExpenseDescription(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AppModal;