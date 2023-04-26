import React, { useEffect, useState } from 'react';
import playlistsCSS from '../home_genre_playlist.module.css';
import { Link, useNavigate } from "react-router-dom";

function Playlists (props) {
    const navigate = useNavigate();
    var playlists = props.playlists
    var ids = props.ids

    const playlistsArray = []
    for(var i=0;i<playlists.length;i++){
        playlistsArray.push(
            {
                name: playlists[i],
                id: ids[i]
            }
        )
    }

    const gotoplaylist = (e)=>{
        var id = e.target.dataset.id
        var name = e.target.dataset.name
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