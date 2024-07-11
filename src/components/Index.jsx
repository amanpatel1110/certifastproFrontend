import React, { useState, useEffect } from "react";
import Navb from "./Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Index.css';
import Card from 'react-bootstrap/Card';

import { BsQrCode } from "react-icons/bs";
import { PiCertificate } from "react-icons/pi";
import { LiaCertificateSolid } from "react-icons/lia";

import { BASE_URL } from "../services/helper";

const Index = () => {

    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(false);
    const [uname, setUname] = useState('');

    async function checkAuth() {
        try {
            const res = await axios.get(`${BASE_URL}/`, { withCredentials: true });

            if (res.data.msg === 'user not valid' || res.data.msg === 'fails') {
                setIsAdmin(false);
            }
            else {
                if (res.data.role === 'admin') setIsAdmin(true);
                setUname(res.data.name);
            }

        }
        catch (err) { }
    }

    function goToGeneratorPage() {
        navigate('/generate');
    }

    useEffect(() => { checkAuth() }, []);

    return (

        <div className="main">
            <Navb role={isAdmin} email={uname} />

            <div className="mainsub">
                <div className="left1">
                    <p className="p1">Your Achievement,</p><p className="p2"> Our Design</p>
                    <p className="bodyText">CertiFastPro is a powerfull tool to generate certificate easily with authentication module</p>
                    <button onClick={goToGeneratorPage}>Create Certificate Now</button>
                </div>
                <div className="right1">
                    <img src={require('./indexImg.png')} width={600} alt='HomePageImg'></img>
                </div>
            </div>

            <div className="features ">
                <h2 style={{color:'#6b4c94'}}>Features</h2>

                <div className="mt-5 mw-100" style={{ marginLeft: '4%' }}>
                    <div className="row ">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-5">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <PiCertificate style={{ fontSize: '50px', backgroundColor: '#D5CAE2', color: '#6b4c94', borderRadius: '10px', padding: '5px' }} />
                                    <Card.Title className="mt-3">Easy To Create</Card.Title>
                                    <Card.Text>
                                        Easy to cerate certificate by just filling details in form and then can download pdf or jpeg file for created certificate
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-5">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <BsQrCode style={{ fontSize: '50px', backgroundColor: '#D5CAE2', color: '#6b4c94', borderRadius: '10px', padding: '5px' }} />
                                    <Card.Title className="mt-3">Easy To Authenticate</Card.Title>
                                    <Card.Text>
                                        Functionality to authenticate certificate by adding QR Code to your certificate and then one can verify by just scanning QR Code
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>


                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-5">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <LiaCertificateSolid style={{ fontSize: '50px', backgroundColor: '#D5CAE2', color: '#6b4c94', borderRadius: '10px', padding: '5px' }} />
                                    <Card.Title className="mt-3">Best Certificate Templates</Card.Title>
                                    <Card.Text>
                                        We provide asthetic trending certificate templates for Appreciation, Participation, Volunteer, Employee
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default Index;