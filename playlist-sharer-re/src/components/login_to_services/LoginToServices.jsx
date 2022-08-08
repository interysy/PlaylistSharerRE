import React from 'react'  
import {useDispatch, useSelector} from 'react-redux' 
import {logoutSpotifyAction , updateAuthorisationStateAction} from '../../redux/actions/spotify_actions'; 
import {logoutYoutubeAction , updateAuthorisationStateYoutubeAction} from '../../redux/actions/youtube_actions'; 
import './login_to_services.css' 
import Button from '../buttons/Button' 

import { getAuthorisationPageLinkImplicitGrant } from '../../spotify/spotify_funcs'  
import { initiateImplicitGrantFlow } from '../../youtube/youtube_funcs';
  

let showSpotifyForm = (dispatch) => {
    let result = getAuthorisationPageLinkImplicitGrant();  
    let link = result[0];  
    let state = result[1]; 
    dispatch(updateAuthorisationStateAction(state));
    window.location.replace(link);
  } 
  
let showYoutubeForm = (dispatch) => { 
  // window.location.replace('http://localhost:3001/logingoogle'); 
  let result = initiateImplicitGrantFlow(); 
  let link = result[0];  
  let state = result[1];  
  dispatch(updateAuthorisationStateYoutubeAction(state));
  window.location.replace(link);
} 
   

  
const Login = () => {  
  let loggedInSpotify = useSelector((state) => state.spotify_reducer.loggedIn);  
  let loggedInYoutube = useSelector((state) => state.youtube_reducer.loggedIn);
  const dispatch = useDispatch(); 

  return ( 
    <div id = "login_to_services">  
      <div>  
        <div className = "music_service"> 
          <div className = "first_row_of_service">
            <span> Spotify: </span>    
            <div className="div_that_contains_dot">
              <span className = "dot" style = {{ backgroundColor : (loggedInSpotify) ? "#17b890" : "#a85751"}}></span> 
            </div> 
          </div> 
          <Button className = "btn" text = {(loggedInSpotify) ? "Log Out" : "Log In"} onClick={(loggedInSpotify) ? function() {dispatch(logoutSpotifyAction())} : () => showSpotifyForm(dispatch)} active = { (loggedInSpotify) } classes = "btn"/>
        </div> 
        <div className = "music_service"> 
          <div className='first_row_of_service'>
            <span>Youtube: </span>  
            <div className="div_that_contains_dot">
              <span className = "dot" style =  {{ backgroundColor : (loggedInYoutube) ? "#17b890" : "#a85751"}}></span> 
            </div> 
          </div>
          <Button className = "btn" text = {(loggedInYoutube) ? "Log Out" : "Log In"} onClick={(loggedInYoutube) ? function() {dispatch(logoutYoutubeAction())}: () => showYoutubeForm(dispatch) } active = { (loggedInYoutube) } classes = "btn"/>
        </div> 
    </div>
  </div> 
  )
}

export default Login;