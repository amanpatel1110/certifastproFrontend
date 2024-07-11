import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'

import { useFormik } from "formik";
import * as Yup from 'yup';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BASE_URL } from "../services/helper";

const notify = (msg) => toast.error(msg, { position: 'top-center', autoClose: 3000, });

const Login = () => {

    const [resend, setResend] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .matches(/^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
                    'Email must be valid'
                )
                .required('Email required'),

            password: Yup.string()
                .min(6, 'Password must be atleast 6 characters')
                .required('Password required'),

        }),

        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${BASE_URL}/user/login`, values, { withCredentials: true });

                if (res.data.msg === 'success') {
                    localStorage.setItem('token',res.data.token);
                    goToHome();
                }
                else if (res.data.msg === 'Not verified') {
                    setResend(true);
                    notify('Email Not Verified, Please verify your email');
                }
                else if (res.data.errors.length > 0) {
                    console.log(res.data.errors);
                }
                else {
                    notify('Incorrct username or password!');
                }
            }
            catch (err) {
                if (err.response && err.response.status === 401) {
                    notify('Incorrct username or password!');
                }
                else console.log(err);
            }
        },


    });

    const navigate = useNavigate();

    function goToHome() {
        navigate('/');
    }

    const [visible, setVisible] = useState('password');

    function toggleVis() {
        if (visible === 'password') setVisible('text');
        else setVisible('password');
    }

    // const [formData, setFormData] = useState({
    //     email: '',
    //     password: '',
    // });

    // const { email, password } = formData;

    // const onChange = e => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // }

    // const onSubmit = async e => {

    //     e.preventDefault();
    //     try {
    //         const res = await axios.post('http://localhost:8006/user/login', formData, { withCredentials: true });


    //         if (res.data.msg === 'success') {
    //             goToHome();
    //         }
    //         else if(res.data.msg==='Not verified'){
    //             notify('Email Not Verified, Please verify your email');
    //         }
    //         else if(res.data.errors.length>=0){
    //             console.log(res.data.errors);
    //         }
    //         else{
    //             // console.log(res.data.msg);
    //             notify('Incorrct username or password!');
    //         }
    //     }
    //     catch (err) {
    //         if (err.response && err.response.status === 401) {
    //             notify('Incorrct username or password!');
    //         } 
    //         else console.log(err);
    //     }
    // }

    return (

        <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: '#D5CAE2', }}>
            <ToastContainer />
            <Form onSubmit={formik.handleSubmit} className="w-25  border p-4 rounded-4 mx-auto shadow-lg p-3 mb-5 bg-body rounded" style={{ minWidth: '350px' }} >
                <Form.Group className=" fw-bold" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        isValid={formik.touched.email && !formik.errors.email}
                        isInvalid={formik.touched.email && formik.errors.email}
                        type="text" name="email" placeholder="Enter email" />
                </Form.Group>

                {formik.touched.email && formik.errors.email ? (
                    <span className="text-danger">{formik.errors.email}</span>
                ) : null}

                {formik.touched.email && !formik.errors.email ? (
                    <div className="text-success">Looks good!</div>
                ) : null}


                <Form.Group className="mt-4 fw-bold" controlId="formBasicPassword">
                    <Form.Label >Password</Form.Label>
                    <div className="d-flex">
                        <Form.Control
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            isValid={formik.touched.password && !formik.errors.password}
                            isInvalid={formik.touched.password && formik.errors.password}
                            type={visible} name="password" placeholder="Password" />
                        <span style={{ fontSize: '25px', marginLeft: '10px' }} onClick={toggleVis}>
                            {visible === 'password' ? <FaEyeSlash style={{ color: '#7650a2' }} /> : <FaEye style={{ color: '#7650a2' }} />}
                        </span>
                    </div>
                </Form.Group>

                {formik.touched.password && formik.errors.password ? (
                    <span className="text-danger">{formik.errors.password}</span>
                ) : null}

                {formik.touched.password && !formik.errors.password ? (
                    <div className="text-success">Looks good!</div>
                ) : null}

              { resend ?
               <div className="mt-3 mb-3">
                    <a href="/verify" style={{ textDecoration: 'none', color: '#6b4c94' }} >Resend Email</a>
                </div> :null
              }
                <div className="mt-2 mb-3">
                    <a href="/signup" style={{ textDecoration: 'none', color: '#6b4c94' }} >Don't have an account? Signup now</a>
                </div>

                <Button variant="primary" type="submit" className="w-100 mt-1" style={{ background: '#6B4C94', border: 'none' }}>
                    Submit
                </Button>
            </Form>
        </div>
    );

}

export default Login;