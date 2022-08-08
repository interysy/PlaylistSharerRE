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
      
    constructor() {  
        super();
        this.timeoutId = 0;  
        this.cancelTimeout = this.cancelTimeout.bind(this);
    } 

    componentDidMount() {    
        let receivedAsHash = window.location.hash;  
        receivedAsHash = receivedAsHash.replace("#" , ""); 
        receivedAsHash = receivedAsHash.split("&"); 
        if (receivedAsHash.length === 4) { 
            let token = receivedAsHash[0].split('=')[1];  
            let state = receivedAsHash[3].split('=')[1];
            if (state === this.props.authorisationStateSpotify) { 
                this.props.loginSpotify(token , true);
            }
        } else if (receivedAsHash.length === 5) {  
            let token = receivedAsHash[1].split('=')[1]
            let state = receivedAsHash[0].split('=')[1]; 
            if (state === this.props.authorisationStateYoutube) {  
                this.props.loginYoutube(token);
            }
        } else { 
            window.location.replace("http://localhost:3000/");
        }
        let time = 3000; 
        this.timeoutId = setTimeout(() => { 
            window.location.replace("http://localhost:3000/");
        },time)
          

    } 
      
    cancelTimeout() {  
        clearTimeout(this.timeoutId);
    }
    render() { 
        return (
            <div id="get_token">   
                <h1>PlaylistSharerRe</h1>
                <Link to = "/"> <Button text = "Click Here To Return" classes = "btn" onClick = {this.cancelTimeout} /></Link>   
                <p className = "redirect_p" > You will be redirected soon, if not click the button above.</p>
                <div className = "stick_to_bottom"> 
                    <Footer socials = "none"/> 
                </div>
            </div>
        );
    }
} 
 
const mapStateToProps = (state) => {  
    return {  
        authorisationStateSpotify: state.spotify_reducer.authorisationState, 
        authorisationStateYoutube : state.youtube_reducer.authorisationStateYoutube,
        tokenSpotify : state.spotify_reducer.token, 
        tokenYoutube : state.youtube_reducer.token,

    }

} 
 
const mapDispatchToProps = (dispatch) => { 
    return { 
        loginSpotify : bindActionCreators(loginSpotifyAction , dispatch),
        loginYoutube : bindActionCreators(loginYoutubeAction , dispatch)
    } 

}

export default connect(mapStateToProps , mapDispatchToProps) (GetToken);