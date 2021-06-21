import React, { useState, useEffect } from "react";
import {useLocation} from "react-router";
import {Link,NavLink} from "react-router-dom";

import GoTop from '../Feature/gotop'
import '../css/article.css';
import articlepicture from '../img/article.png';
import backgroundIcon from '../img/bg.png'

const SearchComponent = () => {

    const article_parameter = useLocation().search;

    const [reason , setReason] = useState(
        <></>
    )

    const username=JSON.parse(localStorage.getItem('token')).username;

    const FetchArticle = () => {
        fetch('http://localhost:8080/api/articles/search'+article_parameter)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReason(data.filter((item)=>
        item.user===username ? true: item.privacy ? false : true
        )
        .map((list,index)=>
        <div className="courses-container" key={index}>
            <div className="course" style={{backgroundColor: list.privacy ? "#FFA07A" : "#DCDCDC"}}>
                <div className="course-preview" style={{backgroundColor: list.privacy ? "#FFA07A" : "#DCDCDC"}}>
                    <img src={articlepicture}  alt=""/>
                </div>
                <div className="course-info">
                <NavLink to={"/home/"+list.user} style={{textDecoration:"none"}} >
                    <h6>{list.user}</h6>
                </NavLink>
                <NavLink to={"/article/"+list.id} >
                    <h5>【{list.category}】{list.title}</h5>
                </NavLink>
                <NavLink to={"/article/"+list.id} >
                    <button className="articlesbtn">閱讀全文</button>
                </NavLink> 
                </div>
            </div>
        </div>
        ));
      })
      .catch(error => console.error(error))
    }

    useEffect(()=>{FetchArticle()},[]);

    return (
        <div style={{width:"100%",backgroundImage:`url(${backgroundIcon})`,minHeight:"659px"}}>
            <hr className="article-separate"/>
            <div style={{margin:"0 auto",width:"50%"}}>
                {reason}
                <GoTop/>
            </div>
        </div>
    );
};
export default SearchComponent;