import React from 'react'
import PropTypes from 'prop-types' 
import './playlist.css' 
import DefaultPlaylistImage from '../../assets/defaults/no_image_default.jpg'
 


const Playlist = ({name , id , image , description , owner , onChange , type , idx}) => {   
  if (image === null) {  
    image = DefaultPlaylistImage;
  }   
   
  if (!description) { 
    description = "No description"
  }

  return (
    <div className = "playlist_with_check">  
        <label class="selected_playlist">
          <input type="checkbox" id = {name + "%" + type + "%" + id} onChange = {onChange}></input>
        </label> 
        <div className = "playlist">  
          <span className = "tooltip" > {description} </span> 
          <img src={image} className = "image"/>
          <ul>  
              <li>{name}</li>
              {/* <li>HA {description}</li>  */}
              <li> By :  {owner}</li> 
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