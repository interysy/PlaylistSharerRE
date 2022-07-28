import React from 'react' 
import PropTypes from 'prop-types' 
import './button.css'

const Button = ({text, onClick , active ,classes}) => {  
  let color;   
  if (active === null) { 
    color = "#CAEBF2"
  } else {
    (active ? color = "#17b890": color = "#a85751");  
  }

  return ( 
    <a className = {classes} onClick = {onClick} style = {{ background : color }}> 
        {text} 
    </a>
  )
}   
 
Button.defaultProps = { 
  active : false
}
 
Button.propTypes = {
    text: PropTypes.string.isRequired,
    active: PropTypes.string,
    onClick: PropTypes.func.isRequired, 
    classes : PropTypes.string,
} 

export default Button