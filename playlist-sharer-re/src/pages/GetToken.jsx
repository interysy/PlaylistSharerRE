import React from 'react'; 
import { connect } from 'react-redux';  
import { bindActionCreators } from 'redux';
import { loginSpotify } from '../redux/actions/spotify_actions' 
import { loginYoutube } from '../redux/actions/youtube_actions' 
import { Link } from 'react-router-dom' 
import './gettoken.css' 
import Footer from '../components/footer/Footer'


class GetToken extends React.Component {
    constructor() {
        super();
    } 
     
    componentDidMount() {    
        let received = new URLSearchParams(window.location.search); 
        let success = received.get('success'); 
        let type = received.get('type'); 
        if (success) {  
            let token = received.get('access_token'); 
            (type  === 'spotify') ? this.props.loginSpotify(token,true) : this.props.loginYoutube(token , true);
        }
        
    } 
     

    render() { 
        return (
            <div id="get_token">   
                <h1>PlaylistSharerRe</h1>
                <Link to = "/"> Click Me To Return</Link>  
                <Footer/>
            </div>
        );
    }
} 
 
const mapStateToProps = (state) => {  
    return { 
        tokenSpotify : state.spotify_reducer.token, 
        tokenYoutube : state.youtube_reducer.token 

    }

} 
 
const mapDispatchToProps = (dispatch) => { 
    return { 
        loginSpotify : bindActionCreators(loginSpotify , dispatch),
        loginYoutube : bindActionCreators(loginYoutube , dispatch)
    } 

}

export default connect(mapStateToProps , mapDispatchToProps) (GetToken);