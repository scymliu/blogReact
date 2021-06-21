import React, { useState, useEffect } from "react";
import {useParams} from "react-router";
import {Button,Modal,Form} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import GoTop from '../Feature/gotop'
import '../css/article.css'
import editIcon from '../img/edit.png'
import backgroundIcon from '../img/bg.png'

const ArticleTest = () => {

    const {id}= useParams();
    const { register, handleSubmit } = useForm();
    const [Article,setArticle]=useState(<></>);
    const [exception,setException]=useState(false);
    const [ArticleList,setArticleList]=useState(<option></option>);
    const [show, setShow] = useState(false);
    const [content,setContent] = useState(<></>);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [fetchres,setFetchres]=useState();
    const username=JSON.parse(localStorage.getItem('token')).username;
    const userid=JSON.parse(localStorage.getItem('token')).userid;
    const onSubmit = data => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(JSON.parse('{"id":'+data.id+',"articleid":'+id+'}'))
        };
        fetch('http://localhost:8080/api/articlelist', requestOptions)
        .then((response) => response.json())
        .then((res) => {
            setFetchres(res.response)})
        .catch(()=>{alert('發生錯誤')});
    }

    useEffect(()=>{
        const FetchArticle = () => {
            fetch('http://localhost:8080/api/articles/'+id)
            .then((response) => response.json())
            .then((data) => {
                
                data.user === username ? setException(false) : data.privacy ? setException(true) : setException(false);//改到restful api裡
                setArticle({
                    user:data.user,
                    title:data.title,
                    category:data.category,
                    content:data.content,
                    date:data.date
                });
                setContent(data.content.split(/\n/).map((list)=><div className="px-5 article-body-text">{list}&nbsp;</div>
                ))
            })
            .catch(()=>{setException(true)})
        };
        const FetchArticleList = () => {
            fetch('http://localhost:8080/api/listoflist/'+userid)
          .then((response) => response.json())
          .then((data) => {
            setArticleList(data.map((list,index)=>
            <option value={list.id} key={index}>{list.name}</option>
            ));
            
          });
        }
        FetchArticle();
        FetchArticleList();
    }
    ,[])

    if(exception)
        return(<div style={{margin:"0px auto",width:"70%",fontSize:"35px"}}>無此文章或權限不足</div>)
    return (
        <>
            <div className="article-container" style={{backgroundImage:`url(${backgroundIcon})`}}>
                <hr className="article-separate"/>
                <div className="article-course">
                    <div className="article-head">
                        <p className="px-3 py-4" >【{Article.category}】{Article.title}</p>
                        <div className="article-head-button">
                            <button className="btn-info" onClick={handleShow}>加入清單</button>
                        </div>
                    </div>
                    <hr className="article-separate"/>
                    <div className="article-info">
                        <div className="article-info-contain">
                            <div className="article-info-aritcle">
                            <Link to={"/home/"+Article.user} style={{textDecoration:"none"}} >
                                <p className="px-2 py-2">作者：{Article.user}</p>
                            </Link>
                            </div>
                            <div className="article-info-edit">
                                {Article.user==username && 
                                <Link to={"/articles/edit/"+id}>
                                    <img src={editIcon} alt=""/>
                                </Link>
                                }
                            </div>
                        </div>
                        <div className="article-info-date">
                            &nbsp;&nbsp;發布於：{Article.date}
                        </div>
                    </div>
                    <hr className="article-separate"/>
                    <div className="article-body">
                        <div className="px-5 article-body-text">&nbsp;</div>
                        {content}
                    </div>
                </div>
                <hr className="article-separate"/>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>加入清單</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>選擇清單</Form.Label>
                            <Form.Control as="select" custom {...register("id")}>
                                {ArticleList}
                            </Form.Control>
                        </Form.Group>
                        {fetchres}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            關閉
                        </Button>
                        <Button variant="primary" type="submit">
                            加入
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <GoTop/>
        </>
    );
};
export default ArticleTest;