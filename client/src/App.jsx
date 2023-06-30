import "./App.css";
import {Route,Routes} from 'react-router-dom';
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import axios from 'axios';
import {UserContextProvider} from "./UserContext.jsx";
import AccountPage from "./pages/AccountPage";
import PlacePage from "./pages/PlacesPage";
import ProfileSetting from "./pages/ProfileSetting";

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials=true;


function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path = "/" element = {<Layout/>}>
        <Route index element = {<IndexPage/>}/>
        <Route path = "/login" element = {<LoginPage/>}/>
        <Route path = "/register" element = {<RegisterPage/>}/>
        <Route path='/account/:subpage?' element={<AccountPage/>}/>
        <Route path='/account/:subpage?/:action' element={<PlacePage/>}/>
        <Route path='/profileSetting' element={<ProfileSetting/>}/>
        
        </Route>
      </Routes>
    </UserContextProvider>
   
  );
}

export default App;