import React, { useEffect, useState } from "react";
import Navb from "./Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CertificateCard from "./Card";
import {ToastContainer,toast } from 'react-toastify';
import { BASE_URL } from "../services/helper";
const notify=()=> toast.error("Templaate Deleted",{ position: 'top-center',autoClose: 1000,});

const ManageTemplate = () => {

    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [uname,setUname] = useState('');

    const [cards, setCards] = useState([{}]);

    async function checkAuth() {

        try {
            const res = await axios.get(`${BASE_URL}/`, { withCredentials: true });

            if (res.data.msg === 'user not valid' || res.data.msg === 'fails') {
                navigate('/login');
            }
            else {
                if (res.data.role === 'admin') setIsAdmin(true);
                setUname(res.data.name);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async function getCards() {
        try {
            const res = await axios.get(`${BASE_URL}/certificate/card`, { withCredentials: true });
            setCards(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        checkAuth(); getCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
         },[]);

    return (
        <div>
            <Navb role={isAdmin} email={uname} />
            <ToastContainer/>
            <div className="mt-5 mw-100" style={{ marginLeft: '6%' }}>
                <div className="row">
                    {
                        cards.map((card, i) => (
                            <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-4 mb-5">
                                <div>
                                    <CertificateCard cards={cards} setCards={setCards} img={card.imgUrl} title={card.title} id={card._id} edit={false} delete={true}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default ManageTemplate;
export {notify};