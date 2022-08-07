import React from 'react'; 
import { connect  } from 'react-redux';   
import { bindActionCreators } from 'redux'; 
import { transferToYoutubeAction } from '../../redux/actions/youtube_actions'   
import { transferToSpotifyAction } from '../../redux/actions/spotify_actions'
import Loader from '../../components/loader/Loader' 
import Error from '../../components/error/Error'

class Results extends React.Component {
    constructor(props) {
        super(props);   
        this.state = { 
            done : false, 
            redirect : false,
        }  
    }  
     
    noPlaylistsToTransfer() { 
        return ( 
            <h1> No Playlists To Transfer </h1>
        )
    }
      
    componentDidUpdate(prevProps , prevState) {  
        if (this.props.completedTransferYoutube !== prevProps.completedTransfer && prevState.done === false) { 
            this.setState({ 
                done : true,
            })
        } 
         
        if ((prevProps.errorSpotify === "" || prevProps.errorYoutube === "") && (prevProps.errorSpotify !== this.props.errorSpotify || prevProps.errorYoutube !== this.props.errorYoutube)) {    
            this.setState({  
              ...this.state, 
              redirect : true,
            });
        }
    } 

    componentDidMount() { 
        if (this.props.loggedInSpotify === false || this.props.loggedInYoutube === false) { 
            // window.location.replace('http://localhost:3001/error'); 
            console.log("Return...");
        } else if ( this.props.selectedPlaylistsSpotify.length === 0 && this.props.selectedPlaylistsYoutube.length === 0){ 
            this.noPlaylistsToTransfer();
        } else {   
            this.transferPlaylistsToYoutube(); 
            //this.transferPlaylistsToSpotify();    
        }
    }  
     
    transferPlaylistsToYoutube() { 
        this.props.transferToYoutube([...this.props.selectedPlaylistsSpotify],this.props.accessTokenSpotify , this.props.accessTokenYoutube , this.props.apiKeyYoutube);
    } 
     
    transferPlaylistsToSpotify() { 
        this.props.transferToSpotify([...this.props.selectedPlaylistsYoutube] , this.props.accessTokenSpotify ,  this.props.accessTokenYoutube , this.props.apiKeyYoutube);
    }
     
    createPopUpForError() { 
        let elementToBlur = document.getElementById("blur");
        elementToBlur.style.filter = "blur(2px)";   
        return (<div><Error errorYoutube = {this.props.errorYoutube} errorSpotify = {this.props.errorSpotify} beforeRedirect = {this.beforeRedirectOnError} /></div>)
      } 
   

    render() {
        return ( 
            <div>      
                <div id = "blur">     
                    <h1>Done</h1>  
                    {/* {( !this.state.loading && this.state.spotifyPlaylists.length > 0) ? this.finishedLoading() : this.loading()}    */}
                </div>   
                { (this.state.redirect) ?  this.createPopUpForError() : null}  
            </div>
        );
    } 
  } 
  
 
const mapStateToProps = (state) => {  
    return {  
        accessTokenSpotify : state.spotify_reducer.token, 
        accessTokenYoutube : state.youtube_reducer.token,  
        apiKeyYoutube : state.youtube_reducer.apiKey,  
        loggedInSpotify : state.spotify_reducer.loggedIn,
        loggedInYoutube : state.youtube_reducer.loggedIn,
        selectedPlaylistsSpotify : state.spotify_reducer.selectedPlaylists || Set(), 
        selectedPlaylistsYoutube : state.youtube_reducer.selectedPlaylists || Set(),   
        completedTransferYoutube : state.youtube_reducer.completedTransfer, 
        errorSpotify : state.spotify_reducer.error, 
        errorYoutube : state.youtube_reducer.error,

    }

} 
 
const mapDispatchToProps = (dispatch) => {   
  return {     
    transferToYoutube : bindActionCreators(transferToYoutubeAction , dispatch), 
    transferToSpotify : bindActionCreators(transferToSpotifyAction , dispatch),
  }

}
 

export default connect(mapStateToProps , mapDispatchToProps)(Results);