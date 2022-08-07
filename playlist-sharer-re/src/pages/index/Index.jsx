import React from 'react'; 
import { connect } from 'react-redux';  

import Header from '../../components/header/Header'  
import LoginToServices from '../../components/login_to_services/LoginToServices'
import Options from '../../components/options/Options' 
import Description from '../../components/description/Description' 
import ContactMe from '../../components/contactme/ContactMe' 
import Privacy from '../../components/privacy/Privacy' 
import Footer from '../../components/footer/Footer' 
 
import './index.css'
 

class Index extends React.Component {
     
    
    render() { 
        return ( 
            <div>    
                <div className = "screen_view">
                    <Header className = "header" />   
                    <div className = "login_area">
                        <LoginToServices />  
                        { 
                        (this.props.loggedInSpotify && this.props.loggedInYoutube) ? <Options/>: null 
                        }  
                    </div>
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
        loggedInSpotify : state.spotify_reducer.loggedIn, 
        loggedInYoutube : state.youtube_reducer.loggedIn 

    }

} 
 

export default connect(mapStateToProps , null)(Index);