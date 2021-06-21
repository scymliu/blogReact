import '../css/App.css';
import BlogNavbar from '../Navbar/NavbarComponent';
import ArticlePage from '../Articles/articles';
import ArticleContent from '../Articles/article';
import WriteArticle from '../write';
import ListofList from '../Articles/listOlist';
import ArticleList from '../Articles/articlelist';
import SearchComponent from '../Articles/search';
import IsAuth from '../token/auth';
import useToken  from '../token/useToken';
import HomePage from '../homepage'
import UserArticle from '../Articles/userarticle'
import ArticleEdit from '../Articles/articleedit'
import OwnerArticle from '../Articles/ownerarticle'

import {
  BrowserRouter,
  Route
} from "react-router-dom";
function App() {

  const { token, setToken } = useToken();

  if(!token)
    return(
    <>
      <BlogNavbar/>
      <div style={{width:"50%",margin:"0px auto"}}>
        <IsAuth setToken={setToken}/>
      </div>
    </>
    )
  return (
    <BrowserRouter>
      <Route path="/" component={BlogNavbar}></Route>
      <Route exact path="/" component={HomePage}></Route>
      <Route path="/ArticlePage" component={ArticlePage}></Route>
      <Route path="/Article/:id" component={ArticleContent}/>
      <Route path="/writeArticle" component={WriteArticle}/>
      <Route path="/listoflist" component={ListofList}/>
      <Route path="/articlelist/:id" component={ArticleList}/>
      <Route path="/search" component={SearchComponent}/>
      <Route path="/home/:user" component={HomePage}/>
      <Route exact path="/articles/user" component={OwnerArticle}/>
      <Route path="/articles/user/:user" component={UserArticle}/>
      <Route path="/articles/edit/:id" component={ArticleEdit}/>
    </BrowserRouter>
  );
}
export default App;
