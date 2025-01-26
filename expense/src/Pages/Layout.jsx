
import React from 'react';
import Header from '../Components/Header/Header';

const Layout = (props) => {
    return (
        <React.Fragment>
            <Header />
            <div style={{ paddingTop: "20px" }}>
                {props.children}
            </div>
        </React.Fragment>)
}

export default Layout;