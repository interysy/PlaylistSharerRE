import React from 'react' 
import PropTypes from 'prop-types'

const Button = ({text , color , onClick}) => { 
  return (
    <a className = "btn" onClick = {onClick} style = {{ color : {color}}}> 
        {text} 
    </a>
  )
} 
  
Button.defaultProps = { 
    color : "red" 
}

  
Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
} 

export default Button