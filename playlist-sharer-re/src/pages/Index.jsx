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
 
let mapStateToProps = (state) => {
    return {
      spotify : state.spotify_reducer.logged_in, 
      youtube : state.youtube_reducer.logged_in,
    };
  };  
   



class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>   
                <p>{this.props.spotify}</p> 
                <Nav/>
                <Header/>  
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

export default connect(mapStateToProps , null)(Home);