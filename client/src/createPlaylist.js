import React, { useEffect, useState } from 'react';
import createPlaylistCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/home.png';
import genre from './assets/menu.png';
import playlist from './assets/playlistActive.png';

function CreatePlaylist (){

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
                    <button className={createPlaylistCSS.createPlaylistLogout}>A</button>
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