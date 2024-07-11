import React, { useState, useEffect} from "react";
import axios from "axios";
import CertificateCard from "./Card";
import Navb from "./Nav";

import '../card.css';
import { useSearchParams } from "react-router-dom";

import { BASE_URL } from "../services/helper";

// Your Achievement, Our Design
// Recognize Success with Style


const Home = () => {

    // const [user, setUser] = useState({
    //     name: '',
    //     email: '',
    //     role:'user',
    //     verified:'',
    // });

    const [isAdmin,setIsAdmin] = useState(false);
    const [uname,setUname] = useState(null);

    const [params] = useSearchParams();
    // const [qry,setQry] = useState('');
    const qry=params.get('qry');

    async function getUserData() {
        try {
            const res = await axios.get(`${BASE_URL}/`, { withCredentials: true });

            // setUser({ name: res.data.name, email: res.data.email,role:res.data.role ,verified:res.data.verified });
            // console.log(res);
            if(res.data.role === 'admin') {
                setIsAdmin(true);
                setUname(res.data.name);
            }
        }
        catch (err) { }
    }

    const [cards,setCards] = useState([{}]);

    async function getCard() {
        try {
            const res = await axios.get(`${BASE_URL}/certificate/card`, { withCredentials: true });

           if(qry){
            const newCards = res.data.filter((c)=>{

                if (c.title.toLowerCase().includes(qry.toLowerCase())){return c; }
                else return null;
            });
            setCards(newCards);
           }

            else setCards(res.data);
        }
        catch (err) { }
    }

    useEffect(() => {
        getUserData();
        getCard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (
        <div >
          
           <Navb role={isAdmin} email={uname} search={true} data={qry}/>

            <div className="mt-5 mw-100" style={{ marginLeft: '6%' }}>
            {/* {isAdmin && <h1>hiiiii</h1>} */}
                <div className="row ">
                    {
                        cards.map((card, i) => (
                            <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-4 mb-5">
                                <div>
                                    <CertificateCard img={card.imgUrl} title={card.title} edit={true} delete={false}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    );
}

export default Home;