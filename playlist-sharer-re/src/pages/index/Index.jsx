import React from 'react'; 
import { connect } from 'react-redux';  
import './index.css'
import Nav from '../../components/nav/Nav' 
import Header from '../../components/header/Header'  
import LoginToServices from '../../components/login_to_services/LoginToServices'
import Animation from '../../components/animation/Animation' 
import Options from '../../components/options/Options' 
import Description from '../../components/description/Description' 
import ContactMe from '../../components/contactme/ContactMe' 
import Privacy from '../../components/privacy/Privacy' 
import Footer from '../../components/footer/Footer'
 

class Index extends React.Component {
      
    render() {
        return ( 
            <div>   
                {/* <Nav/>  */}
                <div class = "screen_view">
                    <Header className = "header" />   
                    <div className = "login_area">
                        <LoginToServices />  
                        { 
                        (this.props.loggedInSpotify && this.props.loggedInYoutube) ? <Options/>: null 
                        }  
                    </div>
                    
                    <Animation className = "animation"/>
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