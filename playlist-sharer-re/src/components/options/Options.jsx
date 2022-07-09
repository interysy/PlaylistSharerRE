import React from 'react'
import Button from '../buttons/Button'  
import './options.css'
  
let test = function() { 
    window.location.replace("http://localhost:3000/loginspotify");
} 

const Options = () => {
  return (
    <section id="options">   
        <small> So what would you like to do ? </small> 
        <div className="btns">
          <Button color  = "#305973" text = "Share" onClick = {test} /> 
          <Button color  = "#305973" text = "Combine" onClick = {test}/> 
          <Button color  = "#305973" text = "Synchronise" onClick = {test}/> 
        </div>
    </section>
  )
}

export default Options