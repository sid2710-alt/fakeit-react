import {useEffect,useState} from 'react';
import {getPosts} from './api';
import {Home,Loader,Login,Error} from '../pages';
import Navbar  from './Navbar';
import { Routes,Route } from 'react-router-dom';
function App() {
 const[posts,setPosts]=useState([]); 
 const [loading,setLoading]=useState(true);
  
    useEffect( ()=>{
       const fetchPosts=async()=>{
         const response=await getPosts();
         console.log('response',response);
        if(response.success)
        {
          setPosts(response.data);
        }
        setLoading(false);
        }
        fetchPosts();
    },[]);
    if(loading)
    {
      return <Loader/>
    }
    return(
    <div className="App">
      <Navbar/>
      <Routes>
      
        <Route path='/' element={<Home posts={posts}/>}>
        </Route>
        <Route path="login" element={<Login/>}>
          </Route>
          <Route path="*" element={<Error/>}>
          </Route>
      </Routes>
      
    </div>
  );
}

export default App;
