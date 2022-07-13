import React from 'react'
import PropTypes from 'prop-types' 
import default_image from '../../assets/cynthia.jpg'

const Playlist = ({name , id , image , description , owner}) => {
  return (
    <div className = "playlist"> 
        <title>{name}</title> 
        <img src = {(image !== null) ? image : default_image} alt = "Playlist Image"> </img> 
        <ul> 
            <li>{description}</li> 
            <li>{owner}</li> 
        </ul>
    </div>
  )
}
 
Playlist.defaultProps = { 
    image : default_image, 
    description : '',
} 

Playlist.propTypes = { 
    name : PropTypes.string.isRequired, 
    id : PropTypes.string.isRequired, 
    image : PropTypes.string,
    description : PropTypes.string, 
    owner : PropTypes.string.isRequired,
}

export default Playlist