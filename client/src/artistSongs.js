import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import artistSongsCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/home.png';
import genre from './assets/menu.png';
import playlist from './assets/playlistActive.png';
import { useParams } from "react-router-dom";

function ArtistSongs (){
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const {param} = useParams();
    const [images, setImages] = useState([])
    const [songs, setSongs] = useState([])
    const [urls, setUrls] = useState([])
    const [genres, setGenres] = useState([])
    const [artistImg, setArtistImg] = useState('')
    const [currentSongImg, setCurrentSongImg] = useState()
    const [currentSongName, setCurrentSongName] = useState('')
    const [currentSongUrl, setCurrentSongUrl] = useState('')
    const [isShown, setIsShown] = useState(false);
    const [clickedOptions, setClickedOptions] = useState(false)

    Axios.defaults.withCredentials = true
    useEffect(() => {
        Axios.get(`http://localhost:7000/artist/${param}`).then((response) => {
            if(response.data.loggedIn === true){
                setUser(response.data.user[0].u_name)
                setImages(response.data.images)
                setSongs(response.data.songs)
                setGenres(response.data.genres)
                setArtistImg(response.data.artistImg)
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
            genre: genres[i],
        }
        )
    }

    console.log(data)

    const songClicked = (e) => {
        setIsShown(true);
        setCurrentSongImg(e.target.dataset.img);
        setCurrentSongName(e.target.dataset.name)
        setCurrentSongUrl(e.target.dataset.url)
    }

    const showOptions = ()=>{
        setClickedOptions(!clickedOptions);
    }

    const logout = () => {
        Axios.post('http://localhost:7000/logout')
        navigate("/")
    }

    return (
        <div className={artistSongsCSS.main}>
            <div className={artistSongsCSS.leftPanel}>
                <h1 className={artistSongsCSS.brand}><img src={logo} />SESH</h1>
                <h2 className={artistSongsCSS.tabName}><a href='/home'><img className={artistSongsCSS.tabs} src={home} />Home</a></h2>
                <h2 className={artistSongsCSS.tabName}><a href='/genre'><img className={artistSongsCSS.tabs} src={genre} />Genre</a></h2>
                <h2 className={artistSongsCSS.tabName}><a href='/createPlaylist'><img className={artistSongsCSS.tabs} src={playlist} />Create Playlist</a></h2>
            </div>

            <div className={artistSongsCSS.rightPanel}>
                <div className={artistSongsCSS.createPlaylistSearchPanel}>
                    <button onClick={showOptions} className={artistSongsCSS.logout}>{user.charAt(0)}</button>
                    {clickedOptions && 
                        <ul className={artistSongsCSS.userOptions}>
                            <li className={artistSongsCSS.userLogout} onClick={logout}>Logout</li>
                        </ul>
                    }
                    <br/>
                    <div className={artistSongsCSS.titleDetails}>
                        <img className={artistSongsCSS.artist_genreImg} src={artistImg}/>
                        <h2 className={artistSongsCSS.artist_genreName}>{param}</h2>
                    </div>
                </div>

                <div className={artistSongsCSS.playlistContentPanel}>
                <table>
                        <tr className={artistSongsCSS.songsHeader}>
                            
                            <th className={artistSongsCSS.no}>#</th>
                            <th>Image</th>
                            <th>Song</th>
                            <th>Genre</th>
                            <img className={artistSongsCSS.playSong} src={playlist}/>
                        </tr>
                        {data.map((val,key)=>{
                            return(
                                <tr className={artistSongsCSS.songRow} key={key} >
                                        <td className={artistSongsCSS.no}>{val.no}</td>
                                        <td><img className={artistSongsCSS.tableImg} src={val.img} /></td>
                                        <td>{val.song}</td>
                                        <td>{val.genre}</td>
                                        <img className={artistSongsCSS.playSong} src={playlist} data-img={val.img} data-name={val.song} data-url={val.url} onClick={songClicked} />     
                                </tr>
                            )
                        })
                        }
                    </table>
                </div>
            </div>     
            {isShown && 
            <div className={artistSongsCSS.musicControls}>
                <img className={artistSongsCSS.currentSongImg} src={currentSongImg}/>
            </div>  
            }        
        </div>
    )
}

export default ArtistSongs;