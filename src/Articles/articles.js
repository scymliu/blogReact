import React, { useState, useEffect } from "react";
import {Link,NavLink} from "react-router-dom";
import '../css/article.css';
import articlepicture from '../img/article.png';

const ArticlePage = () => {

    const [articles , setArticles] = useState(
        <></>
    )

    const username=JSON.parse(localStorage.getItem('token')).username;

    const FetchArticle = () => {
        console.log(username);
        fetch('http://localhost:8080/api/articles')
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.filter((item)=>
        item.user===username ? true: item.privacy ? false : true
        )
        .map((list,index)=>
        <div className="courses-container" key={index}>
            <div className="course">
                <div className="course-preview">
                    <img src={articlepicture} alt=""/>
                </div>
                <div className="course-info">
                    <h6>{list.user}</h6>
                <NavLink to={"/article/"+list.id} >
                    <h2>【{list.category}】{list.title}</h2>
                </NavLink>
                <Link to={"/article/"+list.id} >
                    <button className="articlesbtn">閱讀全文</button>
                </Link> 
                </div>
            </div>
        </div>
        ));
      });
    }

    useEffect(()=>{FetchArticle()},[]);

    return (
        <div style={{margin:"0 auto",width:"50%"}}>
            {articles}
        </div>
    );
};
export default ArticlePage;