import React, { useState, useEffect } from "react";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import './css/article.css';
import articlepicture from './img/article.png';

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
            <div className="course">
                <div className="course-preview">
                    <img src={articlepicture}  alt=""/>
                </div>
                <div className="course-info">
                    <h6>{list.user}</h6>
                <Link to={"/article/"+list.id} >
                    <h2>【{list.category}】{list.title}</h2>
                </Link>
                <Link to={"/article/"+list.id} >
                    <button className="articlesbtn">閱讀全文</button>
                </Link> 
                </div>
            </div>
        </div>
        ));
      })
      .catch(error => console.error(error))
    }

    useEffect(()=>{FetchArticle()},[]);

    return (
        <div style={{margin:"0 auto",width:"50%"}}>
            {reason}
        </div>
    );
};
export default SearchComponent;