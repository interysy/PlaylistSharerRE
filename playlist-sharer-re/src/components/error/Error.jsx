import React from 'react' 
import './error.css' 
import Button from '../buttons/Button' 
import { Link } from 'react-router-dom'

const error = ({errorYoutube , errorSpotify , beforeRedirect , localRefresh}) => { 
  return ( 
    <div id="error">   
      <h1>PlaylistSharerRe</h1> 
      <h3> There has been an error : </h3>  
      <li>
        <ul> <b>Spotify</b> : {(errorSpotify !== "") ? errorSpotify : "No error , retrieved successfully" } </ul> 
        <ul> <b>Youtube</b> : {(errorYoutube !== "") ? errorYoutube : "No error , retrieved successfully" }</ul>
      </li>  
      <div class = "rectify_btns">
        <Link to = "/"> <Button text = "Return To Home Page and Try Again In A Few Minutes" classes = "btn" onClick = {beforeRedirect}/> </Link>  
        <Button text = "Try Refreshing?" classes = "btn" onClick = {localRefresh}/> 
      </div>
    </div>
  )
}

export default error