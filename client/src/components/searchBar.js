import React, { useEffect, useState } from 'react';
import searchCSS from '../home_genre_playlist.module.css';

function SearchBar (){

    return (
        <div className={searchCSS.searchBox}>
            <input className = {searchCSS.searchInput} type='text' placeholder="What's on your mind?" />
            <button className = {searchCSS.search} onClick=''><img src=''/></button>
        </div>
    )
}

export default SearchBar;