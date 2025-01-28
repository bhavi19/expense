// src/LoginPage.js

import React, { useState } from 'react';
import ReCAPTCHA from 'react-recaptcha';
import './Register.css';
import { registerUser } from '../../Services/api';
import withToast from '../../Components/ToastMessage';

const RegisterPage = ({ showToastMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

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
            name: name
        }

        registerUser(data).then((res) => {
            console.log(res)
            showToastMessage('API call was successful!', 'success');
        })


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
                    <h2>Let's start your journey</h2>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
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

                    <button type="submit" className="submit-btn">Sign me up!</button>
                    {/* <div>
                        <label className='label-style'>Forgot your password?</label>
                    </div> */}
                </form>

            </div>
        </div>
    );
};

export default withToast(RegisterPage);
