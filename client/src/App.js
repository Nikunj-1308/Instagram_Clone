import React, {useEffect, createContext, useReducer, useContext} from 'react';
import Navbar from './components/Navbar'
import "./App.css"
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import UserProfile from './components/screens/UserProfile'
import CreatePost from './components/screens/CreatePost'
import SubscribedUserPosts from './components/screens/SubscribedUserPosts'
import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
    }
    else{
      navigate('/signin')
    }
  },[])
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/myfollowingspost" element={<SubscribedUserPosts />} />
    </Routes>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
