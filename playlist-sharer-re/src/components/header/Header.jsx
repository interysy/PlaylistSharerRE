import React from 'react' 
import "./header.css"
import Button from '../buttons/Button' 
import {GoPrimitiveDot} from 'react-icons/go' 
import {useSelector , useDispatch } from 'react-redux';  


 
let showSpotifyForm = () => {
  window.location.replace('http://localhost:3001/loginspotify');
} 

let showYoutubeForm = () => { 
  window.location.replace('http://localhost:3001/logingoogle');
}
 
 
// const logged_into_spotify = useSelector(state => state.spotify_reducer); 
// const logged_into_youtube = useSelector(state => state.youtube_reducer);  
// const dispatch = useDispatch(); 
// console.log(logged_into_spotify); 
// console.log(logged_into_youtube); 

const Header = () => {
  return ( 
    <header id = "header">   
      <div id = "logged_in">    
        <div class = "service">
          <span>Spotify: </span>  
          <GoPrimitiveDot className = "dot"/>
          <Button text = "Log in" onClick={showSpotifyForm}/>
        </div> 
        <div class = "service">
          <span>Youtube: </span> 
          <GoPrimitiveDot className = "dot"/>
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