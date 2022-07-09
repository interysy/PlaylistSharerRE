import React from 'react' 
import './nav.css' 
// import {AiOutlineHome , AiOutlineUser} from 'react-icons/ai'  
// import {BiBook, BiMessageSquareDetail} from 'react-icons/bi' 
// import {RiServiceLine} from 'react-icons/ri'  
import {GiMusicalNotes} from 'react-icons/gi' 
import {CgOptions} from 'react-icons/cg' 
import {IoMdInformation} from 'react-icons/io' 
import {GrContactInfo} from 'react-icons/gr' 
import {MdOutlinePrivacyTip} from 'react-icons/md'
import {useState} from 'react'  



const Nav = ( 
) => { 
  const [activeNav , setActiveNav] = useState("#");
  return (
    <nav> 
      <a href = "#" onClick = {() => setActiveNav('#')}  className={activeNav === '#' ? 'active' : ''} ><GiMusicalNotes/></a> 
      <a href="#options" onClick = {() => setActiveNav('#options')} className={activeNav === '#about' ? 'active' : ''}><CgOptions/></a> 
      <a href="#description" onClick = {() => setActiveNav('#description')} className={activeNav === '#experiance' ? 'active' : ''}><IoMdInformation/></a> 
      <a href="#contactme" onClick = {() => setActiveNav('#contactme')} className={activeNav === '#services' ? 'active' : ''} ><GrContactInfo/></a> 
      <a href="#privacy" onClick = {() => setActiveNav('#privacy')} className={activeNav === '#contact' ? 'active' : ''}><MdOutlinePrivacyTip/></a>
    </nav>
  )
}

export default Nav