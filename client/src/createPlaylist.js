import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import generalCSS from './home_genre_playlist.module.css'
import createPlaylistCSS from './createPlaylist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/home.png';
import genre from './assets/menu.png';
import playlist from './assets/playlistActive.png';
import Playlists from './components/playlists';
import MusicPlayer from './components/musicPlayer';

function CreatePlaylist (){
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const [clickedOptions, setClickedOptions] = useState(false)
    const [playlistName, setPlaylistName] = useState('')
    const [playlists, setPlaylists] = useState([])
    const [ids, setIds] = useState([])

    Axios.defaults.withCredentials = true
    useEffect(() => {
        Axios.get('http://localhost:7000/createPlaylist').then((response) => {
            if(response.data.loggedIn === true){
                setUser(response.data.user[0].u_name)
                setPlaylists(response.data.playlists)
                setIds(response.data.ids)
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

    const createPlaylist = () => {
        Axios.post('http://localhost:7000/createplaylist',{
            user: user,
            plname: playlistName
        }).then((response) => {
            if(response.data.id){
                navigate(`/playlist/${response.data.id}`)
            }else{
                console.log(response.data.message)
            }
        })
    }

    return (
        <div className={generalCSS.main}>
            <div className={generalCSS.leftPanel}>
                <h1 className={generalCSS.brand}><img src={logo} />SESH</h1>
                <h2 className={generalCSS.tabName}><a href='/home'><img className={generalCSS.tabs} src={home} />Home</a></h2>
                <h2 className={generalCSS.tabName}><a href='/genre'><img className={generalCSS.tabs} src={genre} />Genre</a></h2>
                <h2 className={generalCSS.tabName}><a className={generalCSS.active} href='/createPlaylist'><img className={generalCSS.tabs} src={playlist} />Create Playlist</a></h2>
                <hr/><br/>
                <Playlists playlists={playlists} ids={ids} />
            </div>

            <div className={generalCSS.rightPanel}>
                <div className={generalCSS.createPlaylistSearchPanel}>
                    <button onClick={showOptions} className={generalCSS.logout}>{user.charAt(0)}</button>
                    {clickedOptions && 
                        <ul className={generalCSS.userOptions}>
                            <li className={generalCSS.userLogout} onClick={logout}>Logout</li>
                        </ul>
                    }
                    <br/>
                    <h1 className={generalCSS.heading}>Create Playlist</h1>
                </div>

                <div className={generalCSS.playlistContentPanel}>
                    <div className={generalCSS.createPlaylist}>
                        <h2>Enter Playlist Name</h2>
                        <br/>
                        <input type="text" placeholder='playlist name' onChange={(e)=>{
                                setPlaylistName(e.target.value);
                        }} /><br/>
                        <button className={generalCSS.createPlaylistButton} onClick={createPlaylist}>Create</button>
                    </div> 
                </div>
            </div>            
        </div>
    )
}

export default CreatePlaylist;