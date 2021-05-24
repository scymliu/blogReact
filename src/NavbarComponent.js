import React,{useState} from "react";
import {Nav,Navbar,Form,Button} from "react-bootstrap"
import {Link,NavLink} from "react-router-dom";
const navsize=({
    width:"1000px",
    textAlign:"center",
    fontSize: "25px"
});

const BlogNavbar = () =>{

    const [searchTitle,setSearchTitle] = useState("");
    const [searchCategory, setSearchCategory] = useState("所有");

    return(
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="mr-auto" style={navsize}>   
                <Nav.Link href="/ArticlePage">文章列表</Nav.Link>
                <Nav.Link href="/listoflist">文章清單</Nav.Link>
                <Nav.Link href="/writeArticle">撰寫文章</Nav.Link>
            </Nav>
            <Form inline>
                <Form.Control type="text" value={searchTitle} onChange={e=>setSearchTitle(e.target.value)}placeholder="Search" className="mr-sm-2"/>
                <Form.Control as="select" onChange={e=>setSearchCategory(e.target.value)} defaultValue={searchCategory}>
                    <option>所有</option>
                    <option>日記</option>
                    <option>心得</option>
                    <option>創作</option>
                    <option>其他</option>
                </Form.Control>
                <Nav.Link href={"/search?title="+searchTitle+"&category="+searchCategory}>
                    <Button variant="outline-info">Search</Button>
                </Nav.Link>
            </Form>
        </Navbar>
    );
};
export default BlogNavbar;