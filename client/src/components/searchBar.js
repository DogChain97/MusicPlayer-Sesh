import React, { useEffect, useState } from 'react';
import searchCSS from '../home_genre_playlist.module.css';
import search from '../assets/search.png';

function SearchBar (props){
    var [finalData, setFinalData] = useState([])

    const data = props.data
    const lowerSearchArray = []
    for(var i=0;i<data.length;i++){
        lowerSearchArray.push(data[i].toLowerCase())
    }

    var searchData = []
    const handleChange = (e)=>{
        searchData = []
        var match = []
        var input = e.target.value.toLowerCase()

        for(var i=0;i<lowerSearchArray.length;i++){
            if(lowerSearchArray[i].includes(input)){
                match.push(data[i])
            }
        }
        if(match.length == 0){ 
            searchData.push({data:"No results"})
            setFinalData(searchData)
        }else{
            if(e.target.value == ''){
                setFinalData([])
            }else if(match.length > 10){
                for(var j = 0;j<10;j++){
                    searchData.push({data:match[j]})
                    setFinalData(searchData)
                }
            }else{
                for(var j = 0;j<match.length;j++){
                    searchData.push({data:match[j]})
                    setFinalData(searchData)
                }
            }
            
        }
    }

    return (
        <div className={searchCSS.searchBox}>
            <input className = {searchCSS.searchInput} value={props.value} onChange={handleChange} type='text' placeholder="What's on your mind? Artists/Songs" />
            <button className = {searchCSS.searchButton} onClick=''><img className = {searchCSS.searchImg} src={search}/></button>
            <ul className={searchCSS.list}>
                {finalData.map(item=>{
                    return (
                        <li className={searchCSS.listItem} key={item.data} value={item.data} onClick={props.onClick}>{item.data}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SearchBar;