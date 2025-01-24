import React, { useEffect, useState } from 'react';
import AppModal from '../Components/Modal/Modal';
import { Container, Navbar } from 'react-bootstrap';


const Homepage = () => {

    const [openModal, setOpenModal] = useState(false)
    const [expenseData, setExpenseData] = useState([])
    const [total, setTotal] = useState(10.0)

    const addExpenseData = (data) => {
        let expenseDetails = expenseData
        let newData = [...expenseDetails, data]
        setExpenseData(newData)
    }

    useEffect(() => {
        let expenseDetails = expenseData
        console.log("expense:", expenseDetails)

        let sum = 0;
        for (let i = 0; i < expenseDetails.length; i++) {
            sum += parseFloat(expenseDetails[i].expense);
        }
        setTotal(sum)



    }, [expenseData])

    const RenderList = () => {
        return (expenseData.map((item, index) =>
            <>
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="#home" key={index}>
                            {parseFloat(item.expense)} - {item.description} </Navbar.Brand>
                    </Container>
                </Navbar>
                <br />
            </>
        ))
    }

    return (
        <div className="container mt-5">

            <label>Add aaj ka kharcha</label>
            <br />

            <i className="bi bi-plus-circle" onClick={() => setOpenModal(true)}></i>
            <AppModal show={openModal} handleClose={() => setOpenModal(false)} addExpenseData={addExpenseData} />
            <hr />

            <h2>Total : {total}</h2>
            {RenderList()}


        </div>
    );
};

export default Homepage;