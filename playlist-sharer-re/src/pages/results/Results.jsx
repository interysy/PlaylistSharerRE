import React from 'react'; 
import { connect  } from 'react-redux';    
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'; 
import { transferToYoutubeAction , resetForAnotherTransferYoutubeAction} from '../../redux/actions/youtube_actions'   
import { transferToSpotifyAction , resetForAnotherTransferSpotifyAction, resetErrorsSpotifyAction} from '../../redux/actions/spotify_actions'
import Loader from '../../components/loader/Loader' 
import Error from '../../components/error/Error'  
import Footer from '../../components/footer/Footer'
import './results.css'  
import YoutubeLogo from '../../assets/logos/yt_logo_rgb_light.png'  
import SpotifyLogo from '../../assets/logos/Spotify_Logo_CMYK_Green.png'   
import DefaultPlaylistImageSpotify from '../../assets/defaults/default_playlist.png' 
import DefaultPlaylistImageYoutube from '../../assets/defaults/no_image_default.jpg'
import { HiArrowSmRight } from 'react-icons/hi' 
import Button from '../../components/buttons/Button'

class Results extends React.Component {
    constructor(props) {
        super(props);   
        this.state = { 
            done : false, 
            redirect : false, 
            noPlaylistsToTransfer : false,
        }  
         
        this.finishedLoading = this.finishedLoading.bind(this);  
        this.setStateBeforeRedirect = this.setStateBeforeRedirect.bind(this); 
        this.beforeRedirectOnError = this.beforeRedirectOnError.bind(this);
    }  
     
      
    componentDidUpdate(prevProps , prevState) {  
        if ((this.props.completedTransferYoutube !== prevProps.completedTransfer && this.props.completedTransferSpotify  !== prevProps.completedTransferSpotify) && prevState.done === false) { 
            this.setState({ 
                done : true,
            }); 
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
            window.location.replace('http://localhost:3000/'); 
        } else if (this.props.completedTransferSpotify === true && this.props.completedTransferYoutube === true) { 
            this.setState({ 
                ...this.state, 
                done : true,
            });
        } else if ( this.props.selectedPlaylistsSpotify.length === 0 && this.props.selectedPlaylistsYoutube.length === 0){ 
            this.setState({ 
                ...this.state, 
                noPlaylistsToTransfer : true, 
            })
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
     
    beforeRedirectOnError(event = null , callback = function() {}) {    
        this.props.resetErrorsSpotify(); 
        this.props.resetErrorsYoutube();   
        this.setState({ 
          done : false,  
          redirect : false, 
        } , callback());
      } 
     
    createPopUpForError() { 
        let elementToBlur = document.getElementById("blur");
        elementToBlur.style.filter = "blur(2px)";   
        return (<div><Error errorYoutube = {this.props.errorYoutube} errorSpotify = {this.props.errorSpotify} beforeRedirect = {this.beforeRedirectOnError} /></div>)
      } 
     
    setStateBeforeRedirect() {    
        this.props.resetForAnotherTransferSpotifyAction(); 
        this.props.resetForAnotherTransferYoutubeAction(); 
        this.setState({ 
            done : false, 
            redirect : false,
        });
    } 
     

    finishedLoading() {  
        return (  
             
            <div id="done_page">   
                <div className="return_btns">
                    <Link to = "/"> <Button onClick = {this.setStateBeforeRedirect} text = "Return To Home Page" classes = "btn"/> </Link>  
                    <Link to = "/transferplaylists"> <Button onClick = {this.setStateBeforeRedirect} text = "Transfer More" classes = "btn"/> </Link> 
                </div>   
                <h1>PlaylistSharerRE</h1> 
                <h4> Transfer Completed Report  : </h4>   
                {(this.props.selectedPlaylistsSpotify.length === 0 && this.props.selectedPlaylistsYoutube.length === 0) ? (<div><p>No Playlists To Transfer</p></div>) : ( 
                    (<div className="failed_playlists">  
                    {this.props.failedSongsYoutube.map( (playlist) => ( 
                        <div className="failed_playlist">   
                            <div className="transfer">   
                                <img class = "transfer_img" src = {SpotifyLogo} ></img>   
                                <HiArrowSmRight class = "arrow"/>
                                <img class = "transfer_img" src = {YoutubeLogo}></img>  
                            </div> 
                            <div className="failed_playlist_inner">
                                <h4>{playlist.name}</h4>   
                                <img class = "failed_playlist_img" src = {DefaultPlaylistImageYoutube} ></img>  
                                <h5>Songs That Failed To Transfer: </h5> 
                                <ol> 
                                {playlist.failed[0].map( (failedSong) => { 
                                    return (<li>{failedSong}</li>)
                                })}  
                                </ol> 
                            </div>
                        </div>
                    ))} 
                      
                    {this.props.failedSongsSpotify.map( (playlist) => ( 
                        <div className="failed_playlist">   
                            <div className="transfer">   
                                <img class = "transfer_img" src = {YoutubeLogo} alt = "Youtube Logo"></img>   
                                <HiArrowSmRight class = "arrow" />
                                <img class = "transfer_img" src = {SpotifyLogo} alt = "Spotify Logo" ></img> 
                            </div>  
                            <div className="failed_playlist_inner">
                                <h4>{playlist.name}</h4>   
                                <img class = "failed_playlist_img" src = {DefaultPlaylistImageSpotify} alt = "Default Playlist Image Spotify" ></img>  
                                <h5>Songs That Failed To Transfer: </h5> 
                                <ol> 
                                {playlist.failedSongs[0].map( (failedSong) => { 
                                    return (<li>{failedSong}</li>)
                                })}  
                                </ol> 
                            </div>
                        </div>
                    ))} 

                </div> )
                ) }
                
                
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
                    {(this.state.noPlaylistsToTransfer) ?  <p> No playlists were chosen, try again!</p> : null}
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
    resetForAnotherTransferSpotifyAction : bindActionCreators( resetForAnotherTransferSpotifyAction,dispatch), 
    resetForAnotherTransferYoutubeAction : bindActionCreators(resetForAnotherTransferYoutubeAction , dispatch),   
    resetErrorsSpotify : bindActionCreators(resetErrorsSpotifyAction , dispatch), 
    resetErrorsYoutube : bindActionCreators(resetErrorsSpotifyAction , dispatch),
  }

}
 

export default connect(mapStateToProps , mapDispatchToProps)(Results);