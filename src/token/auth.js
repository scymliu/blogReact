import {Button,Form} from 'react-bootstrap';
import { useForm } from "react-hook-form";

const IsAuth = (prop) =>{

    const {setToken}=prop;

    const onSubmit = data => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(data)
        };
        fetch('http://localhost:8080/api/login', requestOptions)
        .then((response) => response.json())
        .then(res=>{
            const outputtext = ({"username":res.username,"userid":res.id})
            setToken(JSON.stringify(outputtext))
        })
        .catch(()=>alert("輸入有誤請重新輸入"))
    }

    const { register, handleSubmit } = useForm();


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
            </Form.Group>
        
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" {...register("password")}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                驗證
            </Button>
        </Form>
    )
};
export default IsAuth;