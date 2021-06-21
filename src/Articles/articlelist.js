import React, { useState, useEffect } from "react";
import {useParams} from "react-router";
import {Card} from 'react-bootstrap';
import {NavLink,Link} from "react-router-dom";
import '../css/article.css';
import articlepicture from '../img/article.png';
import GoTop from '../Feature/gotop'
import backgroundIcon from '../img/bg.png'

const ArticleList = () => {

    const {id}= useParams();

    const [articles , setArticles] = useState(
        <Card>
        </Card>
    )
    
    const aaa = (lid,aid) =>{
        if ( window.confirm ("確定要移除?")){
        　　fetch('http://localhost:8080/api/articlelist/delete/'+lid+'?articleid='+aid)
            .then((response) => response.json())
            .then((res)=>{
                alert(res.response);
                window.location.reload();
            })
            .catch((error)=>alert("移除失敗"))
        }
    }


    useEffect(()=>{
        fetch('http://localhost:8080/api/articlelist/'+id)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setArticles(data.map((list,index)=>
                <div className="courses-container" key={index}>
                    <div className="course">
                        <div className="course-preview">
                            <img src={articlepicture} alt=""/>
                        </div>
                        <div className="course-info">
                        <NavLink to={"/home/"+list.user} style={{textDecoration:"none"}} >
                            <h6>{list.user}</h6>
                        </NavLink>
                        <Link to={"/article/"+list.articleid} >
                            <h5>【{list.category}】{list.title}</h5>
                        </Link>
                        <button style={{right:"100px",backgroundColor:"#f00"}} onClick={()=>aaa(list.id,list.articleid)} className="articlesbtn">移除</button>
                        <Link to={"/article/"+list.articleid} >
                            <button className="articlesbtn">閱讀全文</button>
                        </Link>
                        </div>
                    </div>
                </div>
      ));});},[]);

    return (
        <div style={{width:"100%",backgroundImage:`url(${backgroundIcon})`,minHeight:"659px"}}>
            <hr className="article-separate"/>
            <div style={{margin:"0 auto",width:"50%"}}>
                {articles}
                <GoTop/>
            </div>
        </div>
    );
};
export default ArticleList;