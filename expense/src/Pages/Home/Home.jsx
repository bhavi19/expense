import React, { useEffect, useState } from 'react';
import './Home.css'; // Import the CSS file for styling
import AppModal from '../../Components/Modal/Modal';
import { addNewExpense, fetchAllExpenses, removeExpense } from '../../Services/api';
import { Container, Navbar } from 'react-bootstrap';
import moment from 'moment';
import withToast from '../../Components/ToastMessage';

const Home = ({ showToastMessage }) => {
    const [openModal, setOpenModal] = useState(false);
    const [expenseData, setExpenseData] = useState([])
    const [total, setTotal] = useState(0.0)
    const [loading, setLoading] = useState(true)

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        fetchExpenses()
    }, [openModal])

    useEffect(() => {
        renderList()
    }, [expenseData, loading])

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

    const fetchExpenses = async () => {
        let data
        try {
            data = await fetchAllExpenses("6793bcb3a72a1f27902053bd")
            setExpenseData(data.expenseData)
            setLoading(false)
            showToastMessage('API call was successful!', 'success');

            // <ToastMessage/>
        } catch (error) {
            window.alert("error occured")
        }
    }

    const addExpenseData = async (data) => {
        await addNewExpense(data)
        await fetchExpenses()
    }

    const handleRemoveExpense = async (id) => {
        await removeExpense(id)
        fetchExpenses()
    }

    const renderList = () => {
        let renderedLists = expenseData.map((item, index) => {
            return (<>
                <Navbar className="bg-body-tertiary" key={index}>
                    <Container>
                        <Navbar.Brand href="#home">
                            {parseFloat(item.expenseAmount)} - {item.expenseDescription} </Navbar.Brand>
                        <i className="bi bi-dash-circle" onClick={() => handleRemoveExpense(item._id)}></i>
                    </Container>
                </Navbar>
                <br />
            </>)
        })
        return renderedLists
    }


    return (
        <div className="homepage-container">
            <div className="container">
                <div className="date-container">
                    <label><b>Something goes here</b></label>
                    <br />
                    {/* <label >{moment(Date.now()).format("dddd")}</label> */}
                </div>
                <div className="centered-content">
                    <label className="label"><b>Add aaj ka kharcha</b></label>
                    <i className="bi bi-plus-circle plus-icon" onClick={() => setOpenModal(true)}></i>
                </div>
                <div className="date-container">

                    <label><b>{moment(Date.now()).format("DD MMMM YYYY")}</b></label>
                    {/* <label>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            minDate={new Date()}
                            className="form-control"
                            dateFormat="MMMM d, yyyy"
                            calendarClassName="custom-calendar"
                        />
                    </label> */}
                    <br />
                    <label >{moment(Date.now()).format("dddd")}</label>
                </div>
            </div>
            <hr />
            <AppModal show={openModal} handleClose={() => setOpenModal(false)} addExpenseData={addExpenseData} />
            <div className="total"> <h2>Total : {total}</h2></div>

            <div className="expense-list">
                {renderList()}
            </div>
        </div>
    );
};

export default withToast(Home);
