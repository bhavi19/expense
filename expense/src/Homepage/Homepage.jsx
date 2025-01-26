import React, { useEffect, useState } from 'react';
import AppModal from '../Components/Modal/Modal';
import { Container, Form, Navbar } from 'react-bootstrap';
import { addNewExpense, fetchAllExpenses, removeExpense } from '../Services/api';
import ToastMessage from '../Components/ToastMessage';
import moment from 'moment'
import Header from '../Components/Header/Header';


const Homepage = () => {

    const [openModal, setOpenModal] = useState(false)
    const [expenseData, setExpenseData] = useState([])
    const [total, setTotal] = useState(0.0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchExpenses()
    }, [openModal])

    useEffect(() => {
        let expenseDetails = expenseData
        let sum = 0;
        if (expenseData.length) {
            for (let i = 0; i < expenseDetails.length; i++) {
                sum += parseFloat(expenseDetails[i].expenseAmount);
            }
            setTotal(sum)
        } else {
            setTotal(0)
        }
    }, [expenseData])

    useEffect(() => {
        renderList()
    }, [expenseData, loading])

    const fetchExpenses = async () => {
        let data
        try {
            data = await fetchAllExpenses("6793bcb3a72a1f27902053bd")
            console.log(data.expenseData)
            setExpenseData(data.expenseData)
            setLoading(false)
            // <ToastMessage/>
        } catch (error) {
            window.alert("error occured")
        }
        console.log(expenseData)
    }

    const addExpenseData = (data) => {
        addNewExpense(data)
        fetchExpenses()
    }

    const handleRemoveExpense = async (id) => {
        await removeExpense(id)
        fetchExpenses()
    }


    const renderList = () => {
        let renderedLists = expenseData.map((item, index) => {
            return (<>
                <Navbar className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="#home" key={index}>
                            {parseFloat(item.expenseAmount)} - {item.expenseDescription} </Navbar.Brand>
                        <i class="bi bi-dash-circle" onClick={() => handleRemoveExpense(item._id)}></i>
                    </Container>
                </Navbar>
                <br />
            </>)
        })
        return renderedLists
    }

    return (
        <div className="container mt-5">
            <div style={{ float: 'left' }}>
                <label><b>{moment(Date.now()).format("DD MMMM YYYY")}</b></label>
                <br />
                <label >{moment(Date.now()).format("dddd")}</label>
            </div>

            <label><b>Add aaj ka kharcha</b></label>
            <div style={{ float: 'right' }}>
                <label><b>{moment(Date.now()).format("DD MMMM YYYY")}</b></label>
                <br />
                <label >{moment(Date.now()).format("dddd")}</label>
            </div>
            <br />
            <i className="bi bi-plus-circle" onClick={() => setOpenModal(true)}></i>
            <AppModal show={openModal} handleClose={() => setOpenModal(false)} addExpenseData={addExpenseData} />
            {/* <Header/> */}
            <hr />

            <h2>Total : {total}</h2>
            {renderList()}
        </div>
    );
};

export default Homepage;