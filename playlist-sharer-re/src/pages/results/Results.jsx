import React from 'react'; 
import { connect  } from 'react-redux';   
import { bindActionCreators } from 'redux'; 
import { addPlaylistsToTransferYoutube} from '../../redux/actions/youtube_actions' 
import { searchForTracksPerPlaylistSpotify } from '../../redux/actions/spotify_actions'

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
            this.transferPlaylistsToYoutube(); 
            //this.transferPlaylistsToSpotify();
            
        
        }
    }  

    transferPlaylistsToSpotify() { 
        // [...this.props.selected_playlists_youtube].map( (playlist) => {   
        //     let idx = parseInt(playlist); 
        //     let id = playlist.substring(idx.toString().length+1) 
        //     let name = this.props.playlists_to_transfer_youtube[idx].name;  
              
        //     getTracksFromPlaylistYoutube(this.props.access_token_youtube , this.props.api_key_youtube , id).then((response) => {  
        //         let tracks = [];
        //         response[0].map((track) => {
        //             let title = track.snippet.title  
        //             title = title.split('-');   
        //             let artist,name; 
        //             if (title.length > 1) {
        //                 artist = title[0] 
        //                 name = title[1].replace("(Official Video)" , '').replace("[Official Video]" , ''); 
        //             } else { 
        //                 name = title[0];  
        //                 artist = null;
        //             } 

        //             let newTrack = { 
        //                 artist : artist,
        //                 name : name,

        //             }  
        //             tracks.push(newTrack)
        //         });  

        //         return tracks; 

        //     }).then( (tracks) => { 
        //         tracks.map( (track) => {   
        //             searchForTracksSpotify( this.props.access_token_spotify, track.name , track.artist);

        //         })
        //     })

        // }); 
    }
     
    transferPlaylistsToYoutube() { 
 
        this.props.addPlaylistsToTransferYoutube([...this.props.selected_playlists_spotify] , this.props.access_token_youtube , this.props.api_key_youtube) 
        this.props. searchForTracksPerPlaylistSpotify(this.props.created_playlists_youtube,this.props.access_token_spotify); 

        // [...this.props.selected_playlists_spotify].map( (playlist) => {   
        //     let idx = parseInt(playlist); 
        //     let id = playlist.substring(idx.toString().length+1) 
        //     let name = this.props.playlists_to_transfer_spotify[idx].name;    
              
            // this.props.addPlaylistsToTransferYoutube(this.props.selected_playlists_spotify,this.props.access_token_youtube , this.props.api_key_youtube); 



            // getTracksFromPlaylist(this.props.access_token_spotify , id).then( (response) => {  
            //     let tracks = [];
            //     response[0].map((track) => {
            //         let newTrack = {
            //             artist: track.track.artists[0].name,
            //             name: track.track.name,
            //         }
            //         tracks.push(newTrack);
            //     }) 
            //     return tracks; 
            // }
            // ).then( (tracks) => {   
            //     setTimeout ( () => {createPlaylist(this.props.access_token_youtube , this.props.api_key_youtube , name).then((playlistId) => { 
            //         tracks.map( (track) => {  
            //             setTimeout(() => { 
            //                 searchForTrack(this.props.access_token_youtube , this.props.api_key_youtube , track.artist, track.name).then((videoId) => {  
            //                     setTimeout ( () => {insertIntoPlaylist(this.props.access_token_youtube,this.props.api_key_youtube,playlistId , videoId).then((response) => { 
            //                         console.log(response)
            //                     })} , 10000)
            //             });  
            //         } , 10000);

            //     }) 
            // } ) } , 10000 ); 
          
            // })
           
        // }); 
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
        created_playlists_youtube : state.youtube_reducer.created_playlists || [],

    }

} 
 
const mapDispatchToProps = (dispatch) => {   
  return {     
    addPlaylistsToTransferYoutube  : bindActionCreators(addPlaylistsToTransferYoutube , dispatch),  
    searchForTracksPerPlaylistSpotify : bindActionCreators(searchForTracksPerPlaylistSpotify , dispatch),
    

  } 

}
 

export default connect(mapStateToProps , mapDispatchToProps)(Results);