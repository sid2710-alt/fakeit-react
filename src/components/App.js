import {useAuth} from '../hooks';
import {Home,Loader,Login,Error,Signup,Settings,UserProfile} from '../pages';
import Navbar  from './Navbar';
import { Routes,Route } from 'react-router-dom';
import {Navigate,Outlet} from 'react-router-dom'
function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login"/>;
  }

  return children;
}
function App() {
  const auth=useAuth();
  console.log('auth',auth);
    if(auth.loading)
    {
      return <Loader/>
    }
    return(
    <div className="App">
      <Navbar/>
      <Routes>
      
        <Route path="/" element={<Home/>}>
        </Route>
        <Route path="login" element={<Login/>}>
          </Route>
          <Route path="*" element={<Error/>}>
          </Route>
          <Route path="register" element={<Signup/>}>
          </Route>
          <Route path="/settings" element={<RequireAuth><Settings/></RequireAuth> }/>
          <Route path="/user/:userId" element={<RequireAuth><UserProfile/></RequireAuth> }/>
        
          
      </Routes>
      
    </div>
  );
}

export default App;
