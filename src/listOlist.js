import React, { useState, useEffect } from "react";
import {Card,CardGroup} from 'react-bootstrap';
import {Link} from "react-router-dom";

const ListofList = () =>{

    const [articlelist , setArticlelist] = useState(
        <Card>
        </Card>
    )

    const FetchArticleList = () => {
        fetch('http://localhost:8080/api/listoflist')
      .then((response) => response.json())
      .then((data) => {
        setArticlelist(data.map((list,index)=>
        <div style={{margin:"0px auto",width:'33%'}}>
            <Card key={index+1}>
                <Card.Footer />
                <Link to={"/articlelist/"+list.id} >
                    <Card.Body>
                        <div style={{height:'8rem'}}>
                            <Card.Title style={{fontSize:"20px"}}>{list.name}</Card.Title>
                        </div>
                    </Card.Body>
                </Link>
            </Card>
        </div>
        
        ));
      });
    }

    useEffect(()=>{FetchArticleList()},[]);

    return (
        <div style={{margin:"0px auto",width:'80%'}}>
            <CardGroup>
                {articlelist}
            </CardGroup>
        </div>
    )

};export default ListofList;