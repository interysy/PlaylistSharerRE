import React from 'react'  
import {useDispatch, useSelector} from 'react-redux' 
import {logoutSpotify} from '../../redux/actions/spotify_actions'; 
import {logoutYoutube} from '../../redux/actions/youtube_actions'; 
import './login_to_services.css' 
import Button from '../buttons/Button' 

 
 
let showSpotifyForm = () => {
    window.location.replace('http://localhost:3001/loginspotify');
  } 
  
let showYoutubeForm = () => { 
  window.location.replace('http://localhost:3001/logingoogle');
} 
  

  
const Login = () => {  
  let spotify_logged_in = useSelector((state) => state.spotify_reducer.logged_in); 
  let youtube_logged_in = useSelector((state) => state.youtube_reducer.logged_in);
  const dispatch = useDispatch(); 

  return ( 
    <div id = "login_to_services">  
      <div>  
        <div class = "music_service"> 
          <div className = "first_row_of_service">
            <span> Spotify: </span>    
            <div className="div_that_contains_dot">
              <span className = "dot" style = {{ backgroundColor : (spotify_logged_in) ? "#17b890" : "#a85751"}}></span> 
            </div> 
          </div> 
          <Button className = "btn" text = {(spotify_logged_in) ? "Log Out" : "Log In"} onClick={(spotify_logged_in) ? function() {dispatch(logoutSpotify())} : showSpotifyForm} active = { (spotify_logged_in) }/>
        </div> 
        <div class = "music_service"> 
          <div className='first_row_of_service'>
            <span>Youtube: </span>  
            <div className="div_that_contains_dot">
              <span className = "dot" style =  {{ backgroundColor : (youtube_logged_in) ? "#17b890" : "#a85751"}}></span> 
            </div> 
          </div>
          <Button className = "btn" text = {(youtube_logged_in) ? "Log Out" : "Log In"} onClick={(youtube_logged_in) ? function() {dispatch(logoutYoutube())}: showYoutubeForm} active = { (youtube_logged_in) }/>
        </div> 
    </div>
  </div> 
  )
}

export default Login;