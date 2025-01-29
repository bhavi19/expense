import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const withToast = (WrappedComponent) => {
    return (props) => {
        const [showToast, setShowToast] = useState(false);
        const [toastMessage, setToastMessage] = useState('');
        const [toastType, setToastType] = useState('success'); // You can customize this for different types like error, info, etc.

        const showToastMessage = (message, type = 'success') => {
            setToastMessage(message);
            setToastType(type);
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 3000); // Auto-hide after 3 seconds
        };

        return (
            <>
                <WrappedComponent {...props} showToastMessage={showToastMessage} />

                <ToastContainer position="top-end">
                    <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000}
                        bg={toastType === 'success' ? 'success' : 'danger'} // Red for error, green for success

                        autohide>
                        {/* <Toast.Header>
                            <strong className="me-auto">{toastType === 'success' ? 'Success' : 'Error'}</strong>
                        </Toast.Header> */}
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        );
    };
};

export default withToast;
