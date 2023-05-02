import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import userPlaylistCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/home.png';
import genre from './assets/menu.png';
import playlist from './assets/playlistActive.png';
import Playlists from './components/playlists';
import SearchBar from './components/searchBar';
import MusicPlayer from './components/musicPlayer';

function UserPlaylist (){
    var iniData = []
    var dataX = []
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const {name,id} = useParams();
    const [songs, setSongs] = useState([])
    const [plimages, setplImages] = useState([])
    const [plsongs, setplSongs] = useState([])
    const [plurls, setplUrls] = useState([])
    const [plartists, setplArtists] = useState([])
    const [plgenres, setplGenres] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [ids, setIds] = useState([])
    const [currentSongImg, setCurrentSongImg] = useState()
    const [currentSongName, setCurrentSongName] = useState('')
    const [currentSongUrl, setCurrentSongUrl] = useState('')
    const [currentSongArtist, setCurrentSongArtist] = useState('')
    const [isShown, setIsShown] = useState(false);
    const [clickedOptions, setClickedOptions] = useState(false)
    const [addedStatus, setAddedStatus] = useState('')
    const [data, setData] = useState([])
    const [asc, setAsc] = useState(true)

    // Queue
    const [songQueue, setSongQueue] = useState([])
    const [songImageQueue, setSongImageQueue] = useState([])
    const [songNameQueue, setSongNameQueue] = useState([])
    const [songArtistQueue, setSongArtistQueue] = useState([])
    
    const [previousSong, setPreviousSong] = useState([])
    const [previousImage, setPreviousImage] = useState([])
    const [previousName, setPreviousName] = useState([])
    const [previousArtist, setPreviousArtist] = useState([])

    Axios.defaults.withCredentials = true
    useEffect(() => {

        Axios.get(`http://localhost:7000/playlist/${name}/${id}`).then((response) => {
            if(response.data.loggedIn === true){
                setUser(response.data.user[0].u_name)
                setSongs(response.data.songs)
                setplImages(response.data.plimages)
                setplSongs(response.data.plsongs)
                setplUrls(response.data.plurls)
                setplArtists(response.data.plartists)
                setplGenres(response.data.plgenres)
                setPlaylists(response.data.playlists)
                setIds(response.data.ids)

                setSongQueue(response.data.plurls)
                setSongImageQueue(response.data.plimages)
                setSongNameQueue(response.data.plsongs)
                setSongArtistQueue(response.data.plartists)

                for(var i=0;i<response.data.plimages.length;i++){
                    iniData.push({
                        no: (i+1),
                        img: response.data.plimages[i],
                        song: response.data.plsongs[i],
                        url: response.data.plurls[i],
                        artist: response.data.plartists[i],
                        genre: response.data.plgenres[i],
                    }
                    )
                }
                for(var i=0;i<iniData.length/2;i++){
                    dataX[i] = iniData[i] 
                }
                setData(dataX)

            }else{
                navigate("/")
            }
        })
    }, [])

    
    for(var i=0;i<plimages.length;i++){
        dataX.push({
            no: (i+1),
            img: plimages[i],
            song: plsongs[i],
            url: plurls[i],
            artist: plartists[i],
            genre: plgenres[i]
        }
        )
    }

    const sort = (e)=>{
        var col = e.target.innerHTML.toLowerCase()
        var i=0,j
        setAsc(!asc)

        if(asc === true){
            while(i<dataX.length){
                j=i+1
                while(j<dataX.length){
                    if(dataX[j][col]>dataX[i][col]){
                        var temp = dataX[i]
                        dataX[i] = dataX[j]
                        dataX[j] = temp
                    }
                    j++
                }
                i++
            }
        }else if(asc === false){
            while(i<dataX.length){
                j=i+1
                while(j<dataX.length){
                    if(dataX[j][col]<dataX[i][col]){
                        var temp = dataX[i]
                        dataX[i] = dataX[j]
                        dataX[j] = temp
                    }
                    j++
                }
                i++
            }
        }
        setData(dataX)
    }

    const songClicked = (e) => {
        setIsShown(true);
        setCurrentSongImg(e.target.dataset.img);
        setCurrentSongName(e.target.dataset.name)
        setCurrentSongArtist(e.target.dataset.artist)
        setCurrentSongUrl(e.target.dataset.url);
    }

    const showOptions = ()=>{
        setClickedOptions(!clickedOptions);
    }

    const addSong = (e)=>{
        Axios.post('http://localhost:7000/addsong',{
            id: id,
            song: e.target.innerHTML
        }).then((response)=>{
            if(response.data.message){
                setAddedStatus(response.data.message)
            }else{
                console.log("failed")
            }
        })
    }

    const logout = () => {
        Axios.post('http://localhost:7000/logout')
        navigate("/")
    }

    const addSongToQueue = (song)=>{
        setSongQueue([song, ...songQueue]);
        
    }

    const playNextSong = ()=>{
        console.log(songQueue)
        if(!songQueue.length){
            setCurrentSongUrl(null)
            return
        }
        const [nextSong, ...restOfQueue] = songQueue
        const [nextImage, ...restOfImage] = songImageQueue
        const [nextName, ...restOfName] = songNameQueue
        const [nextArtist, ...restOfArtist] = songArtistQueue
        setSongQueue(restOfQueue)
        setSongImageQueue(restOfImage)
        setSongNameQueue(restOfName)
        setSongArtistQueue(restOfArtist)

        setPreviousSong([...previousSong, currentSongUrl])
        setPreviousImage([...previousImage, currentSongImg])
        setPreviousName([...previousName, currentSongName])
        setPreviousArtist([...previousArtist, currentSongArtist])

        setCurrentSongUrl(nextSong)
        setCurrentSongImg(nextImage)
        setCurrentSongName(nextName)
        setCurrentSongArtist(nextArtist)
    }

    const playPreviousSong = ()=>{
        if(!previousSong.length){
            return
        }
        const [lastSong, ...restOfPlayed] = previousSong.reverse()
        const [lastImage, ...restOfImage] = previousImage.reverse()
        const [lastName, ...restOfName] = previousName.reverse()
        const [lastArtist, ...restOfArtist] = previousArtist.reverse()

        setPreviousSong(restOfPlayed.reverse())
        setPreviousImage(restOfImage.reverse())
        setPreviousName(restOfName.reverse())
        setPreviousArtist(restOfArtist.reverse())

        setSongQueue([lastSong, ...songQueue])
        setSongImageQueue([lastImage, ...songImageQueue])
        setSongNameQueue([lastName, ...songNameQueue])
        setSongArtistQueue([lastArtist, ...songArtistQueue])

        setCurrentSongUrl(lastSong)
        setCurrentSongImg(lastImage)
        setCurrentSongName(lastName)
        setCurrentSongArtist(lastArtist)
    }

    return (
        <div className={userPlaylistCSS.main}>
            <div className={userPlaylistCSS.leftPanel}>
                <h1 className={userPlaylistCSS.brand}><img src={logo} />SESH</h1>
                <h2 className={userPlaylistCSS.tabName}><a href='/home'><img className={userPlaylistCSS.tabs} src={home} />Home</a></h2>
                <h2 className={userPlaylistCSS.tabName}><a href='/genre'><img className={userPlaylistCSS.tabs} src={genre} />Genre</a></h2>
                <h2 className={userPlaylistCSS.tabName}><a href='/createPlaylist'><img className={userPlaylistCSS.tabs} src={playlist} />Create Playlist</a></h2>
                <hr/><br/>
                <Playlists playlists={playlists} ids={ids} />
            </div>

            <div className={userPlaylistCSS.rightPanel}>
                <div className={userPlaylistCSS.createPlaylistSearchPanel}>
                    <button onClick={showOptions} className={userPlaylistCSS.logout}>{user.charAt(0)}</button>
                    {clickedOptions && 
                        <ul className={userPlaylistCSS.userOptions}>
                            <li className={userPlaylistCSS.userLogout} onClick={logout}>Logout</li>
                        </ul> 
                    }
                    <br/>
                    <div className={userPlaylistCSS.titleDetails}>
                        <h2 className={userPlaylistCSS.pltitle}>{name}</h2>
                        <SearchBar className={userPlaylistCSS.plsearchbar} data={songs} placeholder="Search for songs to add to playlist" onClick={addSong}/>
                        <label className={userPlaylistCSS.searchLabel}>Click to add song</label>
                        <label className={userPlaylistCSS.addedstatus}>{addedStatus}</label>
                    </div>
                </div>

                <div className={userPlaylistCSS.createPlaylistContentPanel}>

                    <table className={userPlaylistCSS.usplTable}>
                        <tr className={userPlaylistCSS.songsHeader}>
                            
                            <th className={userPlaylistCSS.no}>#</th>
                            <th>Image</th>
                            <th onClick={sort}>Song</th>
                            <th onClick={sort}>Artist</th>
                            <th onClick={sort}>Genre</th>
                            <img className={userPlaylistCSS.playSong} src={playlist}/>
                        </tr>
                        {data.map((val,key)=>{
                            return(
                                <tr className={userPlaylistCSS.songRow} key={key} data-img={val.img} data-artist={val.artist} data-name={val.song} data-url={val.url} onClick={songClicked}>
                                        <td className={userPlaylistCSS.no} data-img={val.img} data-artist={val.artist} data-name={val.song} data-url={val.url} onClick={songClicked}>{val.no}</td>
                                        <td data-img={val.img} data-artist={val.artist} data-name={val.song} data-url={val.url} onClick={songClicked}><img className={userPlaylistCSS.tableImg} src={val.img} data-img={val.img} data-artist={val.artist} data-name={val.song} data-url={val.url} onClick={songClicked}/></td>
                                        <td data-img={val.img} data-artist={val.artist} data-name={val.song} data-url={val.url} onClick={songClicked}>{val.song}</td>
                                        <td data-img={val.img} data-artist={val.artist} data-name={val.song} data-url={val.url} onClick={songClicked}>{val.artist}</td>
                                        <td data-img={val.img} data-artist={val.artist} data-name={val.song} data-url={val.url} onClick={songClicked}>{val.genre}</td>
                                        <img className={userPlaylistCSS.playSong} src={playlist} />     
                                </tr>
                            )
                        })
                        }
                    </table>

                    
                </div>
            </div>  
            {isShown && 
                <MusicPlayer image={currentSongImg} name={currentSongName} artist={currentSongArtist} src={currentSongUrl} onEnded={playNextSong} playNext={playNextSong} playPrevious={playPreviousSong}/>
            
            }          
        </div>
    )
}

export default UserPlaylist;