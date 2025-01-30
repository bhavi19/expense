import React, { useContext, useEffect, useState } from 'react';
import './Home.css'; // Import the CSS file for styling
import AppModal from '../../Components/Modal/Modal';
import { addNewExpense, fetchAllDayExpenses, fetchAllExpenses, removeExpense } from '../../Services/api';
import { Container, Dropdown, Form, Navbar } from 'react-bootstrap';
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

    const { user } = useContext(UserContext);

    console.log("user", user)

    useEffect(() => {
        fetchExpenses()
    }, [selectedOption, selectedDate])

    useEffect(() => {
        countTotal()
    }, [expenseData])

    const countTotal = async () => {
        console.log("expenseData", expenseData)
        let expenseDetails = await expenseData
        let sum = 0;
        if (expenseData?.length) {
            for (let i = 0; i < expenseDetails.length; i++) {
                sum += parseFloat(expenseDetails[i].expenseAmount);
            }
            setTotal(sum)
        } else {
            setTotal(0)
        }
    }

    const fetchExpenses = async () => {
        let data
        if (selectedOption === 'Daily') {

            try {
                data = await fetchAllDayExpenses(user._id, moment(selectedDate).format("YYYY-MM-DD"))
                setExpenseData(data.filteredData)
                countTotal()
                setLoading(false)
            } catch (error) {
                console.log("error", error)
            }
        } else {
            try {
                data = await fetchAllExpenses(user._id)
                setExpenseData(data.expenseData)
                countTotal()
                setLoading(false)
            } catch (error) {
                console.log("error", error)
                // window.alert("error occured")
            }
        }
        return data
    }

    const addExpenseData = async (data) => {
        console.log("data", data)
        await addNewExpense({ ...data, user_id: user._id, date: selectedDate })
        await fetchExpenses()
    }

    const handleRemoveExpense = async (id) => {
        await removeExpense(id)
        fetchExpenses()
    }

    const handleSelect = (eventKey) => {
        setSelectedOption(eventKey);
        //if monthly selected change selected date to today
        setSelectedDate(moment().toDate())
    };

    let label = selectedOption === 'Daily' ? 'Add aaj ka kharcha' : (selectedOption === 'Monthly' ? 'Monthly Kharcha' : 'Weekly Kharcha')


    return (
        <div className="homepage-container">
            <div className="container">
                <div className="view-container">

                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="success" id="dropdown-custom-components">
                            {selectedOption}
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
                    <label className="label"><b>{label}</b></label>
                    <i className="bi bi-plus-circle plus-icon" onClick={() => setOpenModal(true)}></i>
                </div>


                <div className="date-container">
                    <Form.Group>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <i class="bi bi-calendar" style={{ color: '#A390F3' }}></i>
                            <DatePicker
                                portalId="root-portal"
                                selected={selectedDate}
                                maxDate={moment().toDate()}
                                icon={<i class="bi bi-calendar" style={{ color: '#A390F3' }}></i>}
                                onChange={(date) => setSelectedDate(date)} // Update the selected date
                                dateFormat="MMMM d, yyyy"
                                className="custom-datepicker" // Custom class for styling
                                todayButton="Today" // Add a button for today
                            />
                        </div>

                        <label className='day-label'><b>{moment(selectedDate).format("dddd")}</b></label>

                    </Form.Group>
                </div>
            </div>
            <hr />
            <AppModal show={openModal} handleClose={() => setOpenModal(false)} addExpenseData={addExpenseData} />
            <div className="total"> <h2>Total : {total}</h2></div>

            <div className="expense-list">
                {expenseData ? expenseData.map((item, index) => {
                    return (<>
                        <Navbar className="bg-body-tertiar" style={{ marginBottom: '-15px', width: '90%' }} key={index}>
                            <Container>
                                <Navbar.Brand href="#home">

                                    {/* <div>
                                    <label className='day-label'><b>{moment(selectedDate).format("MMM")}</b></label>

                                    </div> */}
                                    {parseFloat(item.expenseAmount)} - {item.expenseDescription} </Navbar.Brand>

                                {/* <Navbar.Date>{moment(item.date).format("MMMM Do YYYY")}</Navbar.Date> */}
                                {/* <label style={{float:'left'}}>{moment(item.date).format("MMMM Do YYYY")}</label> */}
                                <i className="bi bi-dash-circle" onClick={() => handleRemoveExpense(item._id)}></i>

                            </Container>
                        </Navbar>
                        <br />
                    </>)
                }) : null}
            </div>
        </div>
    );
};

export default withToast(Home);
