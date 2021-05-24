import React, { useState, useEffect } from "react";
import {useParams} from "react-router";
import {Card,Button,Modal,Form} from 'react-bootstrap';
import { useForm } from "react-hook-form";

const ArticleContent = () => {

    const {id}= useParams();
    const { register, handleSubmit } = useForm();
    const [Article,setArticle]=useState(<></>);
    const [exception,setException]=useState(false);
    const [ArticleList,setArticleList]=useState(<option></option>);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [fetchres,setFetchres]=useState();
    const username=JSON.parse(localStorage.getItem('token')).username;

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

    useEffect(
        ()=>{    
            const FetchArticle = () => {
                fetch('http://localhost:8080/api/articles/'+id)
                .then((response) => response.json())
                .then((data) => {
                    data.user === username ? setException(false) : data.privacy ? setException(true) : setException(false);
                    setArticle({
                        user:data.user,
                        title:data.title,
                        category:data.category,
                        content:data.content,
                        date:data.date
                    });
                })
                .catch(()=>{alert('發生錯誤');setException(true)})
            };
            const FetchArticleList = () => {
                fetch('http://localhost:8080/api/listoflist')
              .then((response) => response.json())
              .then((data) => {
                setArticleList(data.map((list,index)=>
                <option value={list.id} key={index}>{list.name}</option>
                ));
              });
            }
            FetchArticle();
            FetchArticleList();
        },[]);

    if(exception)
        return(<div style={{margin:"0px auto",width:"70%",fontSize:"35px"}}>無此文章或權限不足</div>)
    
    return (
        <>
            <div style={{margin:"0px auto",width:"70%"}}>
                <Card
                    bg='light'
                    text='dark'
                    style={{ margin:"0px auto" ,minHeight:'50rem'}}
                    className="mb-2"
                    border="dark"
                >
                    <div>
                        <Card.Header style={{fontSize:"35px",float:"left",width:"92%"}} >{Article.title}</Card.Header>
                        <Button variant="danger" style={{fontSize:"20px",float:"left",width:"8%",height:"67px"}} onClick={handleShow}>加入<br/>清單</Button>
                    </div>
                    <Card.Body style={{fontSize:"15px"}}>
                        <Card.Text >
                            {Article.content}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">發布於：{Article.date}</small>
                    </Card.Footer>
                </Card>
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
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};
export default ArticleContent;