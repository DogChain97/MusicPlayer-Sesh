import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import genreCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/home.png';
import genre from './assets/menuActive.png';
import playlist from './assets/playlist.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GenreCard from './components/genreCard';
import Playlists from './components/playlists';

function Genre (){
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const [images, setImages] = useState([])
    const [genres, setGenres] = useState([])
    const [clickedOptions, setClickedOptions] = useState(false)
    const [playlists, setPlaylists] = useState([])
    const [ids, setIds] = useState([])

    Axios.defaults.withCredentials = true
    useEffect(() => {
        Axios.get('http://localhost:7000/genre').then((response) => {
            if(response.data.loggedIn === true){
                setUser(response.data.user[0].u_name)
                setImages(response.data.images)
                setGenres(response.data.genres)
                setPlaylists(response.data.playlists)
                setIds(response.data.ids)
            }else{
                navigate("/")
            }
        })
    }, [])

    const showOptions = ()=>{
        setClickedOptions(!clickedOptions);
    }

    const logout = () => {
        Axios.post('http://localhost:7000/logout')
        navigate("/")
    }

    return (
        <div className={genreCSS.main}>
            <div className={genreCSS.leftPanel}>
                <h1 className={genreCSS.brand}><img src={logo} />SESH</h1>
                <h2 className={genreCSS.tabName}><a href='/home'><img className={genreCSS.tabs} src={home} />Home</a></h2>
                <h2 className={genreCSS.tabName}><a className={genreCSS.active} href='/genre'><img className={genreCSS.tabs} src={genre} />Genre</a></h2>
                <h2 className={genreCSS.tabName}><a href='/createPlaylist'><img className={genreCSS.tabs} src={playlist} />Create Playlist</a></h2>
                <hr/><br/>
                <Playlists playlists={playlists} ids={ids} />
            </div>

            <div className={genreCSS.rightPanel}>
                <div className={genreCSS.genreSearchPanel}>
                    <button onClick={showOptions} className={genreCSS.logout}>{user.charAt(0)}</button>
                    {clickedOptions && 
                        <ul className={genreCSS.userOptions}>
                            <li className={genreCSS.userLogout} onClick={logout}>Logout</li>
                        </ul>
                    }
                </div>

                <div className={genreCSS.contentPanel}>
                
                    <div>
                        <h3 className={genreCSS.contentTitle}>Browse All</h3>
                        <Container>
                            <Row >
                                <Col className={genreCSS.gridColumn}>
                                    <GenreCard img={images[0]} title={genres[0]} to={`/genre/${genres[0]}`}/>
                                </Col>
                                <Col className={genreCSS.gridColumn}>
                                    <GenreCard img={images[1]} title={genres[1]} to={`/genre/${genres[1]}`}/>
                                </Col>
                                <Col className={genreCSS.gridColumn}>
                                    <GenreCard img={images[2]} title={genres[2]} to={`/genre/${genres[2]}`}/>
                                </Col>
                                <Col className={genreCSS.gridColumn}>
                                    <GenreCard img={images[3]} title={genres[3]} to={`/genre/${genres[3]}`}/>
                                </Col>
                            </Row>
                            <Row >
                                <Col className={genreCSS.gridColumn}>
                                    <GenreCard img={images[4]} title={genres[4]} to={`/genre/${genres[4]}`}/>
                                </Col>
                                <Col className={genreCSS.gridColumn}>
                                    <GenreCard img={images[5]} title={genres[5]} to={`/genre/${genres[5]}`}/>
                                </Col>
                                <Col className={genreCSS.gridColumn}>
                                    <GenreCard img={images[6]} title={genres[6]} to={`/genre/${genres[6]}`}/>
                                </Col>
                                <Col className={genreCSS.gridColumn}>
                                    <GenreCard img={images[7]} title={genres[7]} to={`/genre/${genres[7]}`}/>
                                </Col>
                            </Row>
                        </Container>
                    </div>                
                </div>
            </div>            
            
        </div>
    )
}

export default Genre;