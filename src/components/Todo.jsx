import React, { useEffect, useState,useCallbackasync } from "react";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import Button from 'react-bootstrap/Button';

import './Todo.css';
import Container from "react-bootstrap/esm/Container";

const Todo = () => {

    const [task, setTask] = useState('');

    const onSubmit = useCallbackasync (async(e)=> {
        e.preventDefault();

        const res = await axios.post('http://localhost:8006/todo', { task: task });
        setTask('');
        console.log(res);
    },[]);

    function onChange(e) {
        setTask(e.target.value);
    }

    const [totalTask, setTotalTask] = useState([{}]);

    // async function getTasks() {
    //     try {
    //         const res = await axios.get('http://localhost:8006/todo');
    //         setTotalTask(res.data);
    //         // console.log(totalTask);
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }

    async function deleteTask(e) {
        console.log(e.target.value);
        try {
            const res = await axios.post('http://localhost:8006/todo/delete', { id: e.target.value });
        }
        catch (err) {

        }
       
        // console.log(res.data);   
    }

    async function clearAll(e) {
        console.log(e.target.value);
        try {
            const res = await axios.get('http://localhost:8006/todo/deleteAll');
        }
        catch (err) {

        }
        // console.log(res.data);   
    }

    useEffect(async(req,res) => { 
        try {
            const res = await axios.get('http://localhost:8006/todo');
            setTotalTask(res.data);
            // console.log(totalTask);
        }
        catch (err) {
            console.log(err);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSubmit, deleteTask,clearAll]);

    return (
        <div style={{height:'100vh',width:'100vw',backgroundColor:'#D5CAE2'}}>
        <div className="container d-flex ">
            <div style={{
                width: '400px',
                height: '100%',
                backgroundColor:' rgba(255, 255, 255, 0.497)',
                // border: '1px solid',
                borderRadius:'20px',
                // marginLeft:'33%',
                marginTop: '5%'
            }} className="container">

                <h3 style={{ textAlign: 'center', padding: '25px' }}>Todo App</h3>

                <Container style={{ padding: '25px', width: '100%' }}>
                    <form onSubmit={onSubmit}  >

                        <div>
                            <input type="text" name='task' value={task} style={{height:'40px'}} placeholder="Add your new todo" onChange={onChange} />
                            <button type="submit" className="btn" style={{ marginLeft: '20px',height:'40px',backgroundColor:'#6b4c94',color:'white'}}><IoIosAdd size={30}/></button>
                        </div>

                        <div>
                            {
                                totalTask.map((t, i) => (
                                    <div key={i} style={{
                                        backgroundColor: 'white',
                                        width: '260px',
                                        height: '35px',
                                        marginTop: '10px',
                                        paddingLeft: '5px',
                                        display: 'flex',
                                        marginTop:'20px',
                                    }}>
                                        <div style={{ display: 'flex',width:'100%', }} className="tsk">
                                            <div style={{ width: '100%' }} ><p>{i + 1}. {t.task}</p></div>
                                            <Button variant="danger delbtn" onClick={deleteTask} value={t._id}>del</Button>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>

                    </form>
                   
                    <div className="mt-4" style={{ display: 'flex',width:'100%', }}>
                    <p  style={{color:'#6b4c94'}}>You have {totalTask.length} pending Task</p> 
                    {
                        totalTask.length ? 
                        <button style={{height:'30px',
                        marginLeft:'20px',
                        border:'none',
                        backgroundColor:'#6b4c94',
                        color:'white'}} 
                        onClick={clearAll}
                        >
                            clear all</button>
                        :<></>
                        }
                    </div>

                </Container>

            </div>
        </div>
        </div>
    )
}

export default Todo;