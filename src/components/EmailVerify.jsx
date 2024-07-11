import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../EmailVerify.css';
import Container from "react-bootstrap/esm/Container";
import { BASE_URL } from "../services/helper";

const EmailVerify = () => {
    const [params] = useSearchParams();

    const token = params.get('token');
    const userEmail = params.get('email');
    const [status, setStatus] = useState(false);

    const navigate = useNavigate();

    function goToLogin() {
        navigate('/login');
    }

    async function checkEmailVerification() {
        try {

            const res = await axios.get(`${BASE_URL}/${userEmail}/verify/${token}`);
            
            if (res.data.msg === 'success') {
                setStatus(true);
            }
            else {
                setStatus(false);
            }
        }
        catch (err) {
            setStatus(false);
            console.log(err);
        }
    }

    useEffect(()=>{checkEmailVerification()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const [email,setEmail] = useState('');
    const [loading,setLoading] = useState(false);

    function onChange(e){
        setEmail(e.target.value);
    }


    async function reSendEmail(e) {

        e.preventDefault();
        setLoading(true);

        if (dialogRef.current) {
            dialogRef.current.close();
        }

        try {
            const res = await axios.post(`${BASE_URL}/sendEmail`,{email:email});

            // console.log(res.data.msg);
            
            if(res.data.msg==='success'){
                setLoading(false);
                
                toast.info(`Email Has Been Sent To ${email} Please Verify`,
                            { position: 'top-center', autoClose:5000, style:{marginLeft:'-100px',width:'500px'} });
            }

            else if (res.data.msg==='Invalid email') {
                setLoading(false);
                toast.error(`Invalid Email`,
                    { position: 'top-center', autoClose:5000});
            }

            else if(res.data.msg==='user not registered'){
                setLoading(false);
                
                toast.error(`User With  Email: ${email} Is Not Registered`,
                            { position: 'top-center', autoClose:4000, style:{marginLeft:'-100px',width:'500px'} });
            }

            else if(res.data.msg === 'user already verified'){
                setLoading(false);
                
                toast.warning(`User With  Email: ${email} Is Alreday Verified Go To Login`,
                            { position: 'top-center', autoClose:4000, style:{marginLeft:'-100px',width:'500px'} });
            }

            else{
                setLoading(false);
                toast.error(`Email Failed To ${email} Please Try Again`,
                    { position: 'top-center', autoClose:5000, style:{marginLeft:'-100px',width:'500px'} });
            }
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    const dialogRef = useRef(null);

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    }

    // useEffect(() => { reSendEmail() }, []);

    return (
        <div className="main1">
            <ToastContainer/>

            { loading?  <><Spinner animation="border" style={{color:'#7650a2'}} /></>:null}

            <dialog ref={dialogRef} className="diag">

                <button onClick={closeDialog} className="clsBtn"><IoIosClose /></button>
                {loading?<p>hell</p>:null}

                <Form onSubmit={reSendEmail} className="mt-4">
                    <Form.Group className="mb-4 fw-bold" controlId="formBasicEmail">

                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" onChange={onChange} name="email" value={email} placeholder="Enter Registered Email" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-1" style={{width:'100px',background:'#6B4C94',border:'none'}}>
                    Resend
                    </Button>
                    
                </Form>
            </dialog>

            <Container className="sub">
                {status ? <>
                    <div className="tick">
                        <FaCheckCircle />
                    </div>

                    <div className="text">
                        <p>Your Email Has Been Successfully Verified!</p>
                    </div>

                    <div className="button">
                        <button className="btn btn-primary" onClick={goToLogin}>Continue To Login</button>
                    </div>
                </>
                    :
                    <>
                        <div className="close">
                            <IoIosCloseCircle />
                        </div>

                        <div className="textFails">
                            <p>Your Email Is Not Verified!</p>
                        </div>

                       <div className="d-flex">
                       <div className="button2">
                            <button className="btn btn-primary" onClick={openDialog}>Resend Email</button>
                        </div>

                        <div className="button2 mx-3">
                            <button className="btn btn-primary" onClick={goToLogin}>Login Now</button>
                        </div>
                       </div>
                    </>
                }

            </Container>
        </div>
    )
}

export default EmailVerify;