import React from 'react'
import Button from '../buttons/Button'  
import './options.css' 
import {Link} from 'react-router-dom'
  


const Options = () => {
  return (
    <section id="options">   
        <div className="btns">
        <Link to = "/transferplaylists"> <Button text = "Start Sharing !" classes = "btn" active = {null} /> </Link> 
        </div>
    </section>
  )
}

export default Options