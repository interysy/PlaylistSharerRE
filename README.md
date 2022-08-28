<h1 align = "center" > PlaylistSharerRE </h1>  
  
<br> 
<p> This project I have built over the a couple weeks during my summer break to learn React and OAuth, eventually it became a web application, which allows tranferring of playlists from Spotify to Youtube and vice versa using their respective APIs. At this moment the applicaiton is limited to test accounts, until verification from related services. 
 
   
## So How? 
  
The application was originally planned to be a desktop application to be built using ElectronJS, however it was bought to life using React, Javascript, Redux and implicit grant flows from Spotify Web API and Youtube API.   
   
## How to Use? 
If you have a test account for both Spotify and Youtube , which has been verified by me, simply head over to https://playlistsharerre.netlify.app/. 
  
<details>
<summary>Otherwise follow these steps:</summary>
<br>
 <ol> 
   <li> Download or fork the repo </li> 
   <li> Create an app on <a href = "https://developer.spotify.com/dashboard/">Spotify Developer Dashboard </a> and add the following redirect URIs: 
    <ul>  
      <li> http://localhost:3000/authenticatespotify </li> 
      <li> http://localhost:3000/loginspotify </li> 
      <li> http://localhost:3000/gettoken </li>
    </ul>    
    <li> Create an env file in the root of the project and add: 
       <ul> 
         <li> REACT_APP_SPOTIFY_CLIENT_ID = *client id from the app created in the dashboard* </li>
         <li> REACT_APP_SITE_LINK = http://localhost:3000 </li> 
      </ul>
    <li> Create a project on the <a href = "https://accounts.google.com/ServiceLogin/signinchooser?service=cloudconsole&passive=1209600&osid=1&continue=https%3A%2F%2Fconsole.cloud.google.com%2Fapis%2Fdashboard&followup=https%3A%2F%2Fconsole.cloud.google.com%2Fapis%2Fdashboard&flowName=GlifWebSignIn&flowEntry=ServiceLogin"> Google Developer Console </a> , aswell as an OAuth </li> 
      <li> Add this to the env file:
        <ul> 
         <li> REACT_APP_YOUTUBE_CLIENT_ID = *client id from the app created in the google dashboard* </li>
      </ul>
     
   </li>
<br><br>
</details>
   
