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
    const [genres, setGenres] = useState([])
    const [artistImg, setArtistImg] = useState('')

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
                    <button className={artistSongsCSS.createPlaylistLogout}>{user.charAt(0)}</button>
                    <br/>
                    <img src={artistImg}/>
                    <h2>{param}</h2>
                </div>

                <div className={artistSongsCSS.playlistContentPanel}>
                      <h2>No songs here :/</h2>
                </div>
            </div>            
        </div>
    )
}

export default ArtistSongs;