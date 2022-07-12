import React from 'react'; 
import { connect } from 'react-redux';  
import './index.css'

import Nav from '../components/nav/Nav' 
import Header from '../components/header/Header'  
import Login from '../components/login/Login'
import Animation from '../components/animation/Animation' 
import Options from '../components/options/Options' 
import Description from '../components/description/Description' 
import ContactMe from '../components/contactme/ContactMe' 
import Privacy from '../components/privacy/Privacy' 
import Footer from '../components/footer/Footer'
 

class Index extends React.Component {
    constructor() {
        super();   
    }
 
    
      
    render() {
        return ( 
            <div>   
                <Nav/> 
                 
                <div class = "front">
                <Header />  
                {/* <Animation/>   */} 
                <Login /> 
                 
                { 
                 
                 (this.props.loggedInSpotify && this.props.loggedInYoutube) ? <Options/>: '' 
                  
                } 
                 
                </div>
                
                <Description/>  
                <ContactMe/>
                <Privacy/> 
                <Footer/>
            </div>
        );
    }
} 
  
const mapStateToProps = (state) => {  
    return { 
        loggedInSpotify : state.spotify_reducer.logged_in, 
        loggedInYoutube : state.youtube_reducer.logged_in 

    }

} 
 

export default connect(mapStateToProps , null)(Index);