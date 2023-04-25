import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import genreSongsCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/home.png';
import genre from './assets/menu.png';
import playlist from './assets/playlistActive.png';
import { useParams } from "react-router-dom";
import Playlists from './components/playlists';
import MusicPlayer from './components/musicPlayer';

function GenreSongs (){
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const {param} = useParams();
    const [images, setImages] = useState([])
    const [songs, setSongs] = useState([])
    const [urls, setUrls] = useState([])
    const [artists, setArtists] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [ids, setIds] = useState([])
    const [genreImg, setGenreImg] = useState('')
    const [currentSongImg, setCurrentSongImg] = useState()
    const [currentSongName, setCurrentSongName] = useState('')
    const [currentSongUrl, setCurrentSongUrl] = useState('')
    const [currentSongArtist, setCurrentSongArtist] = useState('')
    const [isShown, setIsShown] = useState(false);
    const [clickedOptions, setClickedOptions] = useState(false)

    Axios.defaults.withCredentials = true
    useEffect(() => {

        Axios.get(`http://localhost:7000/genre/${param}`).then((response) => {
            if(response.data.loggedIn === true){
                setUser(response.data.user[0].u_name)
                setImages(response.data.images)
                setSongs(response.data.songs)
                setUrls(response.data.urls)
                setArtists(response.data.artists)
                setGenreImg(response.data.genreImg)
                setPlaylists(response.data.playlists)
                setIds(response.data.ids)
            }else{
                navigate("/")
            }
        })
    }, [])

    const data = [];
    for(var i=0;i<images.length;i++){
        data.push({
            no: (i+1),
            img: images[i],
            song: songs[i],
            url: urls[i],
            artist: artists[i],
        }
        )
    }

    console.log(data)

    const songClicked = (e) => {
        setIsShown(true);
        setCurrentSongImg(e.target.dataset.img);
        setCurrentSongName(e.target.dataset.name)
        setCurrentSongArtist(e.target.dataset.artist)
        setCurrentSongUrl(e.target.dataset.url);
    }

    const showOptions = ()=>{
        setClickedOptions(!clickedOptions);
    }

    const logout = () => {
        Axios.post('http://localhost:7000/logout')
        navigate("/")
    }

    return (
        <div className={genreSongsCSS.main}>
            <div className={genreSongsCSS.leftPanel}>
                <h1 className={genreSongsCSS.brand}><img src={logo} />SESH</h1>
                <h2 className={genreSongsCSS.tabName}><a href='/home'><img className={genreSongsCSS.tabs} src={home} />Home</a></h2>
                <h2 className={genreSongsCSS.tabName}><a href='/genre'><img className={genreSongsCSS.tabs} src={genre} />Genre</a></h2>
                <h2 className={genreSongsCSS.tabName}><a href='/createPlaylist'><img className={genreSongsCSS.tabs} src={playlist} />Create Playlist</a></h2>
                <hr/><br/>
                <Playlists playlists={playlists} ids={ids} />
            </div>

            <div className={genreSongsCSS.rightPanel}>
                <div className={genreSongsCSS.createPlaylistSearchPanel}>
                    <button onClick={showOptions} className={genreSongsCSS.logout}>{user.charAt(0)}</button>
                    {clickedOptions && 
                        <ul className={genreSongsCSS.userOptions}>
                            <li className={genreSongsCSS.userLogout} onClick={logout}>Logout</li>
                        </ul>
                    }
                    <br/>
                    <div className={genreSongsCSS.titleDetails}>
                        <img className={genreSongsCSS.artist_genreImg} src={genreImg}/>
                        <h2 className={genreSongsCSS.artist_genreName}>{param}</h2>
                    </div>
                </div>

                <div className={genreSongsCSS.playlistContentPanel}>

                    <table>
                        <tr className={genreSongsCSS.songsHeader}>
                            
                            <th className={genreSongsCSS.no}>#</th>
                            <th>Image</th>
                            <th>Song</th>
                            <th>Artist</th>
                            <img className={genreSongsCSS.playSong} src={playlist}/>
                        </tr>
                        {data.map((val,key)=>{
                            return(
                                <tr className={genreSongsCSS.songRow} key={key} data-img={val.img} data-artist={val.artist} data-name={val.song} data-url={val.url} onClick={songClicked}>
                                        <td className={genreSongsCSS.no}>{val.no}</td>
                                        <td><img className={genreSongsCSS.tableImg} src={val.img} /></td>
                                        <td>{val.song}</td>
                                        <td>{val.artist}</td>
                                        <img className={genreSongsCSS.playSong} src={playlist} />     
                                </tr>
                            )
                        })
                        }
                    </table>

                    
                </div>
            </div>  
            {isShown && 
            <div className={genreSongsCSS.musicControls}>
                <MusicPlayer image={currentSongImg} name={currentSongName} artist={currentSongArtist} src={currentSongUrl} />
            </div>  
            }          
        </div>
    )
}

export default GenreSongs;