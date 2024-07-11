import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { BASE_URL } from "../services/helper";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'


const notify = () => toast.error("User with this email id already exisits!", { position: 'top-center', autoClose: 3000, });


const Signup = () => {

    const navigate = useNavigate();

    const [visible,setVisible] = useState('password');

    function toggleVis(){
        if(visible==='password') setVisible('text');
        else setVisible('password');
    }
    // const [formData, setFormData] = useState({
    //     uname: '',
    //     email: '',
    //     password: '',
    // });

    // const { uname, email, password } = formData;

    // const onChange = e => {

    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // }

    function goToLogin() {
        navigate('/login');
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },

        validationSchema: Yup.object({

            username: Yup.string()
                .matches(
                    /^[a-zA-Z]{3,}[a-zA-Z0-9_]*$/,
                    'Username must contain at least 3 letters, followed by 0 or more letters, digits, or underscores, and no other special characters'
                )
                .required('Username is required'),

            email: Yup.string()
                // .email('Invalid email address')
                .matches(/^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
                    'Valid Email is required'
                )
                .required('Email is required'),

            password: Yup.string()
                .min(6, 'Password must be at least 6 characters long')
                .required('Password is required')
        }),

        onSubmit: async (values) => {

            try {
                const res = await axios.post(`${BASE_URL}/user/signup`, values);

                if (res.data.msg === 'success') {
                    toast.info(' Please Verify Your Email Address ', { position: 'top-center', autoClose: 3000, });

                    setTimeout(() => {
                        goToLogin();
                    }, 4000);

                }
                else if (res.data.msg === 'user already exisist') {
                    notify();
                }


            } catch (err) {
                console.log(err);
            }
        }
    });

    // const onSubmit = async e => {
    //     e.preventDefault();

    //     try {

    //         const res = await axios.post('http://localhost:8006/user/signup', formData);

    //         if (res.data.msg === 'success') {
    //             toast.info(' Please Verify Your Email Address ', { position: 'top-center', autoClose: 2000, });

    //             setTimeout(() => {
    //                 goToLogin();
    //             }, 2000);

    //         }
    //         else if (res.data.msg === 'user already exisist') {
    //             notify();
    //         }


    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    // const [validated, setValidated] = useState(false);
    return (

        <div className="d-flex align-items-center justify-content-cente min-vh-100" style={{ background: '#D5CAE2' }}>
            <ToastContainer />
           
            <Form style={{minWidth:'350px'}} onSubmit={formik.handleSubmit} className="w-25  border p-4 rounded-4 mx-auto shadow-lg p-3 mb-5 bg-body rounded" >

                <Form.Group className="fw-bold">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} id="uname" name="username" placeholder="Enter name"
                        required
                        isValid={formik.touched.username && !formik.errors.username}
                        isInvalid={formik.touched.username && formik.errors.username} />
                </Form.Group>

                {formik.touched.username && formik.errors.username ? (
                    <span className="text-danger">{formik.errors.username}</span>
                ) : null}

                {formik.touched.username && !formik.errors.username ? (
                    <div className="text-success">Looks good!</div>
                ) : null}

                <Form.Group className="mt-4 fw-bold" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={formik.values.email} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} type="text" name="email" placeholder="Enter email"
                        id="email"
                        required
                        isValid={formik.touched.email && !formik.errors.email}
                        isInvalid={formik.touched.email && formik.errors.email} />
                </Form.Group>

                {formik.touched.email && formik.errors.email ? (
                    <span className="text-danger">{formik.errors.email}</span>
                ) : null}

                {formik.touched.email && !formik.errors.email ? (
                    <div className="text-success">Looks good!</div>
                ) : null}

                <Form.Group className="mt-4  fw-bold" >
                    <Form.Label >Password</Form.Label>
                    <div className="d-flex">
                    <Form.Control type={visible}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password" placeholder="Password" id="password"
                        required
                        isValid={formik.touched.password && !formik.errors.password}
                        isInvalid={formik.touched.password && formik.errors.password} 
                        /><span style={{fontSize:'25px',marginLeft:'10px'}} onClick={toggleVis}>
                      {visible==='password' ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    </div>
                </Form.Group>

                {formik.touched.password && formik.errors.password ? (
                    <span className="text-danger">{formik.errors.password}</span>
                ) : null}

                {formik.touched.password && !formik.errors.password ? (
                    <div className="text-success">Looks good!</div>
                ) : null}


                <div className="mt-4 mb-3">
                    <a href="/login" style={{ textDecoration: 'none', color: '#6b4c94' }} >Already have an account?</a>
                </div>

                <Button variant="primary" type="submit" className="w-100 mt-2" style={{ background: '#6B4C94', border: 'none' }}>
                    Submit
                </Button>
            </Form>
        </div>
    );

}

export default Signup;