import React from 'react';
import './Header.css';


const Header = () => {
    // const navigate = useNavigate();
    return (
        <header className='header'>
            <div style={{ display: 'inline-block' }} className="left">
                <label> Hisaab Kitaab</label>
            </div>

            <div style={{ display: 'inline-block' }} className="right">
                <i className="bi bi-person-circle profile-icon"></i>
                <label> Bhavika Vyas</label>
            </div>

        </header>

    );
};

export default Header;