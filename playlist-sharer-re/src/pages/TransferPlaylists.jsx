import React from 'react'; 
import { connect } from 'react-redux'; 


 

class TransferPlaylists extends React.Component {
    constructor() {
        super();    
        this.state = { 
          parsedPlaylistDataSpotify:[], 
          loading:true,
        }
    }
 
    
    render() {
        return ( 
            <div>    
              <div className='source'> 
              </div> 
              <div className="destination"> 
              </div>
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
  } 

}
 

export default connect(mapStateToProps , mapDispatchToProps)(TransferPlaylists);