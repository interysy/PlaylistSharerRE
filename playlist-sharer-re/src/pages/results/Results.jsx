import React from 'react'; 
import { connect  } from 'react-redux';   
import { bindActionCreators } from 'redux'; 
import { transferToYoutubeAction } from '../../redux/actions/youtube_actions'   
import { transferToSpotifyAction } from '../../redux/actions/spotify_actions'
import Loader from '../../components/loader/Loader' 
import Error from '../../components/error/Error'  
import Footer from '../../components/footer/Footer'
import './results.css' 
import YoutubeLogo from '../../assets/logos/yt_logo_rgb_light.png'  
import SpotifyLogo from '../../assets/logos/Spotify_Logo_CMYK_Green.png' 

class Results extends React.Component {
    constructor(props) {
        super(props);   
        this.state = { 
            done : false, 
            redirect : false,
        }  
         
        this.finishedLoading = this.finishedLoading.bind(this); 
    }  
     
    noPlaylistsToTransfer() { 
        return ( 
            <h1> No Playlists To Transfer </h1>
        )
    }
      
    componentDidUpdate(prevProps , prevState) {  
        if ((this.props.completedTransferYoutube !== prevProps.completedTransfer && this.props.completedTransferSpotify  !== prevProps.completedTransferSpotify) && prevState.done === false) { 
            this.setState({ 
                done : true,
            }); 
            console.log(this.props.failedSongsYoutube); 
            console.log(this.props.failedSongsSpotify);
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
            this.transferPlaylistsToSpotify();    
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
   
    finishedLoading() {  
        return ( 
            <div id = "done_page">   
                <h1>PlaylistSharerRe</h1>
                <h3> Songs That Failed To Transfer : </h3> 
                <h4> To Youtube </h4 >
                <div class = "service_playlists_result"> 
                    {this.props.failedSongsYoutube.map( (playlist) =>{  
                    return (  
                        <div class = "failed_songs">
                            <h1>{playlist.name}</h1>   
                            <ol>
                            {playlist.failed.map( (failedSong) => { 
                                return (<li>{failedSong}</li>)
                            })}  
                            </ol>
                        </div> 
                    ) 
                    } ) }  
                </div>  
                <h4> To Spotify: </h4>
                <div class = "service_playlists_result"> 
                    {this.props.failedSongsSpotify.map( (playlist) =>{   
                    return (  
                    <div class = "failed_songs">
                        <h1>{playlist.name}</h1>   
                        <ol>
                        {playlist.failedSongs[0].map( (failedSong) => { 
                            return (<li>{failedSong}</li>)
                        })}  
                        </ol>
                    </div>
                    ) } ) } 
                </div> 
                <Footer socials = "none"/>
            </div>
        )
    } 
     
    loading() { 
        return (   
          <Loader/>
        )
      } 
      
      
    render() { 
        return ( 
            <div>      
                <div id = "blur">      
                    {(this.state.done) ? this.finishedLoading() : this.loading()}   
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
        errorSpotify : state.spotify_reducer.error, 
        errorYoutube : state.youtube_reducer.error,  
        failedSongsSpotify : state.spotify_reducer.failedToTransfer || [], 
        failedSongsYoutube : state.youtube_reducer.failed || [], 
        completedTransferYoutube : state.youtube_reducer.completedTransferYoutube, 
        completedTransferSpotify : state.spotify_reducer.completedTransferSpotify,

    }

} 
 
const mapDispatchToProps = (dispatch) => {   
  return {     
    transferToYoutube : bindActionCreators(transferToYoutubeAction , dispatch), 
    transferToSpotify : bindActionCreators(transferToSpotifyAction , dispatch),
  }

}
 

export default connect(mapStateToProps , mapDispatchToProps)(Results);