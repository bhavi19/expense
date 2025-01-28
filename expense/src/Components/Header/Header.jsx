import React from 'react';
import './Header.css';
import { Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const isAuthenticated = localStorage.getItem('isAuthenticated');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');

        navigate('/signin')
    }
    return (
        <header className='header'>
            <div style={{ display: 'inline-block' }} className="left">
                <label onClick={() => navigate('/')}> Hisaab Kitaab</label>
            </div>

            <div style={{ display: 'inline-block' }} className="right">
                {isAuthenticated ?
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <i className="bi bi-person-circle profile-icon"></i>
                            <label> Bhavika Vyas</label>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item >Action</Dropdown.Item>
                            <Dropdown.Item>Another action</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleLogout()}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    :
                    location.pathname == '/signin' ?
                        <button className='button' onClick={() => navigate("/register")}>Register</button>
                        :
                        <button className='button' onClick={() => navigate("/signin")}>Signin</button>

                }
            </div>

        </header>

    );
};

export default Header;