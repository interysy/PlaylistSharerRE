import React from 'react' 
import Footer from '../../components/footer/Footer' 
import {useSelector} from 'react-redux'  
import './error.css'

const Error = () => {    
  return (
    <div id="error">   
      <h1>PlaylistSharerRe</h1> 
      <h3> There has been an error : </h3>  
      <li>
        <ul> {sessionStorage.getItem("errorSpotify")}</ul> 
        <ul> {sessionStorage.getItem("errorYoutube")}</ul>
      </li>
      <div className = "stick_to_bottom"> 
        <Footer socials = "none"/> 
      </div>
    </div>
  )
}

export default Error