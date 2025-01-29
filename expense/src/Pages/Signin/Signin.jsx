// src/LoginPage.js

import React, { useContext, useState } from 'react';
import ReCAPTCHA from 'react-recaptcha';
import './Signin.css';
import { signinUser } from '../../Services/api';
import { useNavigate } from 'react-router';
import withToast from '../../Components/ToastMessage';
import { UserContext } from '../../Contexts/UserContext'



const LoginPage = ({ showToastMessage }) => {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (recaptchaVerified) {
        //     alert('Form submitted');
        //     // Handle the form submission, e.g., API call
        // } else {
        //     alert('Please verify that you are not a robot!');
        // }

        const data = {
            email: email,
            password: password,
            // name: name
        }
        try {
            signinUser(data).then((res) => {
                login(res.user); // Update the context with the signed-in user data
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify(res.user));;
                localStorage.setItem('isAuthenticated', true);
                showToastMessage('Logged in successfully.', 'success')
                navigate('/')
            })
        } catch (error) {
            console.log(error)
            showToastMessage('Failed to login. ', 'error');
        }
    };

    const handleRecaptchaChange = (value) => {
        if (value) {
            setRecaptchaVerified(true);
        }
    };

    return (
        <div className='form-container'>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit} style={{ padding: "30px" }}>
                    <h2>Let's get you Logged in</h2>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {/* <div className="recaptcha-container">
          <ReCAPTCHA
            sitekey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY" // Replace with your reCAPTCHA site key
            onChange={handleRecaptchaChange}
          />
        </div> */}

                    <button type="submit" className="submit-btn">Login</button>
                    <div>
                        <label className='label-style'>Forgot your password?</label>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default withToast(LoginPage);
