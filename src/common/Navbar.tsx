import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Routes, BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Card from '../card/CardPage';
import Member from '../member/MemberPage';

function Navigation() {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => {
        setExpanded(!expanded);
    };

    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">Expenses Management</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
                    <Navbar.Collapse id="basic-navbar-nav" className={`${expanded ? 'show' : ''}`}>
                        <Nav className="me-auto">
                            <Nav.Link>
                                <Link to="/card">Cards</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/members">Members</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/purchase">Purchase</Link>
                            </Nav.Link>
                            {/* Add more Nav.Link as needed */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path='/card' element={<Card />}></Route>

                <Route path='/members' element={<Member />}></Route>
            </Routes>
        </Router>
    );
};

export default Navigation;
