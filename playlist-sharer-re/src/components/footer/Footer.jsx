import React from 'react' 
import './footer.css' 
import { VscGithub } from 'react-icons/vsc'

const Footer = () => {
  return (
    <section id="footer"> 
     
      <a href=" " className="footer_heading">PlaylistSharerRE</a> 
        
      <ul className="footer_links"> 
        <li><a>Index</a></li> 
        <li><a href="#description">Description</a></li> 
        <li><a href="#contactme">Contact Me</a></li> 
        <li><a href="#privacy">Privacy Policy</a></li> 
      </ul>
  
      <div className="footer_socials"> 
        <a href="https://github.com/interysy"> <VscGithub/> GitHub</a> 
      </div> 
      
      <div className="footer_copyright"> 
        <small>&copy; interysy</small> 
        </div>
    
    </section>
  )
}

export default Footer