import React from 'react'; 
import { connect } from 'react-redux'; 

import Nav from '../components/nav/Nav' 
import Header from '../components/header/Header' 
import Animation from '../components/animation/Animation' 
import Options from '../components/options/Options' 
import Description from '../components/description/Description' 
import ContactMe from '../components/contactme/ContactMe' 
import Privacy from '../components/privacy/Privacy' 
import Footer from '../components/footer/Footer'
 

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return ( 
            <div>   
                <Nav/>
                <Header colorSpotify = {(this.props.loggedInSpotify) ? 'green' : 'red'} colorYoutube = {(this.props.loggedInYoutube) ? 'green' : 'red'}/>  
                <Animation/>  
                <Options/>
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
 

export default connect(mapStateToProps , null)(Home);