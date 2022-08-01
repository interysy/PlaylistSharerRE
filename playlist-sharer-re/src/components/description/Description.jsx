import React from 'react' 
import './description.css' 
import Animation from '../../components/animation/Animation'  
import CombinedLogos from '../../assets/logos/combined_logos_2.png'

const Description = () => {
  return (
    <section id="description" className = "section"> 
    <div className="description_heading"> 
      <h4>Get To Know</h4> 
      <h1>Description</h1> 
    </div>  
    <div className = "description_content"> 
      <div className="images left animate">  
        <img className = "img" src = {CombinedLogos} alt = "Combined Logos"></img>  
      </div> 
      <div className="animate right">  
      <h3> This React project has been made in order to make it easy to transfer playlists from your Spotify to Youtube , I hope it will be of use! Currently Spotify to Youtube is supported and I am soon to be finishing up the transfer in the other direction</h3>  
      <div className="align_left">
        <h4> Follow the steps below to get sharing ... </h4> 
        <ol>  
          <li> Firstly log into your Spotify and Youtube accounts !</li> 
          <li> Once done, click on the 'Start Sharing' button.</li> 
          <li> On the left you will see a set of your Spotify playlists, select all to transfer to Youtube.</li> 
          <li> On the right you will see a set of your Youtube playlists, select all that you want on your Spotify account.</li> 
          <li> Click the "Transfer Selected Button" and await the results :)</li> 
        </ol>  
        <h4>*Feel free to close the app after, the accounts will log out themselves once browser session is closed.</h4>
      </div>
      </div>
    </div>
    </section>
  )
}

export default Description