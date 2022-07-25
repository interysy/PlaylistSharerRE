import React from 'react'; 
import { connect  } from 'react-redux';   
import { bindActionCreators } from 'redux';
import { getPlaylistsSpotify , storePlaylistsToTransferSpotify } from '../../redux/actions/spotify_actions'; 
import Playlist from '../../components/playlist/Playlist'
import { getPlaylistsYoutube , storePlaylistsToTransferYoutube } from '../../redux/actions/youtube_actions'; 
import './transfer_playlists.css' 
import Button from '../../components/buttons/Button' 
import { Link } from 'react-router-dom'

  


class TransferPlaylists extends React.Component { 
   
    constructor(props) { 
        super(props);    
        this.state = { 
          loading : true, 
          spotify_playlist_data :[], 
          youtube_playlist_data : [], 
        }    
 
        this.spotify_selected_playlists = new Set(); 
        this.youtube_selected_playlists = new Set(); 

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
            {this.state.spotify_playlist_data.map( (element,idx) => (<Playlist name = {element.name} id = {element.id} owner = {element.owner} image = {element.image} description = {element.description} onChange = {this.handleCheckbox} type = "Spotify" idx = {idx} />))} 
            </div> 
            <div className="service"> 
            <h3> Youtube </h3>
            {this.state.youtube_playlist_data.map( (element ,idx) => (<Playlist name = {element.name} id = {element.id} owner = {element.owner} image = {element.image} description = {element.description} onChange = {this.handleCheckbox} type = "Youtube" idx = {idx}/>))} 
            </div>            
           </div>         
         </div>
      )
    } 
      
    setStateBeforeRedirect() {  
      this.props.storePlaylistsToTransferSpotify(this.spotify_selected_playlists); 
      this.props.storePlaylistsToTransferYoutube(this.youtube_selected_playlists);
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
            this.spotify_selected_playlists.add((name + "%" + playlistId));
        } else if (type == "Youtube") {    
            this.youtube_selected_playlists.add((name + "%" + playlistId));
        }  
      } else {   
        if (type == "Spotify") { 
          this.spotify_selected_playlists.delete((name + "%" + playlistId));
        } else if (type == "Youtube") {    
          this.youtube_selected_playlists.delete((name + "%" + playlistId));
        } 
     
      } 
    }
    
    getPlaylists() {   
       this.props.getPlaylistsSpotify(this.props.access_token_spotify) 
       this.props.getPlaylistsYoutube(this.props.access_token_youtube , this.props.api_key_youtube)
    }  
      
    componentDidMount() { 
      this.getPlaylists(); 
    }
     
    componentDidUpdate(prevProps, prevState) {   
      if ((this.props.playlists_loaded_youtube !== false || this.props.playlists_loaded_spotify !== false) && prevProps != this.props) {  
        this.setState({  
          spotify_playlist_data : this.props.playlists_to_transfer_spotify, 
          youtube_playlist_data : this.props.playlists_to_transfer_youtube
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
                {( !this.state.loading && this.state.spotify_playlist_data.length > 0) ? this.finishedLoading() : <h1>Loading</h1>} 
            </div>  
          
        );
    } 
  } 
  
const mapStateToProps = (state) => {  
    return {  
        access_token_spotify : state.spotify_reducer.token, 
        access_token_youtube : state.youtube_reducer.token,  
        api_key_youtube : state.youtube_reducer.api_key, 
        logged_in_spotify : state.spotify_reducer.logged_in, 
        logged_in_youtube : state.youtube_reducer.logged_in, 
        playlists_to_transfer_spotify : state.spotify_reducer.playlists_to_transfer || [],  
        playlists_to_transfer_youtube : state.youtube_reducer.playlists_to_transfer || [],  
        songs_failed_to_transfer_spotify : state.spotify_reducer.failed_to_transfer, 
        songs_failed_to_transfer_youtube : state.youtube_reducer.failed_to_transfer,   
        playlists_loaded_spotify : state.spotify_reducer.loaded, 
        playlists_loaded_youtube : state.youtube_reducer.loaded,

    }

}   
 
const mapDispatchToProps = (dispatch) => {   
  return {   
    getPlaylistsSpotify : bindActionCreators(getPlaylistsSpotify , dispatch), 
    getPlaylistsYoutube : bindActionCreators(getPlaylistsYoutube , dispatch), 
    storePlaylistsToTransferSpotify : bindActionCreators( storePlaylistsToTransferSpotify , dispatch), 
    storePlaylistsToTransferYoutube : bindActionCreators( storePlaylistsToTransferYoutube , dispatch),

  } 

}
 

export default connect(mapStateToProps , mapDispatchToProps)(TransferPlaylists);