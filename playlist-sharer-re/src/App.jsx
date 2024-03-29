import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 

import Index from './pages/index/Index'  
import GetToken from './pages/gettoken/GetToken' 
import TransferPlaylists from './pages/transferplaylists/TransferPlaylists' 
import Results from './pages/results/Results' 
 
import './App.css'; 

function App() {
    return ( 
        <Router>
          <Routes>
            <Route path='/' element={<Index/>} /> 
            <Route path = '/gettoken' element={<GetToken/>}/> 
            <Route path = '/transferplaylists' element = {<TransferPlaylists/>}/> 
            <Route path = '/results' element = {<Results/>}/> 
          </Routes>
        </Router>
    );
}

export default App;