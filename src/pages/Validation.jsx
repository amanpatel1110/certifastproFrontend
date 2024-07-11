import React, { useEffect, useState } from "react";
import Navb from "../components/Nav";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../services/helper";
import './verification.css'

const Validation = () => {

    const [params] = useSearchParams();
    const [data, setData] = useState({
        hname: '',
        date: '',
        iname: '',
        body: '',
    });

    const [error, setError] = useState(false);


    async function getCerti() {
        const res = await axios.get(`${BASE_URL}/certificate/certiAuthentication/${params.get('id')}`);

        if (res.data?.msg === 'error') {
            setError(true);
        }
        else {
            setData({
                ...data,
                hname: res.data?.holderName,
                date: res.data?.date,
                iname: res.data?.issuerName,
                body: res.data?.body,
            });
        }

        // console.log(res.data);

    }


    useEffect(() => {
        getCerti();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div style={{ width: '100%' }}>
            <Navb />

            {!error ?
                <div className="verificationBlock container ">

                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="row">Issued By:</th>
                                <td>{data.iname}</td>
                            </tr>
                            <tr>
                                <th scope="row">Holder Name:</th>
                                <td>{data.hname}</td>
                            </tr>
                            <tr>
                                <th scope="row">Issued For:</th>
                                <td>{data.body}</td>
                            </tr>
                            <tr>
                                <th scope="row">Issued Date:</th>
                                <td>{data.date}</td>
                            </tr>

                        </tbody>
                    </table>

                    {/* <div className="mt-3 mx-3 d-flex w-100 ">
                        <p className="fw-bolder h3">Issued By:</p>
                        <p className="mx-3 h3 d-inline text">{data.iname}</p>
                    </div>

                    <div className="mt-3 mx-3 d-flex h3 w-100">
                        <p className="fw-bolder">Holder Name:</p>
                        <p className="mx-3 h3">{data.hname}</p>
                    </div>

                    <div className="mt-3 mx-3 d-flex w-100">
                        <p className="fw-bolder h3">Issued For:</p>
                        <p style={{ fontFamily: 'sans-serif' }} className=" mt-2 mx-3 h5 d-inline"> {data.body}
                        </p>
                    </div>

                    <div className="mt-3 mx-3 d-flex h3 w-100">
                        <p className="fw-bolder">Issued Date:</p><p className="mx-3 h3">{data.date}</p>
                    </div> */}

                    <div style={{marginLeft:'28%'}}>
                        <img src={require('./approved.jpeg')} alt='' width={150} />
                    </div>
                </div>

                :

                <div className="verificationFailedBlock container">
                    <div className="mt-3">
                        <h3>Verification Failed</h3>
                    </div>

                    <div className="mt-3">
                        <img src={require('./notApproved.jpeg')} alt='' width={150} />
                    </div>
                </div>

            }


        </div>
    );
}

export default Validation;