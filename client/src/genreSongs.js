import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import genreSongsCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/home.png';
import genre from './assets/menu.png';
import playlist from './assets/playlistActive.png';
import { useParams } from "react-router-dom";
import Playlists from './components/playlists';
import MusicPlayer from './components/musicPlayer';

function GenreSongs (){
    var iniData = []
    var dataX = []
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const {param} = useParams();
    const [images, setImages] = useState([])
    const [songs, setSongs] = useState([])
    const [urls, setUrls] = useState([])
    const [artists, setArtists] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [ids, setIds] = useState([])
    const [genreImg, setGenreImg] = useState('')
    const [currentSongImg, setCurrentSongImg] = useState()
    const [currentSongName, setCurrentSongName] = useState('')
    const [currentSongUrl, setCurrentSongUrl] = useState('')
    const [currentSongArtist, setCurrentSongArtist] = useState('')
    const [isShown, setIsShown] = useState(false);
    const [clickedOptions, setClickedOptions] = useState(false)
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

        Axios.get(`http://localhost:7000/genre/${param}`).then((response) => {
            if(response.data.loggedIn === true){
                setUser(response.data.user[0].u_name)
                setImages(response.data.images)
                setSongs(response.data.songs)
                setUrls(response.data.urls)
                setArtists(response.data.artists)
                setGenreImg(response.data.genreImg)
                setPlaylists(response.data.playlists)
                setIds(response.data.ids)

                setSongQueue(response.data.urls)
                setSongImageQueue(response.data.images)
                setSongNameQueue(response.data.songs)
                setSongArtistQueue(response.data.artists)

                for(var i=0;i<response.data.images.length;i++){
                    iniData.push({
                        no: (i+1),
                        img: response.data.images[i],
                        song: response.data.songs[i],
                        url: response.data.urls[i],
                        artist: response.data.artists[i],
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

        for(var i=0;i<images.length;i++){
            dataX.push({
                no: (i+1),
                img: images[i],
                song: songs[i],
                url: urls[i],
                artist: artists[i],
            }
            )
        }

    const sortS = ()=>{
        var i=0,j
        setAsc(!asc)

        if(asc === true){
            while(i<dataX.length){
                j=i+1
                while(j<dataX.length){
                    if(dataX[j].song>dataX[i].song){
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
                    if(dataX[j].song<dataX[i].song){
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

    const logout = () => {
        Axios.post('http://localhost:7000/logout')
        navigate("/")
    }

    const addSongToQueue = (song)=>{
        setSongQueue([song, ...songQueue]);
        
    }

    const playNextSong = ()=>{
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
        <div className={genreSongsCSS.main}>
            <div className={genreSongsCSS.leftPanel}>
                <h1 className={genreSongsCSS.brand}><img src={logo} />SESH</h1>
                <h2 className={genreSongsCSS.tabName}><a href='/home'><img className={genreSongsCSS.tabs} src={home} />Home</a></h2>
                <h2 className={genreSongsCSS.tabName}><a href='/genre'><img className={genreSongsCSS.tabs} src={genre} />Genre</a></h2>
                <h2 className={genreSongsCSS.tabName}><a href='/createPlaylist'><img className={genreSongsCSS.tabs} src={playlist} />Create Playlist</a></h2>
                <hr/><br/>
                <Playlists playlists={playlists} ids={ids} />
            </div>

            <div className={genreSongsCSS.rightPanel}>
                <div className={genreSongsCSS.createPlaylistSearchPanel}>
                    <button onClick={showOptions} className={genreSongsCSS.logout}>{user.charAt(0)}</button>
                    {clickedOptions && 
                        <ul className={genreSongsCSS.userOptions}>
                            <li className={genreSongsCSS.userLogout} onClick={logout}>Logout</li>
                        </ul>
                    }
                    <br/>
                    <div className={genreSongsCSS.titleDetails}>
                        <img className={genreSongsCSS.artist_genreImg} src={genreImg}/>
                        <h2 className={genreSongsCSS.artist_genreName}>{param}</h2>
                    </div>
                </div>

                <div className={genreSongsCSS.createPlaylistContentPanel}>

                    <table>
                        <tr className={genreSongsCSS.songsHeader}>
                            
                            <th className={genreSongsCSS.no}>#</th>
                            <th>Image</th>
                            <th onClick={sortS}>Song</th>
                            <th>Artist</th>
                            <img className={genreSongsCSS.playSong} src={playlist}/>
                        </tr>
                        {data.map((val,key)=>{
                            return(
                                <tr className={genreSongsCSS.songRow} key={key} data-img={val.img} data-artist={val.artist} data-name={val.song} data-url={val.url} onClick={songClicked}>
                                        <td className={genreSongsCSS.no}>{val.no}</td>
                                        <td><img className={genreSongsCSS.tableImg} src={val.img} /></td>
                                        <td>{val.song}</td>
                                        <td>{val.artist}</td>
                                        <img className={genreSongsCSS.playSong} src={playlist} />     
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

export default GenreSongs;