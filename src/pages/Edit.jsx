import React, {useState, createRef, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { useNavigate, useSearchParams } from "react-router-dom";
import { exportComponentAsJPEG, exportComponentAsPDF } from "react-component-export-image";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Navb from "../components/Nav";
import axios from "axios";
import { BASE_URL } from "../services/helper";
// import {useLocation } from "react-router-dom";

import Draggable from 'react-draggable';

import '../Edit.css'

const EditPage = () => {

    const [params] = useSearchParams();
    const [logo, setLogo] = useState();
    const [checked, setChecked] = useState(false);
    const [qrData, setQrData] = useState('');

    const [isAdmin,setIsAdmin]=useState(false);
    const [uname,setUname] = useState('');

    // const { state } = useLocation();
    // const verified = state.verified;

    const [formData, setFormData] = useState({
        pname: '',
        body: '',
        date: '',
        logoSize: '10',
        nameFont: 'Arial',
        bodyFont: 'Arial',
        nameColor: 'black',
        bodyColor: 'black',
        qrSize: '10',
    });

    const { pname, body, date, logoSize, nameFont, bodyFont, nameColor, bodyColor, qrSize } = formData;

    const certiRef = createRef();

    function onChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function onCheckChange(e) {
        setChecked(!checked);
    }

    function onChangeLogo(e) {
        setLogo((URL.createObjectURL(e.target.files[0])));
    }

    async function onSubmit(e) {
        e.preventDefault();

        if (checked) {
            try {
                const res = await axios.post(`${BASE_URL}/certificate/certiVal`, { pname: pname, body:body, date: date }, { withCredentials: true });

                setQrData(`${process.env.REACT_APP_SITE}/validation?id=${res.data._id}`);
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    // useEffect(()=>{console.log(process.env.REACT_APP_SITE)})
    function genPdf(e) {
        exportComponentAsPDF(certiRef, {
            fileName: "myCerti.pdf",
            orientation: "landscape",
            pdfOptions: {
                w: 297,
                h: 210,
                unit: 'mm',
            },
        })
    }

    const navigate = useNavigate();

    async function checkAuth() {
        try {
            const res = await axios.get(`${BASE_URL}/`, { withCredentials: true });

            if (res.data.msg === 'user not valid' || res.data.msg === 'fails') {
                navigate('/login');
            }
            else {
                if(res.data.role === 'admin') setIsAdmin(true);
                setUname(res.data.name);
            }
        }
        catch (err) { }
    }

    useEffect(() => {
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dref = new Array(5).fill(useRef(null));

    return (
        <div>
            <Navb role={isAdmin} email={uname}/>

            {
                <div className="d-flex m-3">
                    <div ref={certiRef} id='certificate' style={{ backgroundColor: 'black', height: '466.39pt', width: '660pt' }}>
                        <img src={params.get('img')} style={{ height: '100%', width: '100%' }} alt='certi-Img'/>
                        {
                            <>
                                <div className="position-absolute" style={{ top: '290px', left: '330px', cursor: 'grab' }}>
                                    <Draggable nodeRef={dref[0]}>
                                        <h3 ref={dref[0]} style={{ fontFamily: nameFont, color: nameColor }}>{pname}</h3>
                                    </Draggable>
                                </div>

                                <div className="position-absolute" style={{ top: '350px', left: '300px', cursor: 'grab' }}>
                                    <Draggable nodeRef={dref[1]}>
                                        <pre ref={dref[1]} style={{ fontFamily: bodyFont, color: bodyColor }}>{body}</pre>
                                    </Draggable>
                                </div>

                                <div className="position-absolute" style={{ top: '540px', left: '200px', cursor: 'grab' }}>
                                    <Draggable nodeRef={dref[2]}>
                                        <pre ref={dref[2]} style={{ fontFamily: 'sans-serif' }}>{date}</pre>
                                    </Draggable>
                                </div>

                                <div
                                    className="position-relative"
                                    style={{ width: '60%', height: '50%' }}
                                >
                                    <Draggable nodeRef={dref[3]} defaultPosition={{ x: 100, y: -500 }}>
                                        <img ref={dref[3]} accept="image/*" src={logo} draggable="false" alt="" width={`${logoSize}%`}></img>
                                    </Draggable>

                                    {checked &&
                                        <Draggable nodeRef={dref[4]} defaultPosition={{ x: 100, y: -180 }}>
                                            <div ref={dref[4]} style={{ height: "auto", margin: "0 auto", maxWidth: '50%', width: `${qrSize}%` }}>
                                                <QRCode
                                                    // size={qrSize}
                                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                    value={qrData}
                                                    viewBox={`0 0 256 256`}
                                                />
                                            </div>
                                        </Draggable>}
                                </div>

                            </>

                        }
                    </div>

                    <Form onSubmit={onSubmit} style={{
                        marginLeft: '3%',
                        width: '390px',
                        border: '1px solid',
                        padding: '30px',
                        borderRadius: '20px',
                    }} className="mt-1">

                        <h3 style={{ color: '#6b4c94' }}>Enter Certificate Details</h3><br></br>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name='pname' value={pname}
                                onChange={onChange} />
                        </Form.Group>

                        <div className="d-flex">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name Font-family</Form.Label>
                                <Form.Select style={{ width: '200px' }} name='nameFont' onChange={onChange} aria-label="Default select example">
                                    <option value="Arial">Arial</option>
                                    <option value="Serif">Serif</option>
                                    <option value="Monospace">Monospace</option>
                                    <option value="Cursive">Cursive</option>
                                    <option value="Fantasy">Fantasy</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group style={{ marginLeft: '30px' }}>
                                <Form.Label htmlFor="exampleColorInput">Font Color</Form.Label>
                                <Form.Control
                                    name='nameColor'
                                    type="color"
                                    id="exampleColorInput"
                                    defaultValue="black"
                                    title="Choose your color"
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Enter certificate details/body</Form.Label>
                            <Form.Control as="textarea" rows={3} name='body' value={body} onChange={e => onChange(e)} />
                        </Form.Group>

                        <div className="d-flex">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Body Font-family</Form.Label>
                                <Form.Select style={{ width: '200px' }} name='bodyFont' onChange={onChange} aria-label="Default select example">
                                    <option value="Arial">Arial</option>
                                    <option value="Serif">Serif</option>
                                    <option value="Monospace">Monospace</option>
                                    <option value="Cursive">Cursive</option>
                                    <option value="Fantasy">Fantasy</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group style={{ marginLeft: '30px' }}>
                                <Form.Label htmlFor="exampleColorInput">Font Color</Form.Label>
                                <Form.Control
                                    name='bodyColor'
                                    type="color"
                                    id="exampleColorInput"
                                    defaultValue="black"
                                    title="Choose your color"
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </div>


                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="text" placeholder="Enter Date" name='date' value={date}
                                onChange={onChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Logo</Form.Label>
                            <Form.Control type="file"
                                onChange={onChangeLogo} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Logo size &nbsp;</Form.Label>
                            <input type="range" min="1" max="100" name='logoSize' value={logoSize}
                                onChange={onChange} style={{ width: '150px', height: '8px', background: 'red', accentColor: '#8a6bb3' }} />&nbsp;{logoSize}%
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <div className="d-flex">
                                <input name="group1"
                                    type='checkbox'
                                    id={`inline-checkbox-1`}
                                    checked={checked}
                                    onChange={onCheckChange}
                                    className="check"
                                    style={{ accentColor: '#8a6bb3', width: '15px' }} /> <Form.Label className="mt-2">&nbsp;Do you want to allow verification ?</Form.Label>
                            </div>
                        </Form.Group>

                        {  checked && 
                            <div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Qr Size &nbsp;</Form.Label>
                                <input type="range" min="1" max="50" name='qrSize' value={qrSize}
                                    onChange={onChange} style={{ width: '150px', height: '8px', background: 'red', accentColor: '#8a6bb3' }} />&nbsp;{qrSize}%
                            </Form.Group>

                            <Button className="mb-5" variant="primary" style={{ background: '#6B4C94', width: '100%', border: 'none' }} type="submit">
                               First Submit For Authentication Record
                            </Button>
                        </div>
                        }

                        <div className="d-flex mt-1 mb-3">
                            <Button variant="primary" onClick={(e) => exportComponentAsJPEG(certiRef, { fileName: 'myCerti' })} style={{ background: '#6B4C94', width: '45%', border: 'none' }}>
                                Save As JPEG
                            </Button>

                            <Button variant="primary" style={{ marginLeft: '30px', background: '#6B4C94', width: '45%', border: 'none' }} onClick={e => genPdf(e)} type="button">
                                Save As PDF
                            </Button>

                        </div>
                    </Form>
                </div>
            }
            {/* <button className="btn-primary btn position-absolute bottom-0 end-0  mb-5"
                style={{ marginRight: '370px' }} onClick={(e) => exportComponentAsJPEG(certiRef)}>
                Save</button> */}


        </div>
    );
}

export default EditPage;