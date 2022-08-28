<h1 align = "center" > PlaylistSharerRE </h1>  
  
<br> 
<p> This project I have built over the a couple weeks during my summer break to learn React and the OAuth flow, eventually it became a web application, which allows tranferring of playlists from Spotify to Youtube and vice versa using their respective APIs. At this moment the applicaiton is limited to test accounts, until verification from related services. 
 
   
## So What Is It Made Using? 
<br>
The application was originally planned to be a desktop application to be built using ElectronJS, however it was bought to life using React, Javascript, Redux and implicit grant flows from Spotify Web API and Youtube API.  I have also used EmailJS to allow emails to be sent to myself.
   
## How to Setup PlaylistSharerRE for your use?  
<br>
If you have a test account for both Spotify and Youtube , which has been verified by me, simply head over to https://playlistsharerre.netlify.app/, site which is ready to use.  

<br>  
<details>
<summary>Otherwise follow these steps:</summary>
<br>
 <ol> 
   <li> Download or fork the repo </li> 
   <li> Log into <a href = "https://developer.spotify.com/dashboard/">Spotify Developer Dashboard </a> using your account and create a new app with the following redirect URIs : 
      <ul>  
        <li> http://localhost:3000/gettoken </li>
      </ul>   
    </li> 
    <li> Log into <a href = "https://accounts.google.com/ServiceLogin/signinchooser?service=cloudconsole&passive=1209600&osid=1&continue=https%3A%2F%2Fconsole.cloud.google.com%2Fapis%2Fdashboard&followup=https%3A%2F%2Fconsole.cloud.google.com%2Fapis%2Fdashboard&flowName=GlifWebSignIn&flowEntry=ServiceLogin"> Google Developer Console </a> and create a new project with an OAuth Client Consent Screen and OAuth Client ID for a web application configured with these redirect URIs:  
    <ul>  
      <li> http://localhost:3000/gettoken </li> 
    </ul> 
    </li> 
    <li> Create an env file in the root of the project and add: 
       <ul> 
         <li> REACT_APP_SPOTIFY_CLIENT_ID = <em>client id from the app created in the dashboard</em></li>
         <li> REACT_APP_SITE_LINK = http://localhost:3000 </li>  
         <li> REACT_APP_YOUTUBE_CLIENT_ID = <em>client id from the app created in the google dashboard</em> </li>
      </ul> 
     </li>
   <li> Add code to load the enviroment variables (using dotenv)</li> 
   <li> Run app by the 'npm run' command </li> 
   </ol> 
   * to make EmailJS work you will need to configure your own account, template and set the REACT_APP_EMAILJS_KEY variable.
<br><br>
</details>
    
## Snippets  
 
#### Index Page (Login here, once fulfilled button allowing continuation will appear)  
![Screenshot 2022-08-28 at 20 41 17](https://user-images.githubusercontent.com/86715742/187091652-efb9bd4a-216f-4cca-bccb-ade7d2b989a1.png)

#### Transfer Playlists 
![Screenshot 2022-08-28 at 20 38 19](https://user-images.githubusercontent.com/86715742/187091555-5fb52b75-87f4-4f8d-8b19-d027fe129e49.png) 
 
#### Final Report   

![Screenshot 2022-08-28 at 20 40 57](https://user-images.githubusercontent.com/86715742/187091641-f1596bd4-8f9a-4e20-9adb-1ee8808f9b26.png)


## Notes  
<br>
Although the application is quite accurate when transferring to Youtube, it can be hit or miss when undertaking the transfer in the other direction, I am currently working to improve this by using Selenium to improve the search query after content generation on the Youtube page.  
 
## Credits  
<br> 
Credits to <a href = "https://github.com/ueabu" >@ueabu</a>, for helping me to get started with his video series on his own similar project and code snippets for getting data from the Spotify Web API.
 
  
  
