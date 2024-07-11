import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import '../card.css';
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { BASE_URL } from "../services/helper";
import {notify} from './ManageTemplate';

const CertificateCard = (props)=>{

    const navigate = useNavigate();

    async function reqEditPage(e)
    {
     try{
      const res = await axios.get(`${BASE_URL}/`,{ withCredentials: true });
      console.log(res.data?.name);
        if(res.data?.name){
          navigate(`/edit?img=${`${BASE_URL}/${props.img}`}`,{state:{verified:res.data.verified}});
        }
        else navigate('/login');
    
     }
     catch(err){

     }
    }

    async function reqDelete(e){
      try{
        const res = await axios.delete(`${BASE_URL}/certificate/deleteCertiTemplate/${props.id}`);

        if(res.data.msg==='success'){
          const newCards = props.cards.filter((val)=>{return props.id !== val._id});
          props.setCards(newCards);
          notify();
        }
      }

      catch(err){
        console.log(err);
      }
    }

    return(
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`${BASE_URL}/${props.img}`}  alt={props.img} />
        <Card.Body>
          <Card.Title style={{textTransform: 'capitalize'}}>{props.title}</Card.Title>
          { props.edit &&
            <Button style={{marginTop:'10px'}}  variant="primary" className="editButton" onClick={reqEditPage}>Edit</Button>
          }
          { props.delete &&
            <button style={{fontSize:'30px',background:'none',padding:'0px',border:'none',color:'red'}} onClick={reqDelete}><MdDeleteForever /></button>
          }
        </Card.Body>
      </Card>
    );
}

export default CertificateCard;