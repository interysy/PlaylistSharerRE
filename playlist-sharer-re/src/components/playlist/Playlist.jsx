import React from 'react'
import PropTypes from 'prop-types' 
import './playlist.css'
 


const Playlist = ({name , id , image , description , owner , onChange , type , idx}) => { 
  return (
    <div className = "playlist_with_check">  
        <label class="selected_playlist">
          <input type="checkbox" id = {idx + type + id} onChange = {onChange}></input>
        </label> 
        <div className = "playlist">
          <img src={image} className = "image" alt="Playlist Image"/>
          <ul>  
              <li>HA {name}</li>
              <li>HA {description}</li> 
              <li> HA {owner}</li> 
          </ul>   
          </div>
    </div>
  )
}

Playlist.propTypes = { 
    name : PropTypes.string.isRequired, 
    id : PropTypes.string.isRequired, 
    image : PropTypes.string.isRequired,
    description : PropTypes.string, 
    owner : PropTypes.string.isRequired,
}

export default Playlist