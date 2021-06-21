import React, { useState, useEffect } from "react";
import {useParams} from "react-router";
import {Form,Button,Col} from 'react-bootstrap';
import { useForm } from "react-hook-form";



const ArticleEdit = () => {

    const {id}= useParams();
    const { register, handleSubmit } = useForm();
    const [Article,setArticle]=useState();
    const username=JSON.parse(localStorage.getItem('token')).username;
    const onSubmit = data => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(data)
        };
        fetch('http://localhost:8080/api/articles', requestOptions)
        .then((response) => {
            if(response.ok)
                return response.json();
        })
        .then((res) => {
           window.location.href = "/article/"+res.id
        })
        .catch(()=>{alert('更新時發生錯誤')});
    };

    const uneditable = () =>{
        alert('無此文章或沒有權限編輯');
        window.history.back();
    }

    const fetchArticle = () => {
        fetch('http://localhost:8080/api/articles/'+id)
        .then((response) => response.json())
        .then((data) => {
            username===data.user?
           setArticle(<div style={{margin:"0px auto",width:"70%",fontSize:"20px"}}>
           <Form onSubmit={handleSubmit(onSubmit)}>
               <Form.Row>
                   <Col>
                       <Form.Group>
                           <Form.Label>標題</Form.Label>
                           <input type="hidden" value={id} {...register("id")}/>
                           <input type="hidden" value={username} {...register("user")}/>
                           <Form.Control type="text" defaultValue={data.title} style={{fontSize:"15px"}} {...register("title")} />
                       </Form.Group>
                   </Col>
                   <Col>
                       <Form.Group>
                           <Form.Label>類別</Form.Label>
                           <Form.Control as="select" defaultValue={data.category} style={{fontSize:"15px"}} {...register("category")} >
                               <option>日記</option>
                               <option>心得</option>
                               <option>創作</option>
                               <option>其他</option>
                           </Form.Control>
                       </Form.Group>
                   </Col>
               </Form.Row>
               <Form.Group>
                   <Form.Label>內容</Form.Label>
                   <Form.Control as="textarea" defaultValue={data.content} rows={10} style={{fontSize:"15px"}} {...register("content")}/>
               </Form.Group>
               <Form.Group controlId="formBasicCheckbox" style={{margin:"auto",fontSize:"10px"}}>
                   <Form.Check type="checkbox" defaultChecked={data.privacy} style={{fontSize:"15px"}} label="私人文章" {...register("privacy")}/>
                   <br/>
               </Form.Group>
               <Button variant="primary" type="submit">
                   修改
               </Button>
           </Form>
       </div>):
        uneditable()
    })}

        useEffect(()=>fetchArticle(),[]);

    return (
        <>
           {Article}
        </>
    );
};
export default ArticleEdit;