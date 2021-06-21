import React,{useState} from "react";
import {Nav,Navbar,Form,Button} from "react-bootstrap"
const navsize=({
    width:"1000px",
    textAlign:"center",
    fontSize: "18px"
});

const BlogNavbar = () =>{

    const [searchTitle,setSearchTitle] = useState("");
    const [searchCategory, setSearchCategory] = useState("所有");

    const search = () =>{
        searchTitle ? 
                window.location.href = "/search?title="+searchTitle+"&category="+searchCategory : 
                alert('搜尋欄不能為空')
    }

    return(
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="mr-auto" style={navsize}>   
                <Nav.Link href="/articles/user/">文章創作</Nav.Link>
                <Nav.Link href="/ArticlePage">最新文章</Nav.Link>
                <Nav.Link href="/listoflist">文章清單</Nav.Link>
                <Nav.Link href="/writeArticle">撰寫文章</Nav.Link>
            </Nav>
            <Form inline action={"javascript:search();"}>
                <Form.Control type="text" value={searchTitle} onChange={e=>setSearchTitle(e.target.value)}placeholder="Search" className="mr-sm-2" required/>
                <Form.Control as="select" onChange={e=>setSearchCategory(e.target.value)} defaultValue={searchCategory}>
                    <option>所有</option>
                    <option>日記</option>
                    <option>心得</option>
                    <option>創作</option>
                    <option>其他</option>
                </Form.Control>
                    <Button type="submit" variant="outline-info" onClick={search}>Search</Button>
            </Form>
        </Navbar>
    );
};
export default BlogNavbar;