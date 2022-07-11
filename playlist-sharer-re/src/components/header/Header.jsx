import React from 'react' 
import "./header.css"
import Button from '../buttons/Button' 
import {GoPrimitiveDot} from 'react-icons/go'  


 
let showSpotifyForm = () => {
  window.location.replace('http://localhost:3001/loginspotify');
} 

let showYoutubeForm = () => { 
  window.location.replace('http://localhost:3001/logingoogle');
}
 


const Header = ( {colorSpotify ,  colorYoutube} ) => { 
  return ( 
    <header id = "header">   
      <div id = "logged_in">    
        <div class = "service">
          <span>Spotify: </span>    
          <div className="contains_dot">
            <span className = "dot" style = {{ backgroundColor : colorSpotify}}></span> 
          </div>
          <Button text = "Log in" onClick={showSpotifyForm}/>
        </div> 
        <div class = "service">
          <span>Youtube: </span>  
          <div className="contains_dot">
            <span className = "dot" style = {{ backgroundColor : colorYoutube}}></span> 
          </div>
          <Button text = "Log in" onClick={showYoutubeForm}/>
        </div>
      </div> 

      <div id = "title">
        <h1>PlaylistSharerRE</h1>  
        <small>Share , combine and synchronise your playlists!</small> 
      </div> 
    </header>
  )
}

export default Header