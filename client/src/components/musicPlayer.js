import React from 'react';
import musicPlayerCSS from '../home_genre_playlist.module.css';
import MusicControls from './musicControls';

function MusicPlayer (props) {

    return (
        
                <div className={musicPlayerCSS.audioBar}>
                    <MusicControls image={props.image} name={props.name} artist={props.artist} playNext={props.playNext} playPrevious={props.playPrevious}/>
                    <div className={musicPlayerCSS.audio}>
                        <audio src = {props.src} onEnded={props.onEnded} autoPlay controls/>
                    </div>
                </div>
           
    )
}

export default MusicPlayer;