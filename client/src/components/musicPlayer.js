import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import musicPlayerCSS from '../home_genre_playlist.module.css';

function MusicPlayer (props) {

    return (
        <div className={musicPlayerCSS.musicControls}>
                <img className={musicPlayerCSS.currentSongImg} src={props.image}/>
                <span className={musicPlayerCSS.currentSongName}>{props.name}</span>
                <br/>
                <span className={musicPlayerCSS.currentSongArtist}>{props.artist}</span>
                <div className={musicPlayerCSS.audioBar}>
                    <audio src = {props.src} autoPlay controls/>
                </div>
            </div>
    )
}

export default MusicPlayer;