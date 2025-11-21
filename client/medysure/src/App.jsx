import React from 'react'
import { Button } from "@/components/ui/button"
import ThemeToggle from './components/Theme/theme-toggle'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
function App() {
  return (
    <> 
{/*     
    <h1 className="text-3xl font-bold">Shadcn UI Test</h1>
         <ThemeToggle/>
      <Button>Default Button</Button>

      <Button variant="destructive">
        Delete
      </Button>

      <Button variant="outline">
        Outline
      </Button> */}

      <Router>
       <Routes>
         <Route path='/' element={<LoginPage/>}/>
         <Route path='/register' element={<RegisterPage/>} />
       </Routes>
      </Router>
    </>
  )
}

export default App