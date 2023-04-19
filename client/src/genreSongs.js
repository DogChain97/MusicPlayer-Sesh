import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import genreSongsCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/home.png';
import song from './assets/songs/3_Peg.mp3'
import genre from './assets/menu.png';
import playlist from './assets/playlistActive.png';
import { useParams } from "react-router-dom";

function GenreSongs (){
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const {param} = useParams();
    const [images, setImages] = useState([])
    const [songs, setSongs] = useState([])
    const [urls, setUrls] = useState([])
    const [artists, setArtists] = useState([])
    const [genreImg, setGenreImg] = useState('')
    const [currentSongImg, setCurrentSongImg] = useState()
    const [currentSongName, setCurrentSongName] = useState('')
    const [currentSongUrl, setCurrentSongUrl] = useState('')
    const [isShown, setIsShown] = useState(false);

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

                // var grid;
                // var columns = [
                //     {id: "#", name: "#", field: "no"},
                //     {id: "song", name: "Song", field: "song"},
                //     {id: "artist", name: "Artist", field: "artist"}
                // ];

                // var options = {
                //     enableCellNavigation: true,
                //     enableColumnReorder: false
                // };

                // console.log(songs)
                // function s() {
                //     var data = [];
                //     for (var i = 0; i < 8; i++) {
                //         data[i] = {
                //             no: (i+1),
                //             song: "song "+(i+1),
                //             artist: "artist "+ (i+1)
                //         };
                //     }

                //     grid = new Slick.Grid("#myGrid", data, columns, options);
                // }

                // s();
            }else{
                navigate("/")
            }
        })
    }, [])

    const data = [];
    for(var i=0;i<images.length;i++){
        data.push({
            no: (i+1),
            img: images[i],
            song: songs[i],
            url: urls[i],
            artist: artists[i],
        }
        )
    }

    const songClicked = (e) => {
        setIsShown(true);
        setCurrentSongImg(e.target.dataset.img);
        setCurrentSongName(e.target.dataset.name)
        setCurrentSongUrl(e.target.dataset.url)
    }

    return (
        <div className={genreSongsCSS.main}>
            <div className={genreSongsCSS.leftPanel}>
                <h1 className={genreSongsCSS.brand}><img src={logo} />SESH</h1>
                <h2 className={genreSongsCSS.tabName}><a href='/home'><img className={genreSongsCSS.tabs} src={home} />Home</a></h2>
                <h2 className={genreSongsCSS.tabName}><a href='/genre'><img className={genreSongsCSS.tabs} src={genre} />Genre</a></h2>
                <h2 className={genreSongsCSS.tabName}><a href='/createPlaylist'><img className={genreSongsCSS.tabs} src={playlist} />Create Playlist</a></h2>
            </div>

            <div className={genreSongsCSS.rightPanel}>
                <div className={genreSongsCSS.createPlaylistSearchPanel}>
                    <button className={genreSongsCSS.createPlaylistLogout}>{user.charAt(0)}</button>
                    <br/>
                    <img className={genreSongsCSS.genreImg} src={genreImg}/>
                    <h2 className={genreSongsCSS.genreName}>{param}</h2>
                </div>

                <div className={genreSongsCSS.playlistContentPanel}>

                    <table>
                        <tr className={genreSongsCSS.songsHeader}>
                            
                            <th className={genreSongsCSS.no}>#</th>
                            <th>Image</th>
                            <th>Song</th>
                            <th>Artist</th>
                            <img className={genreSongsCSS.playSong} src={playlist}/>
                        </tr>
                        {data.map((val,key)=>{
                            return(
                                <tr className={genreSongsCSS.songRow} key={key} >
                                        <td className={genreSongsCSS.no}>{val.no}</td>
                                        <td><img className={genreSongsCSS.tableImg} src={val.img} /></td>
                                        <td>{val.song}</td>
                                        <td>{val.artist}</td>
                                        <img className={genreSongsCSS.playSong} src={playlist} data-img={val.img} data-name={val.song} data-url={val.url} onClick={songClicked} />     
                                </tr>
                            )
                        })
                        }
                    </table>

                    {/* <table width="100%">
                        <tr>
                            <td valign="top" width="50%">
                                <div id="myGrid"></div>
                            </td>
                        </tr>
                    </table> */}
                </div>
            </div>  
            {isShown && 
            <div className={genreSongsCSS.musicControls}>
                <img className={genreSongsCSS.currentSongImg} src={currentSongImg}/>
            </div>  
            }          
        </div>
    )
}

export default GenreSongs;