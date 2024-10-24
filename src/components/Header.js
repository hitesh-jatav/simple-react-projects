// Header.js
import React from 'react';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
            <div className="container-fluid justify-content-center">
                <Navbar.Brand href="#" className="mx-auto text-center">React Simple Projects</Navbar.Brand>
            </div>
        </Navbar>
    );
};

export default Header;
