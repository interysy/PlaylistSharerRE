import React from 'react' 
import './contactme.css' 
import {MdOutlineEmail} from 'react-icons/md'  
import {TbBrandDiscord} from 'react-icons/tb' 
import { useRef } from 'react'; 
import emailjs from '@emailjs/browser'; 

const ContactMe = () => { 
  const contactme_form = useRef();  

  const sendMessage = (event) => { 
    event.preventDefault();   
    emailjs.sendForm('playlistsharerre', 'template_hc2t88i', contactme_form.current, process.env.REACT_APP_EMAILJS_KEY)
      .then( () => {  
          addMessage("Sent Successfully , await my reply !");  
      }, (error) => {
          addMessage("Error with message of : " + error);  
          
      });
  }  
   
  function addMessage(msg) {    
    let elementToAddMessageTo = document.getElementsByClassName("contactme_form")[0];  
    let successMessageP = document.createElement("p");  
    let successMessageText = document.createTextNode(msg);
    successMessageP.appendChild(successMessageText);
    elementToAddMessageTo.appendChild(successMessageP); 

  }

  return (
    <section id="contactme" className = "section"> 
      <div className="contactme_heading"> 
        <h4>Want to reach out?</h4> 
        <h1>Contact Me</h1> 
      </div>  
      <div className = "grid">
        <div className = "contactme_alt_contact">  
          <article className="contact_option">  
                <MdOutlineEmail className = "contact_icon"/> 
                <h4>Email</h4> 
                <h5>2554268W@student.gla.ac.uk</h5> 
                <a href="mailto:2554268W@student.gla.ac.uk"> Send A Message</a>
            </article>   
            <article className="contact_option">  
              <TbBrandDiscord className = "contact_icon"/> 
              <h4>Discord</h4> 
              <h5>interysy#3412</h5>  
              <p> Contact Me By Filling The Form</p> 
              <small>*Message will be sent to my private Discord server via Webhooks</small>
            </article>  
      </div>  
      <div className = "contactme_form">  
        <form onSubmit = {sendMessage} ref = {contactme_form}> 
            <input id = 'name' type="text" name = "name" placeholder='Your Full Name' required /> 
            <input id = 'email' type="email" name = "email" placeholder = "Your Email" required /> 
            <textarea id = 'message' name  =  "message" type= 'message' rows = "7" placeholder = "Your Message" required></textarea> 
            <button type = "submit" className = "btn btn-primary">Send Message</button>  
          </form>
      </div> 
      </div>
     

    </section>
  )
}

export default ContactMe