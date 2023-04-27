import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import artistSongsCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/home.png';
import genre from './assets/menu.png';
import playlist from './assets/playlistActive.png';
import { useParams } from "react-router-dom";
import Playlists from './components/playlists';
import MusicPlayer from './components/musicPlayer';

function ArtistSongs (){
    var iniData = []
    var dataX = []
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const {param} = useParams();
    const [images, setImages] = useState([])
    const [songs, setSongs] = useState([])
    const [urls, setUrls] = useState([])
    const [genres, setGenres] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [ids, setIds] = useState([])
    const [artistImg, setArtistImg] = useState('')
    const [currentSongImg, setCurrentSongImg] = useState()
    const [currentSongName, setCurrentSongName] = useState('')
    const [currentSongUrl, setCurrentSongUrl] = useState('')
    const [currentSongArtist, setCurrentSongArtist] = useState('')
    const [isShown, setIsShown] = useState(false);
    const [clickedOptions, setClickedOptions] = useState(false)
    const [data, setData] = useState([])
    const [asc, setAsc] = useState(true)

    Axios.defaults.withCredentials = true
    useEffect(() => {
        Axios.get(`http://localhost:7000/artist/${param}`).then((response) => {
            if(response.data.loggedIn === true){
                setUser(response.data.user[0].u_name)
                setImages(response.data.images)
                setSongs(response.data.songs)
                setUrls(response.data.urls)
                setGenres(response.data.genres)
                setArtistImg(response.data.artistImg)
                setCurrentSongArtist(param)
                setPlaylists(response.data.playlists)
                setIds(response.data.ids)

                for(var i=0;i<response.data.images.length;i++){
                    iniData.push({
                        no: (i+1),
                        img: response.data.images[i],
                        song: response.data.songs[i],
                        url: response.data.urls[i],
                        genre: response.data.genres[i],
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
            genre: genres[i],
        }
        )
    }

    const sort = ()=>{
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
        setCurrentSongUrl(e.target.dataset.url);
    }

    const showOptions = ()=>{
        setClickedOptions(!clickedOptions);
    }

    const logout = () => {
        Axios.post('http://localhost:7000/logout')
        navigate("/")
    }

    return (
        <div className={artistSongsCSS.main}>
            <div className={artistSongsCSS.leftPanel}>
                <h1 className={artistSongsCSS.brand}><img src={logo} />SESH</h1>
                <h2 className={artistSongsCSS.tabName}><a href='/home'><img className={artistSongsCSS.tabs} src={home} />Home</a></h2>
                <h2 className={artistSongsCSS.tabName}><a href='/genre'><img className={artistSongsCSS.tabs} src={genre} />Genre</a></h2>
                <h2 className={artistSongsCSS.tabName}><a href='/createPlaylist'><img className={artistSongsCSS.tabs} src={playlist} />Create Playlist</a></h2>
                <hr/><br/>
                <Playlists playlists={playlists} ids={ids} />
            </div>

            <div className={artistSongsCSS.rightPanel}>
                <div className={artistSongsCSS.createPlaylistSearchPanel}>
                    <button onClick={showOptions} className={artistSongsCSS.logout}>{user.charAt(0)}</button>
                    {clickedOptions && 
                        <ul className={artistSongsCSS.userOptions}>
                            <li className={artistSongsCSS.userLogout} onClick={logout}>Logout</li>
                        </ul>
                    }
                    <br/>
                    <div className={artistSongsCSS.titleDetails}>
                        <img className={artistSongsCSS.artist_genreImg} src={artistImg}/>
                        <h2 className={artistSongsCSS.artist_genreName}>{param}</h2>
                    </div>
                </div>

                <div className={artistSongsCSS.playlistContentPanel}>
                <table>
                        <tr className={artistSongsCSS.songsHeader}>
                            
                            <th className={artistSongsCSS.no}>#</th>
                            <th>Image</th>
                            <th onClick={sort} >Song</th>
                            <th>Genre</th>
                            <img className={artistSongsCSS.playSong} src={playlist}/>
                        </tr>
                        {data.map((val,key)=>{
                            return(
                                <tr className={artistSongsCSS.songRow} key={key} data-img={val.img} data-name={val.song} data-url={val.url} onClick={songClicked} >
                                        <td className={artistSongsCSS.no}>{val.no}</td>
                                        <td><img className={artistSongsCSS.tableImg} src={val.img} /></td>
                                        <td>{val.song}</td>
                                        <td>{val.genre}</td>
                                        <img className={artistSongsCSS.playSong} src={playlist} />     
                                </tr>
                            )
                        })
                        }
                    </table>
                </div>
            </div>     
            {isShown && 
                <MusicPlayer image={currentSongImg} name={currentSongName} artist={currentSongArtist} src={currentSongUrl} />
            }        
        </div>
    )
}

export default ArtistSongs;