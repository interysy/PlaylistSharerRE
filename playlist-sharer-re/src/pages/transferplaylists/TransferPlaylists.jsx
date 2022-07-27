import React from 'react'; 
import { connect  } from 'react-redux';   
import { bindActionCreators } from 'redux';
import { getPlaylistsSpotifyAction , storePlaylistsToTransferSpotifyAction } from '../../redux/actions/spotify_actions'; 
import Playlist from '../../components/playlist/Playlist'
import { getPlaylistsYoutubeAction , storePlaylistsToTransferYoutubeAction } from '../../redux/actions/youtube_actions'; 
import './transfer_playlists.css' 
import Button from '../../components/buttons/Button' 
import { Link } from 'react-router-dom'

  


class TransferPlaylists extends React.Component { 
   
    constructor(props) { 
        super(props);    
        this.state = { 
          loading : true, 
          spotifyPlaylists :[], 
          youtubePlaylists : [], 
        }    
 
        this.spotifySelectedPlaylists = new Set(); 
        this.youtubeSelectedPlaylists = new Set(); 

        this.getPlaylists = this.getPlaylists.bind(this);    
        this.handleCheckbox = this.handleCheckbox.bind(this); 
        this.setStateBeforeRedirect = this.setStateBeforeRedirect.bind(this)
        
    } 
    
    finishedLoading() {  
      return ( 
        <div id = "transfer_playlists">    
          <div class ='options'>
          <Link to = "/"> <Button text = "Return To Home Page" className = "btn"/> </Link> 
          <Link to = "/results"> <Button onClick = {this.setStateBeforeRedirect} text = "Transfer Selected" className = "btn"/> </Link> 
          </div>
          <h1>Please select playlists to transfer to another platform</h1> 
          <div id = "playlists"> 
            <div className="service"> 
            <h3> Spotify </h3>
            {this.state.spotifyPlaylists.map( (element,idx) => (<Playlist name = {element.name} id = {element.id} owner = {element.owner} image = {element.image} description = {element.description} onChange = {this.handleCheckbox} type = "Spotify" idx = {idx} />))} 
            </div> 
            <div className="service"> 
            <h3> Youtube </h3>
            {this.state.youtubePlaylists.map( (element ,idx) => (<Playlist name = {element.name} id = {element.id} owner = {element.owner} image = {element.image} description = {element.description} onChange = {this.handleCheckbox} type = "Youtube" idx = {idx}/>))} 
            </div>            
           </div>         
         </div>
      )
    } 
      
    setStateBeforeRedirect() {  
      this.props.storePlaylistsToTransferSpotify(this.spotifySelectedPlaylists); 
      this.props.storePlaylistsToTransferYoutube(this.youtubeSelectedPlaylists);
    } 
    
    handleCheckbox(event) {  
      let target = event.target;      
      let id = target.id; 
      id = id.split("%");  
      let name = id[0] 
      let type = id[1] 
      let playlistId = id[2] 
       
      if (target.checked) {
        if (type == "Spotify") {  
            this.spotifySelectedPlaylists.add((name + "%" + playlistId));
        } else if (type == "Youtube") {    
            this.youtubeSelectedPlaylists.add((name + "%" + playlistId));
        }  
      } else {   
        if (type == "Spotify") { 
          this.spotifySelectedPlaylists.delete((name + "%" + playlistId));
        } else if (type == "Youtube") {    
          this.youtubeSelectedPlaylists.delete((name + "%" + playlistId));
        } 
     
      } 
    }
    
    getPlaylists() {   
       this.props.getPlaylistsSpotify(this.props.accessTokenSpotify) 
       this.props.getPlaylistsYoutube(this.props.accessTokenYoutube , this.props.apiKeyYoutube)
    }  
      
    componentDidMount() { 
      this.getPlaylists(); 
    }
     
    componentDidUpdate(prevProps, prevState) {   
      if ((this.props.loadedYoutube !== false || this.props.loadedSpotify !== false) && prevProps != this.props) {  
        this.setState({  
          spotifyPlaylists : this.props.playlistsSpotify, 
          youtubePlaylists : this.props.playlistsYoutube,
        } , () => {  
          this.setState({ 
            ...this.state , 
            loading : false,
          })}
      )}

    }

    render() {
        return ( 
            <div>      
                {( !this.state.loading && this.state.spotifyPlaylists.length > 0) ? this.finishedLoading() : <h1>Loading</h1>} 
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

    }

}   
 
const mapDispatchToProps = (dispatch) => {   
  return {   
    getPlaylistsSpotify : bindActionCreators(getPlaylistsSpotifyAction , dispatch), 
    getPlaylistsYoutube : bindActionCreators(getPlaylistsYoutubeAction , dispatch), 
    storePlaylistsToTransferSpotify : bindActionCreators( storePlaylistsToTransferSpotifyAction , dispatch), 
    storePlaylistsToTransferYoutube : bindActionCreators( storePlaylistsToTransferYoutubeAction , dispatch),

  } 

}
 

export default connect(mapStateToProps , mapDispatchToProps)(TransferPlaylists);