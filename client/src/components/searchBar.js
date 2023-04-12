import React, { useEffect, useState } from 'react';
import searchCSS from '../home_genre_playlist.module.css';
import search from '../assets/search.png';

function SearchBar (props){

    return (
        <div className={searchCSS.searchBox}>
            <input className = {searchCSS.searchInput} type='text' placeholder="What's on your mind?" />
            <button className = {searchCSS.searchButton} onClick=''><img className = {searchCSS.searchImg} src={search}/></button>
        </div>
    )
}

export default SearchBar;