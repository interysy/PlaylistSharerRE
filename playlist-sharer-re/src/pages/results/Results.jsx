import React from 'react'; 
import { connect  } from 'react-redux';   
import { bindActionCreators } from 'redux'; 
import { transferToYoutubeAction } from '../../redux/actions/youtube_actions'   
import { transferToSpotifyAction } from '../../redux/actions/spotify_actions'
import Loader from '../../components/loader/Loader'

class Results extends React.Component {
    constructor(props) {
        super(props);   
        this.state = { 
            done : false,
        }  
    }  
     
    noPlaylistsToTransfer() { 
        return ( 
            <h1> No Playlists To Transfer </h1>
        )
    }
      
    componentDidUpdate(prevProps , prevState) {  
        if (this.props.completedTransferYoutube != prevProps.completedTransfer && prevState.done === false) { 
            this.setState({ 
                done : true,
            })
        }
    } 

    componentDidMount() { 
        if (this.props.loggedInSpotify === false || this.props.loggedInYoutube === false) { 
            window.location.replace('http://localhost:3001/error');
        } else if ( this.props.selectedPlaylistsSpotify.length === 0 && this.props.selectedPlaylistsYoutube.length === 0){ 
            this.noPlaylistsToTransfer();
        } else {   
            this.transferPlaylistsToYoutube(); 
            this.transferPlaylistsToSpotify();    
        }
    }  
     
    transferPlaylistsToYoutube() { 
        this.props.transferToYoutube([...this.props.selectedPlaylistsSpotify],this.props.accessTokenSpotify , this.props.accessTokenYoutube , this.props.apiKeyYoutube);
    } 
     
    transferPlaylistsToSpotify() { 
        this.props.transferToSpotify([...this.props.selectedPlaylistsYoutube] , this.props.accessTokenSpotify ,  this.props.accessTokenYoutube , this.props.apiKeyYoutube);
    }
    

    render() {
        return ( 
            <div>      
                {(this.state.done === true) ? <h1>Done</h1> : <Loader/>};
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

    }

} 
 
const mapDispatchToProps = (dispatch) => {   
  return {     
    transferToYoutube : bindActionCreators(transferToYoutubeAction , dispatch), 
    transferToSpotify : bindActionCreators(transferToSpotifyAction , dispatch),
  }

}
 

export default connect(mapStateToProps , mapDispatchToProps)(Results);