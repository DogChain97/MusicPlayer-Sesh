// import React, { useEffect, useState } from 'react';
// import Axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import userPlaylistCSS from './home_genre_playlist.module.css';
// import logo from './assets/sesh_white.png';
// import home from './assets/home.png';
// import genre from './assets/menu.png';
// import playlist from './assets/playlistActive.png';
// import { useParams } from "react-router-dom";
// import Playlists from './components/playlists';
// import SearchBar from './components/searchBar';
// import MusicPlayer from './components/musicPlayer';
// import { response } from 'express';

// function UserPlaylist (){
//     const navigate = useNavigate();
//     const [user, setUser] = useState('')
//     const {id} = useParams();
//     const [images, setImages] = useState([])
//     const [songs, setSongs] = useState([])
//     const [urls, setUrls] = useState([])
//     const [artists, setArtists] = useState([])
//     const [genres, setGenres] = useState([])
//     const [playlists, setPlaylists] = useState([])
//     const [ids, setIds] = useState([])
//     const [currentSongImg, setCurrentSongImg] = useState()
//     const [currentSongName, setCurrentSongName] = useState('')
//     const [currentSongUrl, setCurrentSongUrl] = useState('')
//     const [currentSongArtist, setCurrentSongArtist] = useState('')
//     const [isShown, setIsShown] = useState(false);
//     const [clickedOptions, setClickedOptions] = useState(false)
//     const [addedStatus, setAddedStatus] = useState('')

//     Axios.defaults.withCredentials = true
//     useEffect(() => {

//         Axios.get(`http://localhost:7000/playlist/${id}`).then((response) => {
//             if(response.data.loggedIn === true){
//                 setUser(response.data.user[0].u_name)
//                 setImages(response.data.images)
//                 setSongs(response.data.songs)
//                 setUrls(response.data.urls)
//                 setArtists(response.data.artists)
//                 setGenres(response.data.genres)
//                 setPlaylists(response.data.playlists)
//                 setIds(response.data.ids)
//             }else{
//                 navigate("/")
//             }
//         })
//     }, [])

//     const data = [];
//     for(var i=0;i<images.length;i++){
//         data.push({
//             no: (i+1),
//             img: images[i],
//             song: songs[i],
//             url: urls[i],
//             artist: artists[i],
//             genre: genres[i]
//         }
//         )
//     }

//     console.log(data)

//     const songClicked = (e) => {
//         setIsShown(true);
//         setCurrentSongImg(e.target.dataset.img);
//         setCurrentSongName(e.target.dataset.name)
//         setCurrentSongArtist(e.target.dataset.artist)
//         setCurrentSongUrl(e.target.dataset.url);
//     }

//     const showOptions = ()=>{
//         setClickedOptions(!clickedOptions);
//     }

//     const addSong = (e)=>{
//         Axios.post('http://localhost:7000/addsong',{
//             id: id,
//             song: e.target.value
//         }).then((response)=>{
//             if(response.data.message){
//                 setAddedStatus(response.data.message)
//             }else{
//                 console.log("failed")
//             }
//         })
//     }

//     const logout = () => {
//         Axios.post('http://localhost:7000/logout')
//         navigate("/")
//     }

//     return (
//         <div className={userPlaylistCSS.main}>
//             <div className={userPlaylistCSS.leftPanel}>
//                 <h1 className={userPlaylistCSS.brand}><img src={logo} />SESH</h1>
//                 <h2 className={userPlaylistCSS.tabName}><a href='/home'><img className={userPlaylistCSS.tabs} src={home} />Home</a></h2>
//                 <h2 className={userPlaylistCSS.tabName}><a href='/genre'><img className={userPlaylistCSS.tabs} src={genre} />Genre</a></h2>
//                 <h2 className={userPlaylistCSS.tabName}><a href='/createPlaylist'><img className={userPlaylistCSS.tabs} src={playlist} />Create Playlist</a></h2>
//                 <hr/><br/>
//                 <Playlists playlists={playlists} ids={ids} />
//             </div>

//             <div className={userPlaylistCSS.rightPanel}>
//                 <div className={userPlaylistCSS.createPlaylistSearchPanel}>
//                     <button onClick={showOptions} className={userPlaylistCSS.logout}>{user.charAt(0)}</button>
//                     {clickedOptions && 
//                         <ul className={userPlaylistCSS.userOptions}>
//                             <li className={userPlaylistCSS.userLogout} onClick={logout}>Logout</li>
//                         </ul>
//                     }
//                     <br/>
//                     <div className={userPlaylistCSS.titleDetails}>
//                         <h2 className={userPlaylistCSS.heading}>{id}</h2>
//                     </div>
//                 </div>

//                 <div className={userPlaylistCSS.playlistContentPanel}>
//                     <SearchBar data={songs} onClick={addSong}/>
//                     <table>
//                         <tr className={userPlaylistCSS.songsHeader}>
                            
//                             <th className={userPlaylistCSS.no}>#</th>
//                             <th>Image</th>
//                             <th>Song</th>
//                             <th>Artist</th>
//                             <img className={userPlaylistCSS.playSong} src={playlist}/>
//                         </tr>
//                         {data.map((val,key)=>{
//                             return(
//                                 <tr className={userPlaylistCSS.songRow} key={key} data-img={val.img} data-artist={val.artist} data-name={val.song} data-url={val.url} onClick={songClicked}>
//                                         <td className={userPlaylistCSS.no}>{val.no}</td>
//                                         <td><img className={userPlaylistCSS.tableImg} src={val.img} /></td>
//                                         <td>{val.song}</td>
//                                         <td>{val.artist}</td>
//                                         <td>{val.genre}</td>
//                                         <img className={userPlaylistCSS.playSong} src={playlist} />     
//                                 </tr>
//                             )
//                         })
//                         }
//                     </table>

                    
//                 </div>
//             </div>  
//             {isShown && 
//             <div className={userPlaylistCSS.musicControls}>
//                 <MusicPlayer image={currentSongImg} name={currentSongName} artist={currentSongArtist} src={currentSongUrl} />
//             </div>  
//             }          
//         </div>
//     )
// }

// export default UserPlaylist;