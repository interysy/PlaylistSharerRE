import React from 'react'; 
import { connect  } from 'react-redux';   
import { bindActionCreators } from 'redux';
import { getPlaylistsSpotify } from '../redux/actions/spotify_actions'; 
import Playlist from '../components/playlist/Playlist'



class TransferPlaylists extends React.Component {
    constructor(props) {
        super(props);    
        this.state = { 
          loaded : false, 
          spotify_playlist_data :[],
        }     
        this.get_playlists.bind(this); 
        this.get_playlists();
    }
   
    while_loading = () => { 
      return ( 
        <h1> Loading...</h1>
      )
    }
     
    finished_loading = (array) => {  
      this.setState( {spotify_playlist_data : array} , () => { 
        return ( 
          <div> 
            {this.state.spotify_playlist_data.map(function (element)  { 
              
              return <Playlist name = {element.name} id = {element.id} owner = {element.owner} image = {element.image} description  = {element.description}/>
            })}
          </div>
        )
      });
    }

    get_playlists() {  
      this.props.getPlaylistsSpotify(this.props.access_token_spotify);  
      
    } 
     
    componentDidUpdate(previousProps, previousState) {
      if (previousProps !== this.props) { 
          this.setState({ loaded : true }, () => {
          }); 
          
      }
  }

    render() {
        return ( 
            <div>   
              {this.loaded ? this.while_loading() : this.finished_loading(this.props.playlists_to_transfer_spotify)}
            </div>  
          
        );
    }
} 
  
const mapStateToProps = (state) => {  
    return {  
        access_token_spotify : state.spotify_reducer.token, 
        access_token_youtube : state.youtube_reducer.token, 
        logged_in_spotify : state.spotify_reducer.logged_in, 
        logged_in_youtube : state.youtube_reducer.logged_in, 
        playlists_to_transfer_spotify : state.spotify_reducer.playlists_to_transfer,  
        playlists_to_transfer_youtube : state.youtube_reducer.playlists_to_transfer,  
        songs_failed_to_transfer_spotify : state.spotify_reducer.failed_to_transfer, 
        songs_failed_to_transfer_youtube : state.youtube_reducer.failed_to_transfer,  

    }

}  
 
const mapDispatchToProps = (dispatch) => {   
  return {   
    getPlaylistsSpotify : bindActionCreators(getPlaylistsSpotify , dispatch)

  } 

}
 

export default connect(mapStateToProps , mapDispatchToProps)(TransferPlaylists);