import React, { useContext, useEffect, useState } from 'react';
import './Home.css'; // Import the CSS file for styling
import AppModal from '../../Components/Modal/Modal';
import { addNewExpense, fetchAllExpenses, removeExpense } from '../../Services/api';
import { Container, Dropdown, DropdownButton, Form, Navbar } from 'react-bootstrap';
import moment from 'moment';
import withToast from '../../Components/ToastMessage';
import "react-datepicker/dist/react-datepicker.css"; // Import default styles
import DatePicker from 'react-datepicker';

import { UserContext } from '../../Contexts/UserContext';

const Home = ({ showToastMessage }) => {
    const [openModal, setOpenModal] = useState(false);
    const [expenseData, setExpenseData] = useState([])
    const [total, setTotal] = useState(0.0)
    const [loading, setLoading] = useState(true)
    const [selectedOption, setSelectedOption] = useState('Daily'); // Default to 'Daily'

    const [selectedDate, setSelectedDate] = useState(new Date()); // Pre-select today's date

    const { user, isAuthenticated, signOut } = useContext(UserContext);
    console.log("context:", user, isAuthenticated)


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
            data = await fetchAllExpenses(user._id)
            setExpenseData(data.expenseData)
            setLoading(false)
            // showToastMessage('API call was successful!', 'success');

            // <ToastMessage/>
        } catch (error) {
            console.log("error", error)
            // window.alert("error occured")
        }
    }

    const addExpenseData = async (data) => {
        console.log("data", data)
        await addNewExpense({ ...data, user_id: user._id })
        await fetchExpenses()
    }

    const handleRemoveExpense = async (id) => {
        await removeExpense(id)
        fetchExpenses()
    }

    const handleSelect = (eventKey) => {
        setSelectedOption(eventKey); // Update the selected option
    };


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
                <div className="view-container">

                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="success" id="dropdown-custom-components">
                            {selectedOption} {/* Display the selected option */}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Daily">Daily</Dropdown.Item>
                            <Dropdown.Item eventKey="Weekly">Weekly</Dropdown.Item>
                            <Dropdown.Item eventKey="Monthly">Monthly</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* <label><b>Something goes here</b></label> */}
                    <br />
                    {/* <label >{moment(Date.now()).format("dddd")}</label> */}
                </div>
                <div className="centered-content">
                    <label className="label"><b>Add aaj ka kharcha</b></label>
                    <i className="bi bi-plus-circle plus-icon" onClick={() => setOpenModal(true)}></i>
                </div>


                <div className="date-container">
                    <Form.Group>
                        {/* <Form.Label>Select Date</Form.Label> */}
                        <DatePicker
                            portalId="root-portal"

                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)} // Update the selected date
                            dateFormat="MMMM d, yyyy"
                            className="custom-datepicker" // Custom class for styling
                            todayButton="Today" // Add a button for today
                        />
                    </Form.Group>

                    {/* <label><b>{moment(Date.now()).format("DD MMMM YYYY")}</b></label> */}
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
                    {/* <label >{moment(Date.now()).format("dddd")}</label> */}
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
