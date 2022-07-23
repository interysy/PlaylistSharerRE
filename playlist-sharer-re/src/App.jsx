import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import './App.css'; 
import Index from './pages/index/Index'  
import GetToken from './pages/GetToken' 
import TransferPlaylists from './pages/TransferPlaylists' 
import Results from './pages/Results' 
import Error from './pages/error/Error'
 
 

function App() {
    return ( 
        <Router>
          <Routes>
            <Route path='/' element={<Index/>} /> 
            <Route path = '/gettoken' element={<GetToken/>}/> 
            <Route path = '/transferplaylists' element = {<TransferPlaylists/>}/> 
            <Route path = '/results' element = {<Results/>}/> 
            <Route path = '/error' element = {<Error/>}/>
          </Routes>
        </Router>
    );
}

export default App;