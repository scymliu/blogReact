import React, { useState, useEffect } from "react";
import {NavLink} from "react-router-dom";
import '../css/article.css';
import articlepicture from '../img/article.png';
import GoTop from '../Feature/gotop'
import backgroundIcon from '../img/bg.png'

const ArticlePage = () => {

    const [articles , setArticles] = useState(
        <></>
    )

    const username=JSON.parse(localStorage.getItem('token')).username;

    const FetchArticle = () => {
        console.log(username);
        fetch('http://localhost:8080/api/articles?user='+username)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.filter((item)=>
        item.user===username ? true: item.privacy ? false : true
        )
        .map((list,index)=>
        <div className="courses-container" key={index}>
            <div className="course">
                <div className="course-preview">
                    <div className="lookfirst">
                        <img src={articlepicture} alt=""/>
                        <span className="lookfirsttext">{list.content}</span>
                    </div>
                </div>
                <div className="course-info">
                <NavLink to={"/home/"+list.user} style={{textDecoration:"none"}} >
                    <h6>{list.user}</h6>
                </NavLink>
                <NavLink to={"/article/"+list.id}  style={{textDecoration:"none"}} >
                    <h5>【{list.category}】{list.title}</h5>
                </NavLink>
                <NavLink to={"/article/"+list.id} >
                    <button className="articlesbtn">閱讀全文</button>
                </NavLink> 
                </div>
            </div>
        </div>
        ));
      });
    }

    
    const asd=()=>{
        window.scrollTo(0, 0);
    }

    const logout = () => {
        localStorage.removeItem('token')
    }

    useEffect(()=>{FetchArticle()},[]);

    return (
        <>
            <div style={{width:"100%",backgroundImage:`url(${backgroundIcon})`}}>
                <hr className="article-separate"/>
                <div style={{margin:"0 auto",width:"50%"}}>
                    {articles}
                    <GoTop/>
                </div>
                <hr className="article-separate"/>
            </div>
        </>
    );
};
export default ArticlePage;