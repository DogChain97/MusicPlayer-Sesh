import React, { useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import homeCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/homeActive.png';
import genre from './assets/menu.png';
import playlist from './assets/playlist.png';
import SearchBar from './components/searchBar';
import SongCard from './components/songCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Playlists from './components/playlists';
import MusicPlayer from './components/musicPlayer';

function Home (){
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const [images, setImages] = useState([])
    const [songs, setSongs] = useState([])
    const [urls, setUrls] = useState([])
    const [artists, setArtists] = useState([])
    const [genres, setGenres] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [ids, setIds] = useState([])
    const [currentSongImg, setCurrentSongImg] = useState('')
    const [currentSongName, setCurrentSongName] = useState('')
    const [currentSongArtist, setCurrentSongArtist] = useState('')
    const [currentSongUrl, setCurrentSongUrl] = useState('')
    const [isShown, setIsShown] = useState(false);
    const [clickedOptions, setClickedOptions] = useState(false)
    const progressBarRef = useRef();

    Axios.defaults.withCredentials = true
    useEffect(() => {
        Axios.get('http://localhost:7000/home').then((response) => {
            if(response.data.loggedIn === true){
                setUser(response.data.user[0].u_name)
                setImages(response.data.images)
                setSongs(response.data.songs)
                setUrls(response.data.urls)
                setArtists(response.data.artists)
                setGenres(response.data.genres)
                setPlaylists(response.data.playlists)
                setIds(response.data.ids)
            }else{
                navigate("/")
            }
        })
    }, [])

    // Search Functionality
    const searchArtists = artists.filter((item, index)=>artists.indexOf(item)===index)
    const searchArray = searchArtists.concat(songs)

    const songClicked = (e) => {
        setIsShown(true);
        setCurrentSongImg(e.target.src);
        setCurrentSongName(e.target.dataset.title)
        setCurrentSongArtist(e.target.dataset.artist)
        setCurrentSongUrl(e.target.dataset.url);
    }

    const loadPage = (e)=>{
        const clicked = e.target.innerHTML
        console.log(clicked)
        if(artists.includes(clicked)){
            navigate(`/artist/${clicked}`)
        }else if(songs.includes(clicked)){
            var index = songs.indexOf(clicked)
            setIsShown(true);
            setCurrentSongImg(images[index]);
            setCurrentSongArtist(artists[index])
            setCurrentSongName(songs[index])
            setCurrentSongUrl(urls[index]);
        }
    }

    const showOptions = ()=>{
        setClickedOptions(!clickedOptions);
    }

    const logout = () => {
        Axios.post('http://localhost:7000/logout')
        navigate("/")
    }

    const handleProgressChange = () => {
        console.log(progressBarRef.current.value);
      };

    return (
        <div className={homeCSS.main}>
            <div className={homeCSS.leftPanel}>
                <h1 className={homeCSS.brand}><img src={logo} alt='logo'/>SESH</h1>
                <h2 className={homeCSS.tabName}><a className={homeCSS.active} href='/home'><img className={homeCSS.tabs} src={home} alt='home' />Home</a></h2>
                <h2 className={homeCSS.tabName}><a href='/genre'><img className={homeCSS.tabs} src={genre} alt='genre'/>Genre</a></h2>
                <h2 className={homeCSS.tabName}><a href='/createPlaylist'><img className={homeCSS.tabs} src={playlist} alt='create'/>Create Playlist</a></h2>
                <hr/><br/>
                <Playlists playlists={playlists} ids={ids} />
            </div>

            <div className={homeCSS.rightPanel}>
                <div className={homeCSS.searchPanel}>
                    <div className={homeCSS.searchPanelConents}>
                        <SearchBar data={searchArray} placeholder="What's on your mind? Artists/Songs" onClick={loadPage}/>
                        <button onClick={showOptions} className={homeCSS.logout}>{user.charAt(0)}</button>
                        {clickedOptions && 
                            <ul className={homeCSS.userOptions}>
                                <li className={homeCSS.userLogout} onClick={logout}>Logout</li>
                            </ul>
                        }
                        
                    </div>
                </div>

                <div className={homeCSS.contentPanel}>
                    
                    <div className={homeCSS.welcomeText}>
                        <h1>Hello, {user}</h1>
                        <p>Hope you have a good sesh!</p>
                    </div>
                
                    <div>
                        <h3 className={homeCSS.contentTitle}>Top Songs</h3>
                        <Container>
                            <Row >
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={images[0]} title={songs[0]} artist={artists[0]} genre={genres[0]} url={urls[0]} onClick={songClicked}/>
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={images[9]} title={songs[9]} artist={artists[9]} genre={genres[9]} url={urls[9]} onClick={songClicked}/>
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={images[16]} title={songs[16]} artist={artists[16]} genre={genres[16]} url={urls[16]} onClick={songClicked}/>
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={images[7]} title={songs[7]} artist={artists[7]} genre={genres[7]} url={urls[7]} onClick={songClicked}/>
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={images[11]} title={songs[11]} artist={artists[11]} genre={genres[11]} url={urls[11]} onClick={songClicked}/>
                                </Col>
                            </Row>
                            
                            <Row >
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={images[26]} title={songs[26]} artist={artists[26]} genre={genres[26]} url={urls[26]} onClick={songClicked}/>
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={images[34]} title={songs[34]} artist={artists[34]} genre={genres[34]} url={urls[34]} onClick={songClicked}/>
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={images[35]} title={songs[35]} artist={artists[35]} genre={genres[35]} url={urls[35]} onClick={songClicked}/>
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={images[21]} title={songs[21]} artist={artists[21]} genre={genres[21]} url={urls[21]} onClick={songClicked}/>
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={images[19]} title={songs[19]} artist={artists[19]} genre={genres[19]} url={urls[19]} onClick={songClicked}/>
                                </Col>
                            </Row>
                        </Container>
                    </div>                
                </div>
            </div>   
            {isShown && 
              <MusicPlayer image={currentSongImg} name={currentSongName} artist={currentSongArtist} src={currentSongUrl} />
            }       
        </div>
    )
}

export default Home;