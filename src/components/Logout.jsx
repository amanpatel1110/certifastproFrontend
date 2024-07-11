import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../services/helper";
import Cookies from "js-cookie";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userLogout = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/logout`,{ withCredentials: true });

                if (res.data.msg === 'success') {
                    localStorage.removeItem('token');
                    // Cookies.remove('token');
                    navigate('/');
                } 
                else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('Logout error:', error);
            }
        };

        userLogout();
    }, [navigate]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}

export default Logout;
