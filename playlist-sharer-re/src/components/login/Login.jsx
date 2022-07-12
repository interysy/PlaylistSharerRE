import React from 'react' 
import './login.css' 
import Button from '../buttons/Button' 
import {useDispatch, useSelector} from 'react-redux' 
import {logoutSpotify} from '../../redux/actions/spotify_actions'; 
import {logoutYoutube} from '../../redux/actions/youtube_actions'; 
 
 
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
  console.log(spotify_logged_in); 
  console.log(youtube_logged_in)


  return (
    <div id = "logged_in">    
    <div class = "service"> 
      <div className = "first_row_service">
        <span>Spotify: </span>    
        <div className="contains_dot">
          <span className = "dot" style = {{ backgroundColor : (spotify_logged_in) ? "green" : "red"}}></span> 
        </div> 
      </div> 
      <Button className = "btn" text = {(spotify_logged_in) ? "Log Out" : "Log In"} onClick={(spotify_logged_in) ? function() {dispatch(logoutSpotify())} : showSpotifyForm} color = {(spotify_logged_in) ? "green" : "red"}/>
    </div> 
    <div class = "service"> 
      <div className='first_row_service'>
        <span>Youtube: </span>  
        <div className="contains_dot">
          <span className = "dot" style = {{ backgroundColor : (youtube_logged_in) ? "green" : "red"}}></span> 
        </div> 
      </div>
      <Button className = "btn" text = {(youtube_logged_in) ? "Log Out" : "Log In"} onClick={(youtube_logged_in) ? function() {dispatch(logoutYoutube())}: showYoutubeForm} color = {(youtube_logged_in) ? "green" : "red"}/>
    </div>
  </div> 
  )
}

export default Login;