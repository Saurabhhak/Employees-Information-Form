import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import App from './App';
// import LoginForm from "./Logs";
// import SignUpForm from "./Signup";
// import Navbar from './Navbar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <App />
    {/* <Navbar/> */}
    {/* <Logs/>
    <SignUp/>  */}
    {/* // signup or login ko nav bar me karna h or navbar comonent bhi banana h  */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
