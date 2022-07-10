import React from 'react'
import './App.css'; 
import Index from './pages/Index' 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
 
 

function App() {
    return ( 
        <Router>
          <Routes>
            <Route path='/' element={<Index/>} />
          </Routes>
        </Router>
    );
}

export default App;