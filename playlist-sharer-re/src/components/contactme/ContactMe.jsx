import React from 'react' 
import './contactme.css' 
import {MdOutlineEmail} from 'react-icons/md'  
import {TbBrandDiscord} from 'react-icons/tb' 
 
let messageMe = function(event) { 
  event.preventDefault(); 
  let name = event.target[0].value; 
  let email = event.target[1].value; 
  let message = event.target[2].value;  


  let webhookOptions = {
    embeds: [{
      title: 'A New Message In PlaylistSharerRE',
      fields: [ 
        { name : 'Name' , value : name },
        { name: "Sender's Email", value: email },
        { name: 'Message', value: message }, 
      ]
    }],
  };  
   
  const webhookUrl = 'https://discord.com/api/webhooks/999824629113827448/hL2EJgX3uN9mmEDOMr5Ninvt8W7NEWfYWSP3YQRzkLaFAcOqnNmHdOrWrNGCGMffAB3i'; 
   
  let response = fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(webhookOptions),
  }).then( (response) => { 
    if (response.ok) { 
      console.log("Form submitted");
    }
  }).catch((error) => console.log(error));
  
}
const ContactMe = () => {
  return (
    <section id="contactme"> 
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
        <form onSubmit = {messageMe}> 
            <input id = 'name' type="text" name = "name" placeholder='Your Full Name' required /> 
            <input id = 'email' type="email" name = "email" placeholder = "Your Email" required /> 
            <textarea id = 'message' type= 'message' rows = "7" placeholder = "Your Message" required></textarea> 
            <button type = "submit" className = "btn btn-primary">Send Message</button>  
          </form>
      </div> 
      </div>
     

    </section>
  )
}

export default ContactMe