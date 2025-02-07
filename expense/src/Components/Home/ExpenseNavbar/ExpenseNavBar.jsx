import moment from 'moment';
import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
// import

const ExpenseNavBar = (props) => {
    const { item, index, handleRemoveExpense } = props
    return (
        <Navbar className="bg-body-tertiary mb-2" style={{ width: '90%' }} key={index}>
            <Container style={{ backgroundColor: "transparent" }}>
                <Navbar.Brand href="#home" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        {/* Date Section */}
                        <div className="date" title={item.date} style={{ width: '60px' }}>
                            <div class="date" title="2025-01-29T07:54:18Z">{moment(item.date).format("MMM")} <div class="number">{moment(item.date).format("DD")}</div></div>
                        </div>
                        <div style={{ width: '60px' }}>
                            <img height={"40px"} width={"40px"}
                                src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/food-and-drink/groceries@2x.png" class="receipt" />

                        </div>

                        {/* Expense Description and Amount */}
                        <div style={{ textAlign: 'start', width: "120px", padding: '5px' }}>
                            {item.expenseDescription}
                        </div>

                        {/* Remove Expense Button */}
                        <div style={{ textAlign: 'end', width: "675px", }}>
                            {parseFloat(item.expenseAmount).toFixed(2)}
                        </div>
                        <i
                            className="bi bi-dash-circle"
                            onClick={() => handleRemoveExpense(item._id)}
                            style={{ cursor: 'pointer', color: 'darkOrange' }}
                            title="Remove Expense"
                        ></i>
                    </div>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default ExpenseNavBar;