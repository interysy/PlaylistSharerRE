import React from 'react'; 
import { connect  } from 'react-redux';   
import { bindActionCreators } from 'redux';
import { getPlaylistsSpotifyAction , resetErrorsSpotifyAction, storePlaylistsToTransferSpotifyAction } from '../../redux/actions/spotify_actions'; 
import { Link } from 'react-router-dom'  
import { getPlaylistsYoutubeAction , storePlaylistsToTransferYoutubeAction , resetErrorsYoutubeAction } from '../../redux/actions/youtube_actions';  
import Error from '../../components/error/Error'
 
import './transfer_playlists.css'  
import Button from '../../components/buttons/Button'  
import Playlist from '../../components/playlist/Playlist'
import YoutubeLogo from '../../assets/logos/yt_logo_rgb_light.png'  
import SpotifyLogo from '../../assets/logos/Spotify_Logo_CMYK_Green.png' 
import Footer from '../../components/footer/Footer' 
import Loader from '../../components/loader/Loader'

  


class TransferPlaylists extends React.Component { 
   
    constructor(props) { 
        super(props);    
        
        this.state = { 
          loading : true, 
          spotifyPlaylists :[], 
          youtubePlaylists : [],  
          redirect : false, 
        }     

        this.spotifySelectedPlaylists = new Set(); 
        this.youtubeSelectedPlaylists = new Set();  

        this.getPlaylists = this.getPlaylists.bind(this);    
        this.handleCheckbox = this.handleCheckbox.bind(this); 
        this.setStateBeforeRedirect = this.setStateBeforeRedirect.bind(this); 
        this.refreshPlaylists = this.refreshPlaylists.bind(this);  
        this.createPopUpForError = this.createPopUpForError.bind(this); 
        this.beforeRedirectOnError = this.beforeRedirectOnError.bind(this);
    }   
     
    componentDidMount() {   
      if (this.props.loggedInSpotify === false || this.props.loggedInYoutube === false) { 
        window.location.replace('http://localhost:3000/');  
      } else if (this.props.playlistsSpotify.length !== 0 && this.props.playlistsYoutube.length !== 0) { 
        this.setState({  
          spotifyPlaylists : this.props.playlistsSpotify, 
          youtubePlaylists : this.props.playlistsYoutube,
        } , () => {  
          this.setState({ 
            ...this.state , 
            loading : false,
        })});  
      } else {
        this.getPlaylists();   
      } 
      
    }
     
    componentDidUpdate(prevProps, prevState) {     
      if ((this.props.loadedYoutube !== false || this.props.loadedSpotify !== false) && prevProps !== this.props) {  
        this.setState({  
          spotifyPlaylists : this.props.playlistsSpotify, 
          youtubePlaylists : this.props.playlistsYoutube,
        } , () => {  
          this.setState({ 
            ...this.state , 
            loading : false,
          })}
      )}  
       
      if ((prevProps.errorSpotify === "" || prevProps.errorYoutube === "") && (prevProps.errorSpotify !== this.props.errorSpotify || prevProps.errorYoutube !== this.props.errorYoutube)) {   
        console.log("Changing error state");  
          this.setState({  
            ...this.state, 
            loading : false,
            redirect : true,
          });
      }

    }  
     
    getPlaylists() {   
      this.props.getPlaylistsSpotify(this.props.accessTokenSpotify) 
      this.props.getPlaylistsYoutube(this.props.accessTokenYoutube , this.props.apiKeyYoutube)
   }  
     
    refreshPlaylists() {   
      if (this.state.redirect) {  
        let elementToBlur = document.getElementById("blur");
        elementToBlur.style.filter = "blur(0)"; 
        this.beforeRedirectOnError(null ,this.getPlaylists);
      } else { 
        this.setState({loading:true}, 
          () => { 
            this.getPlaylists();
          }) 
      }
    } 
     
    handleCheckbox(event) {   
      let target = event.target;      
      let id = target.id; 
      id = id.split("%");  
      let name = id[0] 
      let type = id[1] 
      let playlistId = id[2] 
       
      if (target.checked) {
        if (type === "Spotify") {  
            this.spotifySelectedPlaylists.add((name + "%" + playlistId));
        } else if (type === "Youtube") {    
            this.youtubeSelectedPlaylists.add((name + "%" + playlistId));
        }  
      } else {   
        if (type === "Spotify") { 
          this.spotifySelectedPlaylists.delete((name + "%" + playlistId));
        } else if (type === "Youtube") {    
          this.youtubeSelectedPlaylists.delete((name + "%" + playlistId));
        } 
     
      } 
    }
      
    searchForPlaylist(event) { 
      let target = event.target;  
      let searchingFor = target.value.toLowerCase(); 
       
      let divOfPlaylists = target.nextSibling; 
      let playlists = divOfPlaylists.getElementsByClassName("playlist_with_check"); 
       
      for (var i = 0 ; i < playlists.length ; i++) { 
        let playlist = playlists[i]; 
        let titleAndOwner = playlist.innerText.replace("By :" , ""); 
        if (!titleAndOwner.toLowerCase().includes(searchingFor)) { 
            playlist.style.display = "none";
        } else { 
            playlist.style.display = "flex";
        }
      }
    }    
     
    setStateBeforeRedirect() {  
      this.props.storePlaylistsToTransferSpotify(this.spotifySelectedPlaylists); 
      this.props.storePlaylistsToTransferYoutube(this.youtubeSelectedPlaylists);
    } 
     
    createPopUpForError() {  
      console.log(this.props.errorSpotify); 
      console.log(this.props.errorYoutube);
      let elementToBlur = document.getElementById("blur");
      elementToBlur.style.filter = "blur(2px)";   
      return (<div><Error errorYoutube = {this.props.errorYoutube} errorSpotify = {this.props.errorSpotify} beforeRedirect = {this.beforeRedirectOnError} localRefresh = {this.refreshPlaylists}/></div>)
    } 
 
    beforeRedirectOnError(event = null , callback = function() {}) {    
      this.props.resetErrorsSpotify(); 
      this.props.resetErrorsYoutube();   
      this.setState({ 
        loading : true, 
        spotifyPlaylists :[], 
        youtubePlaylists : [],  
        redirect : false, 
      } , callback());
    } 

    loading() { 
      return (   
        <Loader/>
      )
    } 
     
     
    finishedLoading() {  
      return ( 
        <div id = "transfer_playlists">    
          <div class ='options'>
            <Link to = "/"> <Button text = "Return To Home Page" classes = "btn"/> </Link>   
            <h2>Please select playlists to transfer to another platform</h2> 
            <Link to = "/results"> <Button onClick = {this.setStateBeforeRedirect} text = "Transfer Selected" classes = "btn"/> </Link>  
          </div>
          <div id = "playlists"> 
            <div className="service"> 
              <img class = "header_img" src = {SpotifyLogo} alt = "Spotify Logo" ></img> 
              <input type="text" className = "search_bar spotify_search_bar" placeholder="Search.." onChange={this.searchForPlaylist}></input> 
              <div className="service_playlists">
                {this.state.spotifyPlaylists.map( (element,idx) => (<Playlist name = {element.name} id = {element.id} owner = {element.owner} image = {element.image} description = {element.description} onChange = {this.handleCheckbox} type = "Spotify"/>))}  
              </div>
            </div>  
            <Button text = "Refresh Playlists" onClick = {this.refreshPlaylists} classes = "btn refresh_btn" ></Button> 
            <div className="service"> 
            <img class = "header_img" src = {YoutubeLogo} alt = "Youtube Logo"></img>  
              <input type="text" className = "search_bar youtube_search_bar" placeholder="Search.." onChange={this.searchForPlaylist}></input> 
              <div className="service_playlists">
                {this.state.youtubePlaylists.map( (element ,idx) => (<Playlist name = {element.name} id = {element.id} owner = {element.owner} image = {element.image} description = {element.description} onChange = {this.handleCheckbox} type = "Youtube"/>))}  
              </div>
            </div>            
           </div>   
          <Footer socials = "none"/>
         </div>
      )
    }  
     

    render() { 
        return (   
          <div>
            <div id = "blur">      
                {( !this.state.loading && this.state.spotifyPlaylists.length > 0) ? this.finishedLoading() : this.loading()}   
            </div>   
             { (this.state.redirect) ?  this.createPopUpForError() : null}  
          </div>
          
        );
    } 
  } 
  
const mapStateToProps = (state) => {  
    return {  
        accessTokenSpotify : state.spotify_reducer.token, 
        accessTokenYoutube: state.youtube_reducer.token,  
        apiKeyYoutube : state.youtube_reducer.apiKey, 
        loggedInSpotify : state.spotify_reducer.loggedIn, 
        loggedInYoutube : state.youtube_reducer.loggedIn, 
        playlistsSpotify : state.spotify_reducer.playlists || [],  
        playlistsYoutube : state.youtube_reducer.playlists || [],     
        loadedSpotify : state.spotify_reducer.loaded, 
        loadedYoutube : state.youtube_reducer.loaded, 
        errorSpotify : state.spotify_reducer.error, 
        errorYoutube : state.youtube_reducer.error,

    }

}   
 
const mapDispatchToProps = (dispatch) => {   
  return {   
    getPlaylistsSpotify : bindActionCreators(getPlaylistsSpotifyAction , dispatch), 
    getPlaylistsYoutube : bindActionCreators(getPlaylistsYoutubeAction , dispatch), 
    storePlaylistsToTransferSpotify : bindActionCreators( storePlaylistsToTransferSpotifyAction , dispatch), 
    storePlaylistsToTransferYoutube : bindActionCreators( storePlaylistsToTransferYoutubeAction , dispatch),  
    resetErrorsSpotify : bindActionCreators(resetErrorsSpotifyAction , dispatch), 
    resetErrorsYoutube : bindActionCreators(resetErrorsYoutubeAction , dispatch),

  } 

}
 

export default connect(mapStateToProps , mapDispatchToProps)(TransferPlaylists);