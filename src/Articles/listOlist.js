import React, { useState, useEffect } from "react";
import {Button,Modal,Form} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import { useForm } from "react-hook-form";

import GoTop from '../Feature/gotop'
import '../css/article.css';
import ListIcon from '../img/list.png'
import backgroundIcon from '../img/bg.png'

const ListofList = () =>{

    const { register, handleSubmit } = useForm();
    const [articlelist , setArticlelist] = useState(<></>)
    const userid=JSON.parse(localStorage.getItem('token')).userid;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const FetchArticleList = () => {
        fetch('http://localhost:8080/api/listoflist/'+userid)
      .then((response) => response.json())
      .then((data) => {
        setArticlelist(data.map((list,index)=>

        <div className="courses-container" key={index}>
            <div className="course">
                <div className="course-preview">
                    <img src={ListIcon} alt=""/>
                </div>
                <div className="course-info">
                <NavLink to={"/articlelist/"+list.id} style={{textDecoration:"none"}} >
                    <h6>{list.name}</h6>
                </NavLink>
                <NavLink to={"/articlelist/"+list.id}  style={{textDecoration:"none"}} >
                    <h5>{list.intro}</h5>
                </NavLink>
                <NavLink to={"/articlelist/"+list.id} >
                    <button className="articlesbtn">瀏覽</button>
                </NavLink> 
                </div>
            </div>
        </div>
        
        ));
      });
    }

    const onSubmit = data => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(data)
        };
        fetch('http://localhost:8080/api/newlist', requestOptions)
        .then((response) => {
            if(response.ok)
                return response.json();
        })
        .then((res) => {
           window.location.href = "/listoflist";
        })
    }

    useEffect(()=>{FetchArticleList()},[]);

    return (
        <div style={{width:"100%",backgroundImage:`url(${backgroundIcon})`,minHeight:"659px"}}>
            <hr className="article-separate"/>
            <div style={{margin:"0 auto",width:"50%"}}>
                {articlelist}
                <GoTop/>
            </div>
            <button className="btn-dark" onClick={handleShow} style={{fontSize:"20px",position:"fixed",right:"200px",top:"130px"}}>新增清單</button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>新增清單</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Form.Label>清單名稱</Form.Label>
                        <Form.Control type="text" style={{fontSize:"15px"}} required {...register("name")}/>
                        <Form.Label>清單介紹</Form.Label>
                        <Form.Control as="textarea" rows={3} style={{fontSize:"15px",resize:"none",padding:"0"}} required {...register("intro")}/>
                        <input type="hidden" value={userid} {...register("userid")}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            關閉
                        </Button>
                        <Button variant="primary" type="submit">
                            新增
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )

};export default ListofList;