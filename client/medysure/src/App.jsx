import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />  // uh 
        <Route path='/register' element={<RegisterPage/>}/>


      </Routes>
    </Router>
  )
}
