import React, { useState, useEffect } from "react";
import {useParams} from "react-router";
import {Link,NavLink} from "react-router-dom";
import {Carousel} from 'react-bootstrap';
import Usericon from './img/user.png'
import './css/article.css';
import './css/homepage.css';
import './css/article.css';
import articlepicture from './img/article.png';

const HomePage = () => {

    const {user}= useParams();
    
    const [username , setUsername] = useState(JSON.parse(localStorage.getItem('token')).username)
    const [userarticle , setUserarticle] = useState()

    const fetchuserinfo = () =>{
        
        user===undefined ?
        fetch('http://localhost:8080/api/articles/userpage/?user='+username)
        .then((response) => response.json())
        .then((data) => {
            setUserarticle(data.map((list,index)=>
            <Carousel.Item >
                <div className="courses-container" key={index} style={{backgroundColor:"#888888",height:"200px"}}>
                    <div className="course px-5" style={{backgroundColor:"#888888",height:"200px"}}>
                        <div className="course-preview">
                            <img src={articlepicture} alt=""/>
                        </div>
                        <div className="course-info">
                            <NavLink to={"/article/"+list.id} style={{textDecoration:"none"}}>
                                <h5>【{list.category}】{list.title}</h5>
                            </NavLink>
                            <Link to={"/article/"+list.id} >
                                <button className="articlesbtn">閱讀全文</button>
                            </Link> 
                        </div>
                    </div>
                </div>
            </Carousel.Item>
            ));
          })
          :
          fetch('http://localhost:8080/api/articles/userpage/?user='+user)
          .then((response) => response.json())
          .then((data) => {
              setUserarticle(data.map((list,index)=>
              <Carousel.Item >
                  <div className="courses-container" key={index} style={{backgroundColor:"#888888",height:"200px"}}>
                      <div className="course px-5" style={{backgroundColor:"#888888",height:"200px"}}>
                          <div className="course-preview">
                              <img src={articlepicture} alt=""/>
                          </div>
                          <div className="course-info">
                              <NavLink to={"/article/"+list.id} style={{textDecoration:"none"}}>
                                  <h5>【{list.category}】{list.title}</h5>
                              </NavLink>
                              <Link to={"/article/"+list.id} >
                                  <button className="articlesbtn">閱讀全文</button>
                              </Link> 
                          </div>
                      </div>
                  </div>
              </Carousel.Item>
              ));
            })
    }

    useEffect(()=>{
        setUsername(user!=undefined ?user:username);
        fetchuserinfo();},[]);

    return (
        <div style={{backgroundColor:"#FFEBEE"}}>
            <div className="container d-flex justify-content-center">
                <div className="card rounded">
                    <div className=" d-block justify-content-center">
                        <div className="area1"> </div>
                        <div className="area2 p- text-center">
                            <div className="image mr-3"> <img src={Usericon} class="rounded-circle" width="150" style={{border:"1px",borderColor:"#000"}}/>
                                <h4 className=" name mt-3 ">{username}</h4>
                                <p className="information mt-3 text-justify px-2" style={{fontSize:"20px",color:"#000",fontWeight:"bold"}}>簡介</p>
                                <p className="information text-justify px-3">沒有甚麼能講的</p>
                            </div>
                            <div>
                                <p className="text-left px-3"style={{fontSize:"20px",float:"left",fontWeight:"bold",width:"50%"}}>最新發表的文章</p>
                                <NavLink to={"/articles/user/"+username} className="text-right px-5"style={{fontSize:"20px",float:"left",fontWeight:"bold",width:"50%",textDecoration:"none"}}>所有文章</NavLink>
                                <br/>
                            </div>
                            <Carousel>
                                {userarticle}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomePage;