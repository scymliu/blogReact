import React, { useState, useEffect } from "react";
import {useParams} from "react-router";
import {Card} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './css/article.css';
import articlepicture from './img/article.png';

const ArticleList = () => {

    const {id}= useParams();

    const [articles , setArticles] = useState(
        <Card>
        </Card>
    )
    useEffect(()=>{
        fetch('http://localhost:8080/api/articlelist/'+id)
        .then((response) => response.json())
        .then((data) => {
            setArticles(data.map((list,index)=>
                <div className="courses-container" key={index}>
                    <div className="course">
                        <div className="course-preview">
                            <img src={articlepicture} alt=""/>
                        </div>
                        <div className="course-info">
                            <h6>scymliu</h6>
                        <Link to={"/article/"+list.id} >
                            <h2>【{list.category}】{list.title}</h2>
                        </Link>
                        <Link to={"/article/"+list.id} >
                            <button className="articlesbtn">閱讀全文</button>
                        </Link> 
                        </div>
                    </div>
                </div>
      ));});},);

    return (
        <div style={{margin:"0 auto",width:"50%"}}>
            {articles}
        </div>
    );
};
export default ArticleList;