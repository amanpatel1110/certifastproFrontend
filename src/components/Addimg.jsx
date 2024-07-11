import React, { useState,useEffect } from "react";
import axios from "axios";

import '../Addimg.css';

import { useNavigate } from "react-router-dom";

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navb from "./Nav";

import { BASE_URL } from "../services/helper";

const notify=()=> toast.success("Templaate Added Successfully!",{ position: 'top-center',autoClose: 1000,});

const Addimg = () => {

    const [file, setFile] = useState();
    const [title, setTitle] = useState('');
    const [uname,setUname] = useState('');

    const [isAdmin,setIsAdmin] = useState('user');


    const formData = new FormData();

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    function handleChangeTitle(e) {
        setTitle(e.target.value);
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

    useEffect(() => { checkAuth() });


    async function handleSubmit(e) {

        e.preventDefault();
        formData.append('image-file', file);
        formData.append('title', title);

        try {
            const res = await axios.post(`${BASE_URL}/certificate/image-upload`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            
            if (res.data.msg === 'success') {
                notify();
            }
            else {

            }

        } catch (err) {

        }
    }

    return (
        <div className="min-vh-100">
            <Navb role={isAdmin} email={uname}/>
            
            <ToastContainer/>
            <div className="d-flex align-items-center justify-content-center">

                <form onSubmit={handleSubmit}
                    style={{
                        marginTop: '15vh',
                        // border: '1px solid #6b4c94',
                        padding: '20px',
                        borderRadius: '20px',
                        width: '30%',
                        minWidth: '300px',
                        backgroundColor:'white',
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 0px 8px 3px',
                    //    boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
                    }} >
                    <h5 className="mt-2 mb-4">Upload Certificate Template</h5>

                    <div className="mb-3 formfield">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="text"  className="form-control " id="title" name='title' onChange={handleChangeTitle} value={title} placeholder="title" required/>
                    </div>

                    <div className="mb-5 formfield">
                        <label htmlFor="formFile" className="form-label">Upload certi-template image</label>
                        <input type="file" accept="image/*" className="form-control" name='image-file' onChange={handleChange} required></input>
                    </div>

                    <div className="mb-3">
                        <button type="submit" className=" btn btn-primary" 
                            style={{backgroundColor:'#6b4c94',
                                    border:'none',
                                    width:'100%',
                                    }}>submit</button>
                    </div>
                    {/* {fileURL && <img src={fileURL} />} */}
                </form>
            </div>
        </div>
    );
}

export default Addimg;