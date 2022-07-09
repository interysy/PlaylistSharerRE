import React from 'react' 
import "./header.css"
 
const services = [{ 
  name: "spotify", 
  logged_in : "false"
}, 
{ 
  name : "youtube", 
  logged_in: "false"
}] 

const Header = () => {
  return ( 
    <header id = "header">  
      <div id = "title">
        <h1>PlaylistSharerRE</h1>  
        <small>Share , combine and synchronise your playlists!</small> 
      </div> 
      <div id = "logged_in">   
       
        {/* {services.forEach( (service) => { 
          <div className = "service">  
            <h3>{service.name}</h3> 
            <div>{service.logged_in}</div>
          </div>
        } ) 
        } */}

      </div>
    </header>
  )
}

export default Header