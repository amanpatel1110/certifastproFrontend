import React, { useEffect, useState } from "react";
import axios from "axios";
import Navb from "./Nav";
import './Aboutus.css';
import { BASE_URL } from "../services/helper";

const Aboutus = () => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [uname,setUname] = useState('');

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

    useEffect(() => { checkAuth() }, []);

    return (
        <div className="main">
            <Navb role={isAdmin} email={uname}/>

            <div className="flex pb-5">

                <div className="left">
                   <div className="first">
                   <div className="heading container d-flex">
                        <h3 className="underline">ABOUT</h3><h3>&nbsp;&nbsp;US</h3>
                    </div>
                    <div className="body">
                        <p>Recognize Success with Style</p>
                        <h6>our mission is to empower individuals and organizations to acknowledge accomplishments and milestones effortlessly. We believe that every achievement, big or small, deserves to be celebrated with a beautifully designed certificate. Our goal is to make the process of creating certificates as seamless and enjoyable as possible.</h6>
                    </div>
                   </div>

                    <div className="second">
                    <div className="heading container d-flex">
                        <h3>Our Team</h3>
                    </div>
                    <div className="body">
                        <p>Aman Patel</p>
                    </div>
                    </div>
                </div>

                <div className="right">
                    <img src={require("./abtusImg.png")}  alt='a'/>
                </div>

            </div>
        </div>
    );

}

export default Aboutus