import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import createPlaylistCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/home.png';
import genre from './assets/menu.png';
import playlist from './assets/playlistActive.png';

function CreatePlaylist (){
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const [clickedOptions, setClickedOptions] = useState(false)

    Axios.defaults.withCredentials = true
    useEffect(() => {
        Axios.get('http://localhost:7000/createPlaylist').then((response) => {
            if(response.data.loggedIn === true){
                setUser(response.data.user[0].u_name)
            }else{
                navigate("/")
            }
        })
    }, [])

    const showOptions = ()=>{
        setClickedOptions(!clickedOptions);
    }

    const logout = () => {
        Axios.post('http://localhost:7000/logout')
        navigate("/")
    }

    return (
        <div className={createPlaylistCSS.main}>
            <div className={createPlaylistCSS.leftPanel}>
                <h1 className={createPlaylistCSS.brand}><img src={logo} />SESH</h1>
                <h2 className={createPlaylistCSS.tabName}><a href='/home'><img className={createPlaylistCSS.tabs} src={home} />Home</a></h2>
                <h2 className={createPlaylistCSS.tabName}><a href='/genre'><img className={createPlaylistCSS.tabs} src={genre} />Genre</a></h2>
                <h2 className={createPlaylistCSS.tabName}><a className={createPlaylistCSS.active} href='/createPlaylist'><img className={createPlaylistCSS.tabs} src={playlist} />Create Playlist</a></h2>
            </div>

            <div className={createPlaylistCSS.rightPanel}>
                <div className={createPlaylistCSS.createPlaylistSearchPanel}>
                    <button onClick={showOptions} className={createPlaylistCSS.logout}>{user.charAt(0)}</button>
                    {clickedOptions && 
                        <ul className={createPlaylistCSS.userOptions}>
                            <li className={createPlaylistCSS.userLogout} onClick={logout}>Logout</li>
                        </ul>
                    }
                    <br/>
                    <button className={createPlaylistCSS.playlistName}>My Playlist</button>
                </div>

                <div className={createPlaylistCSS.playlistContentPanel}>
                      <h2>No songs here :/</h2>
                </div>
            </div>            
        </div>
    )
}

export default CreatePlaylist;