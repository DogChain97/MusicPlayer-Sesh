import React, { useState } from 'react';
import searchCSS from '../home_genre_playlist.module.css';
import search from '../assets/search.png';

function SearchBar (props){
    let [finalData, setFinalData] = useState([])

    const data = props.data
    const lowerSearchArray = []
    for(let i=0;i<data.length;i++){
        lowerSearchArray.push(data[i].toLowerCase())
    }

    let searchData = []
    const handleChange = (e)=>{
        searchData = []
        let match = []
        let input = e.target.value.toLowerCase()

        for(let i=0;i<lowerSearchArray.length;i++){
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
                for(let k = 0;k<match.length;k++){
                    searchData.push({data:match[k]})
                    setFinalData(searchData)
                }
            }
            
        }
    }

    return (
        <div className={searchCSS.searchBox}>
            <input className = {searchCSS.searchInput} value={props.value} onChange={handleChange} type='text' placeholder={props.placeholder} />
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