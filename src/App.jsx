import { useDispatch } from "react-redux";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
// import { Link, NavLink, Route, Routes } from "react-router-dom"
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { useEffect } from "react";
import { loadUserAsync } from "./Redux/Slices/userSlice";

function App() {

 const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUserAsync())
  }, [])
  

  return (
    <>
      <Router>
      <Routes>
  
        <Route exact path="/" element = {<Login />} />
        <Route exact path="/register" element = {<SignUp />} />
        <Route path="/dashboard" element = { <Dashboard />} />
    
      </Routes >
    </Router>
    </>
  );
}

export default App;
