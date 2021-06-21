import React, { useState, useEffect } from "react";
import {Link,NavLink} from "react-router-dom";

import GoTop from '../Feature/gotop'
import '../css/article.css';
import articlepicture from '../img/article.png';
import backgroundIcon from '../img/bg.png'

const OwnerArticle = () => {

    const [articles , setArticles] = useState(<></>)
    const username=JSON.parse(localStorage.getItem('token')).username;

    const FetchArticle = () => {
        fetch('http://localhost:8080/api/articles/user/'+username+'?requestuser='+username)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.map((list,index)=>
        <div className="courses-container" key={index}>
            <div className="course" style={{backgroundColor: list.privacy ? "#FFA07A" : "#DCDCDC"}}>
                <div className="course-preview" style={{backgroundColor: list.privacy ? "#FFA07A" : "#DCDCDC"}}>
                    <img src={articlepicture} alt=""/>
                </div>
                <div className="course-info">
                <NavLink to={"/home/"+list.user} style={{textDecoration:"none"}} >
                    <h6>{list.user}</h6>
                </NavLink>
                <NavLink to={"/article/"+list.id}  style={{textDecoration:"none"}} >
                    <h5>【{list.category}】{list.title}</h5>
                </NavLink>
                    <Link to={"/articles/edit/"+list.id}>
                        <button style={{right:"100px",backgroundColor:"#00c"}} className="articlesbtn">編輯</button>
                    </Link>
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
        <div style={{width:"100%",backgroundImage:`url(${backgroundIcon})`,minHeight:"659px"}}>
            <hr className="article-separate"/>
            <div style={{margin:"0 auto",width:"50%"}}>
                {articles}
                <GoTop/>
            </div>
            <hr className="article-separate"/>
        </div>
    );
};
export default OwnerArticle;