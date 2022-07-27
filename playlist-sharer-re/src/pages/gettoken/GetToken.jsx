import React from 'react'; 
import { connect } from 'react-redux';  
import { bindActionCreators } from 'redux';
import { loginSpotifyAction } from '../../redux/actions/spotify_actions' 
import { loginYoutubeAction } from '../../redux/actions/youtube_actions' 
import { Link } from 'react-router-dom' 
import './gettoken.css' 
import Footer from '../../components/footer/Footer' 
import Button from '../../components/buttons/Button'


class GetToken extends React.Component {
     
    componentDidMount() {    
        let received = new URLSearchParams(window.location.search); 
        let success = received.get('success'); 
        let type = received.get('type');  
        if (success) {  
            let token = received.get('access_token');  
            if (type === 'spotify') {  
                this.props.loginSpotify(token , true);
            } else if (type === 'youtube') {  
                let api_key = received.get('api_key'); 
                this.props.loginYoutube(token, api_key , true);
            }
        }
    } 
     
    render() { 
        return (
            <div id="get_token">   
                <h1>PlaylistSharerRe</h1>
                <Link to = "/"> <Button text = "Click Here To Return"/></Link>  
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
        loginSpotify : bindActionCreators(loginSpotifyAction , dispatch),
        loginYoutube : bindActionCreators(loginYoutubeAction , dispatch)
    } 

}

export default connect(mapStateToProps , mapDispatchToProps) (GetToken);