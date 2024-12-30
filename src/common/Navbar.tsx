import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Routes, BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Card from '../card/CardPage';
import Member from '../member/MemberPage';
import Purchase from '../purchase/PurchasePage';
import Home from '../home/HomePage';

function Navigation() {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => {
        setExpanded(!expanded);
    };

    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href='/'> Expenses Management </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
                    <Navbar.Collapse id="basic-navbar-nav" className={`${expanded ? 'show' : ''}`}>
                        <Nav className="me-auto">
                            <Nav.Link href='/card'> Card </Nav.Link>
                            <Nav.Link href='/members'> Members </Nav.Link>
                            <Nav.Link href='/purchase'> Purchase</Nav.Link>
                            {/* Add more Nav.Link as needed */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/card' element={<Card />}></Route>
                <Route path='/members' element={<Member />}></Route>
                <Route path='/purchase' element={<Purchase />}></Route>
            </Routes>
        </Router>
    );
};

export default Navigation;
