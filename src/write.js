import React from "react";
import {Form,Button,Col} from 'react-bootstrap';
import { useForm } from "react-hook-form";



const WriteArticle = () => {

    const { register, handleSubmit } = useForm();
    const username=JSON.parse(localStorage.getItem('token')).username;

    const textareaHeight = (textarea) =>{
        textarea.style.height = textarea.scrollHeight + 'px';
    }


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
           window.location.href = "/article/"+res.id})
        .catch(()=>{alert('發布時發生錯誤')});
    };

    return (
        <>
            <div style={{margin:"0px auto",width:"70%",fontSize:"20px"}}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>標題</Form.Label>
                                <Form.Control type="text" style={{fontSize:"15px"}} {...register("title")}/>
                                <input type="hidden" value={username} {...register("user")}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>類別</Form.Label>
                                <Form.Control as="select" defaultValue="日記" style={{fontSize:"15px"}} {...register("category")}>
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
                        <Form.Control as="textarea" rows={18} style={{fontSize:"15px",resize:"none",padding:"0"}} {...register("content")}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox" style={{margin:"auto",fontSize:"10px"}}>
                        <Form.Check style={{fontSize:"15px"}} type="checkbox" label="私人文章" {...register("privacy")}/>
                        <br/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        發布
                    </Button>
                </Form>
            </div>
        </>
    );
};
export default WriteArticle;