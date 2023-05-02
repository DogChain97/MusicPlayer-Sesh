import React from 'react';
import playlistsCSS from '../home_genre_playlist.module.css';
import { useNavigate } from "react-router-dom";

function Playlists (props) {
    const navigate = useNavigate();
    let playlists = props.playlists
    let ids = props.ids

    let playlistsArray = []
    for(let i=0;i<playlists.length;i++){
        playlistsArray.push(
            {
                name: playlists[i],
                id: ids[i]
            }
        )
    }

    const gotoplaylist = (e)=>{
        let id = e.target.dataset.id
        let name = e.target.dataset.name
        navigate(`/playlist/${name}/${id}`)
    }

    return (
        <ul className={playlistsCSS.playlistList}>
                    {playlistsArray.map(item=>{
                        return (
                            <li className={playlistsCSS.playlistListItem} key={item.data} data-name={item.name} data-id={item.id} onClick={gotoplaylist}>{item.name}</li>
                        )
                    })}
                </ul>
    )
}

export default Playlists;