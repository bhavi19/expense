
import React from 'react';
import Header from '../Components/Header/Header';

const Layout = (props) => {
    return (
        <React.Fragment>
            <Header />
            <div style={{ paddingTop: "50px" }}>
                {props.children}
            </div>
        </React.Fragment>)
}

export default Layout;