import React from 'react';
import { Dropdown } from 'react-bootstrap';

const ViewDropDown = (props) => {
    return (
        <Dropdown onSelect={props.handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-custom-components">
                {props.selectedOption}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="Daily">Daily</Dropdown.Item>
                {/* <Dropdown.Item eventKey="Weekly">Weekly</Dropdown.Item> */}
                <Dropdown.Item eventKey="Monthly">Monthly</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ViewDropDown;