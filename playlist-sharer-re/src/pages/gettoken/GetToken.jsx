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
        let receivedAsParams = new URLSearchParams(window.location.search);     
        let receivedAsHash = window.location.hash; 
         
        if (receivedAsHash.length === 0) { 
            let success = receivedAsParams.get('success');  
            if (success) {  
                let token = receivedAsParams.get('access_token');  
                let api_key = receivedAsParams.get('api_key'); 
                this.props.loginYoutube(token, api_key , true);
            }

        } else {  
            receivedAsHash = receivedAsHash.replace("#",""); 
            receivedAsHash = receivedAsHash.split("&");   
            let token = receivedAsHash[0].split('=')[1];  
            let state = receivedAsHash[3].split('=')[1];
            if (state === this.props.authorisationStateSpotify) { 
                this.props.loginSpotify(token , true);
            }

        }   
        var time = 3000; 
        this.timeoutId = setTimeout(() => { 
            window.location.replace("http://localhost:3000/");
        },time)
          

    } 
      
    cancelTimeout() {  
        console.log("Clearing timeout");
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