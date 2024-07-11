import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../Nav.css'

import { PiCertificateLight } from "react-icons/pi"
import { FaRegCircleUser } from "react-icons/fa6";

import { React, useState } from 'react';

const Navb = (props) => {
    const token = localStorage.getItem('token');

    const [qry,setQry] = useState(props.data);

    return (
        <>
            {/* {['md'].map((expand) => ( */}
            <Navbar key='md' sticky="top" expand='md' className="mb-3 navMain">
                <Container fluid>
                    <div style={{ marginRight: '25px', marginLeft: '10px', fontSize: '35px' }}> <PiCertificateLight /></div>
                    <Navbar.Toggle className='custom-toggler' aria-controls={`offcanvasNavbar-expand-md`} style={{ color: '#D5CAE2', }} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-md`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                        placement="end"
                        style={{ width: '240px', backgroundColor: '#D5CAE2' }}
                    >
                        <Offcanvas.Header closeButton className='clsbutton'>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`} >
                                <div style={{ fontSize: '35px', padding: '0px', color: '#6b4c94' }}> <PiCertificateLight /></div>
                            </Offcanvas.Title>

                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="mt-1 justify-content-start flex-grow-1 pe-3">
                                <Nav.Link href="/" className='navHov' style={{ marginRight: '20px' }}>Home</Nav.Link>
                                {props.role &&
                                    <>
                                        <Nav.Link href="/addimg" className='navHov' style={{ marginRight: '20px' }}>Add Template</Nav.Link>
                                        <Nav.Link href="/manageTemplate" className='navHov' style={{ marginRight: '20px' }}>Manage Template</Nav.Link>
                                    </>
                                }
                                <Nav.Link href="/aboutus" className='navHov'>About Us</Nav.Link>
                            </Nav>
                            {/*  */}
                            <Nav className="justify-content-end flex-grow-1 pe-3 me-4" >
                                {   
                                !token ?
                                 <>
                                    <Nav.Link href="/login" className='navHov' style={{ marginRight: '20px' }}>Login</Nav.Link>
                                    <Nav.Link href="/signup" className='navHov'>Signup</Nav.Link>
                                </> : null}
                                {   props.search && 
                                     <Form className="d-flex frm" style={{marginRight:'30px'}}>
                                     <Form.Control
                                         type="search"
                                         placeholder="Search"
                                         className="me-2 input"
                                         style={{height:'35px',marginTop:'5px'}}
                                         aria-label="Search"
                                         name='qry'
                                         autocomplete="off"
                                         value={qry}
                                         onChange={(e)=>{setQry(e.target.value)}}
                                     />
                                     <Button variant="success" type='submit' 
                                     style={{height:'35px',marginTop:'5px',backgroundColor:'#7650a2',border:'none'}}>
                                     Search
                                     </Button>

                                 </Form>
                                }
                                {
                                 token&&
                                    <>
                                        {/* <Nav.Link href="/logout" className='navHov' style={{ marginRight: '20px' }}>Logout</Nav.Link> */}
                                        {/* <Nav.Link href="/logout" style={{ marginRight: '20px', padding: '0px', fontSize: '30px' }}><FaRegCircleUser /></Nav.Link> */}
                                        <div className="dropdown" style={{marginTop:'-5px'}}>
                                            <button className="dropbtn" ><FaRegCircleUser /></button>
                                            <div className="dropdown-content">
                                                <div className='uname'>{props.email}</div>
                                                <a href="/logout">Logout</a>
                                            </div>
                                        </div>
                                    </>
                                }
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            {/* ))} */}
        </>
    );

}

export default Navb;