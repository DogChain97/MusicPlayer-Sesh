import React, { useEffect, useState } from 'react';
import musicControlsCSS from '../home_genre_playlist.module.css';
import nextTrack from '../assets/nextTrack.png'
import previousTrack from '../assets/previousTrack.png'

function MusicControls (props) {

    return (
        <div className={musicControlsCSS.musicControls}>
                <img className={musicControlsCSS.currentSongImg} src={props.image}/>
                <span className={musicControlsCSS.currentSongName}>{props.name}</span>
                <br/>
                <span className={musicControlsCSS.currentSongArtist}>{props.artist}</span>
                <img className={musicControlsCSS.playNext} src={nextTrack} onClick={props.playNext}/>
                <img className={musicControlsCSS.playPrevious} src={previousTrack} onClick={props.playPrevious}/>
        </div>
    )
}

export default MusicControls;