import React from 'react' 
import PropTypes from 'prop-types' 
import './button.css'

const Button = ({text , color , onClick}) => { 
  return (
    <a className = "btn" onClick = {onClick} style = {{ background : color}}> 
        {text} 
    </a>
  )
} 
  
Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
} 

export default Button