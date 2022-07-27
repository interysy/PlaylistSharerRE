import React from 'react'  
import {useDispatch, useSelector} from 'react-redux' 
import {logoutSpotifyAction} from '../../redux/actions/spotify_actions'; 
import {logoutYoutubeAction} from '../../redux/actions/youtube_actions'; 
import './login_to_services.css' 
import Button from '../buttons/Button' 

 
 
let showSpotifyForm = () => {
    window.location.replace('http://localhost:3001/loginspotify');
  } 
  
let showYoutubeForm = () => { 
  window.location.replace('http://localhost:3001/logingoogle');
} 
  

  
const Login = () => {  
  let loggedInSpotify = useSelector((state) => state.spotify_reducer.loggedIn); 
  let loggedInYoutube = useSelector((state) => state.youtube_reducer.loggedIn);
  const dispatch = useDispatch(); 

  return ( 
    <div id = "login_to_services">  
      <div>  
        <div class = "music_service"> 
          <div className = "first_row_of_service">
            <span> Spotify: </span>    
            <div className="div_that_contains_dot">
              <span className = "dot" style = {{ backgroundColor : (loggedInSpotify) ? "#17b890" : "#a85751"}}></span> 
            </div> 
          </div> 
          <Button className = "btn" text = {(loggedInSpotify) ? "Log Out" : "Log In"} onClick={(loggedInSpotify) ? function() {dispatch(logoutSpotifyAction())} : showSpotifyForm} active = { (loggedInSpotify) }/>
        </div> 
        <div class = "music_service"> 
          <div className='first_row_of_service'>
            <span>Youtube: </span>  
            <div className="div_that_contains_dot">
              <span className = "dot" style =  {{ backgroundColor : (loggedInYoutube) ? "#17b890" : "#a85751"}}></span> 
            </div> 
          </div>
          <Button className = "btn" text = {(loggedInYoutube) ? "Log Out" : "Log In"} onClick={(loggedInYoutube) ? function() {dispatch(logoutYoutubeAction())}: showYoutubeForm} active = { (loggedInYoutube) }/>
        </div> 
    </div>
  </div> 
  )
}

export default Login;