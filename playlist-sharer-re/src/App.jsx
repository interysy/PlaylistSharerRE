import React from 'react'
import './App.css'; 
import Index from './pages/Index'  
import GetToken from './pages/GetToken' 
import TransferPlaylists from './pages/TransferPlaylists'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
 
 

function App() {
    return ( 
        <Router>
          <Routes>
            <Route path='/' element={<Index/>} /> 
            <Route path = '/gettoken' element={<GetToken/>}/> 
            <Route path = '/transferplaylists' element = {<TransferPlaylists/>}/>
          </Routes>
        </Router>
    );
}

export default App;