import React from 'react' 
import './footer.css' 
import { VscGithub } from 'react-icons/vsc' 
import { Link } from 'react-router-dom'

const Footer = ({socials}) => {  
  return (
    <section id="footer"> 
     
     <Link className = "footer_heading" to = "/">PlaylistSharerRE</Link> 
        
      <ul className="footer_links" style = {{ display : (socials === null ? "flex" : socials) }}> 
        <li><a href = "#">Index</a></li> 
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
 
Footer.defaultProps = { 
  socials : null,
}

export default Footer