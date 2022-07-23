import React from 'react'; 
import { connect  } from 'react-redux';   
import { bindActionCreators } from 'redux'; 
import { getTracksFromPlaylist } from '../spotify/spotify_funcs' 
import { createPlaylist , searchForTrack , insertIntoPlaylist , getTracksFromPlaylistYoutube } from '../youtube/youtube_funcs'

class Results extends React.Component {
    constructor(props) {
        super(props);   
        this.state = { 
            done : false,
            songs_failed_to_transfer_youtube : [], 
            songs_failed_to_transfer_spotify : [],
        }  
    } 
     
    componentDidMount() { 
        if (this.props.logged_in_spotify === false || this.props.logged_in_youtube === false) { 
            window.location.replace('http://localhost:3001/error');
        } else {   
            //this.transferPlaylistsToYoutube(); 
            this.transferPlaylistsToSpotify();
            
        
        }
    }  

    transferPlaylistsToSpotify() { 
        [...this.props.selected_playlists_youtube].map( (playlist) => {   
            let idx = parseInt(playlist); 
            let id = playlist.substring(idx.toString().length+1) 
            let name = this.props.playlists_to_transfer_youtube[idx].name;  
             
            console.log(name); 
            console.log(id); 
            console.log(idx); 
              
            getTracksFromPlaylistYoutube(this.props.access_token_youtube , this.props.api_key_youtube , id).then((response) => {  
                let tracks = [];
                response[0].map((track) => {
                    let title = track.snippet.title  
                    let artist = /@"^[^-]*"/.exec(title); 
                    let name = /\-(.*)/.exec(title);
                    console.log(title); 
                    console.log(typeof title);
                    let newTrack = { 
                        artist : artist,
                        name : name,

                    }  
                    console.log(newTrack);
                    tracks.push(newTrack)
                }); 
                return tracks;
            }).then( (tracks) => { 
                tracks.map( (track) => { 
                })
            })

        }); 
    }
     
    transferPlaylistsToYoutube() { 

        [...this.props.selected_playlists_spotify].map( (playlist) => {   
            let idx = parseInt(playlist); 
            let id = playlist.substring(idx.toString().length+1) 
            let name = this.props.playlists_to_transfer_spotify[idx].name;   

            getTracksFromPlaylist(this.props.access_token_spotify , id).then( (response) => {  
                let tracks = [];
                response[0].map((track) => {
                    let newTrack = {
                        artist: track.track.artists[0].name,
                        name: track.track.name,
                    }
                    tracks.push(newTrack);
                }) 
                return tracks; 
            }
            ).then( (tracks) => {   
                createPlaylist(this.props.access_token_youtube , this.props.api_key_youtube , name).then((playlistId) => { 
                    tracks.map( (track) => {  
                        setTimeout(() => {searchForTrack(this.props.access_token_youtube , this.props.api_key_youtube , track.artist, track.name).then((videoId) => {  
                            insertIntoPlaylist(this.props.access_token_youtube,this.props.api_key_youtube,playlistId , videoId).then((response) => { 
                                console.log(response);
                            })
                        });  
                    } , 1000);

                }) 
            }); 
          
            })
           
        }); 
    }

    render() {
        return ( 
            <div>      
                YO
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
        selected_playlists_spotify : state.spotify_reducer.selected_playlists_spotify, 
        selected_playlists_youtube : state.youtube_reducer.selected_playlists_youtube,
        songs_failed_to_transfer_spotify : state.spotify_reducer.failed_to_transfer, 
        songs_failed_to_transfer_youtube : state.youtube_reducer.failed_to_transfer,   
        playlists_to_transfer_spotify : state.spotify_reducer.playlists_to_transfer || [], 
        playlists_to_transfer_youtube : state.youtube_reducer.playlists_to_transfer || [], 
    }

} 
 
const mapDispatchToProps = (dispatch) => {   
  return {    

  } 

}
 

export default connect(mapStateToProps , mapDispatchToProps)(Results);