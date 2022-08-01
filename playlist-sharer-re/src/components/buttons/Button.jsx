import React from 'react' 
import PropTypes from 'prop-types' 
import './button.css'

const Button = ({text, onClick , active ,classes}) => {  
  let color;   
  if (active === null) { 
    color = "#b342f5"
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
    onClick: PropTypes.func, 
    classes : PropTypes.string,
} 

export default Button