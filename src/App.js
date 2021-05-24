import './App.css';
import BlogNavbar from './NavbarComponent';
import ArticlePage from './Articles/articles';
import ArticleContent from './article';
import WriteArticle from './write';
import ListofList from './listOlist';
import ArticleList from './articlelist';
import SearchComponent from './search';
import IsAuth from './token/auth';
import useToken  from './token/useToken';

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
      <Route path="/ArticlePage" component={ArticlePage}></Route>
      <Route path="/Article/:id" component={ArticleContent}/>
      <Route path="/writeArticle" component={WriteArticle}/>
      <Route path="/listoflist" component={ListofList}/>
      <Route path="/articlelist/:id" component={ArticleList}/>
      <Route path="/search" component={SearchComponent}/>
    </BrowserRouter>
  );
}
export default App;
