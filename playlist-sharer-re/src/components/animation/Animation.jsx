import React from 'react' 
import './animation.css' 
import YoutubeLogo from '../../assets/logos/yt_logo_rgb_light.png'  
import SpotifyLogo from '../../assets/logos/Spotify_Logo_CMYK_Green.png'

const Animation = () => {
  return (
    <section id="animation"> 
        
      <div id="grid">
      <div class = "logo_container youtube">
        <img class = "img " src = {YoutubeLogo} alt = "Youtube Logo"></img>  
      </div>  

      <div class = "logo_container spotify">
        <img class = "img" src = {SpotifyLogo} alt = "Spotify Logo"></img> 
      </div> 
      </div>
    </section>
  )
}

export default Animation