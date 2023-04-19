import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import adminCSS from './admin.module.css';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Admin(){
    const [table, setTable] = useState('');
    
    const [operation, setOperation] = useState('')
    const [loginStatus, setLoginStatus] = useState('');

    const [artistID, setArtistID] = useState('')
    const [artistName, setArtistName] = useState('');
    const [artistImage, setArtistImage] = useState(''); 
    const [artistOperationStatus, setArtistOperationStatus] = useState('')
    // For Show
    const [aID, setAID] = useState('')
    const [aName, setAName] = useState('')
    const [aImg, setAImg] = useState('')

    const [genreName, setGenreName] = useState('');
    const [genreImage, setGenreImage] = useState('');
    const [genreID, setGenreID] = useState('')
    const [genreOperationStatus, setGenreOperationStatus] = useState('')
    // For Show
    const [gID, setGID] = useState('')
    const [gName, setGName] = useState('')
    const [gImg, setGImg] = useState('')

    const [songID, setSongID] = useState('')
    const [songName, setSongName] = useState('');
    const [songImage, setSongImage] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [songGenreID, setSongGenreID] = useState('');
    const [songArtistID, setSongArtistID] = useState('');
    const [songOperationStatus, setSongOperationStatus] = useState('')
    // For Show
    const [sID, setSID] = useState('')
    const [sName, setSName] = useState('')
    const [sImg, setSImg] = useState('')
    const [sUrl, setSUrl] = useState('')
    const [sGenreID, setSGenreID] = useState('')
    const [sArtistID, setSArtistID] = useState('')

    const navigate = useNavigate();
    Axios.defaults.withCredentials = true
    // ARTIST FUNCTIONS
    const addArtist = () => {
        setTable("artist")
        setOperation("add")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation,
        artistName: artistName, 
        artistImage: artistImage
        }).then((response) => {
            setArtistOperationStatus(response.data.message)
        })
    }

    const updateArtist = () => {
        setTable("artist")
        setOperation("update")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation,
        artistName: artistName, 
        artistImage: artistImage
        }).then((response) => {
            setArtistOperationStatus(response.data.message)
        })
    }

    const deleteArtist = () => {
        setTable("artist")
        setOperation("delete")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation,
        artistID: artistID
        }).then((response) => {
            setArtistOperationStatus(response.data.message)
        })
    }

    const showArtist = (e) => {
        setTable("artist")
        setOperation("show")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation
        }).then((response) => {
                setAID(response.data.artistID)
                setAName(response.data.artistName)
                setAImg(response.data.artistImage)
            setArtistOperationStatus(response.data.message)
        })
    }

    const artistData = [];
    for(var i=0;i<aID.length;i++){
        artistData.push({
            id: aID[i],
            name: aName[i],
            image: aImg[i],
        }
        )
    }    

    // GENRE FUNCTIONS
    const addGenre = () => {
        setTable("genre")
        setOperation("add")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation,
        genreName: genreName, 
        genreImage: genreImage
        }).then((response) => {
            setGenreOperationStatus(response.data.message)
        })
    }

    const updateGenre = () => {
        setTable("genre")
        setOperation("update")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation,
        genreName: genreName, 
        genreImage: genreImage
        }).then((response) => {
            setGenreOperationStatus(response.data.message)
        })
    }

    const deleteGenre = () => {
        setTable("genre")
        setOperation("delete")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation,
        genreID: genreID
        }).then((response) => {
            setGenreOperationStatus(response.data.message)
        })
    }

    const showGenre = () => {
        setTable("genre")
        setOperation("show")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation
        }).then((response) => {
            setGID(response.data.genreID)
            setGName(response.data.genreName)
            setGImg(response.data.genreImage)
            setGenreOperationStatus(response.data.message)
        })
    }

    const genreData = [];
    for(var i=0;i<gID.length;i++){
        genreData.push({
            id: gID[i],
            name: gName[i],
            image: gImg[i],
        }
        )
    }

    // SONG FUNCTIONS
    const addSong = () => {
        setTable("song")
        setOperation("add")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation,
        songName: songName, 
        songImage: songImage,
        songUrl: songUrl,
        songGenreID: songGenreID,
        songArtistID: songArtistID
        }).then((response) => {
            setSongOperationStatus(response.data.message)
        })
    }

    const updateSong = () => {
        setTable("song")
        setOperation("update")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation,
        songName: songName, 
        songImage: songImage,
        songUrl: songUrl
        }).then((response) => {
            setSongOperationStatus(response.data.message)
        })
    }

    const deleteSong = () => {
        setTable("song")
        setOperation("delete")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation,
        songID: songID
        }).then((response) => {
            setSongOperationStatus(response.data.message)
        })
    }

    const showSong = () => {
        setTable("song")
        setOperation("show")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation
        }).then((response) => {
            setSID(response.data.songID)
            setSName(response.data.songName)
            setSImg(response.data.songImage)
            setSUrl(response.data.songUrl)
            setSGenreID(response.data.songGenreID)
            setSArtistID(response.data.songArtistID)
            setSongOperationStatus(response.data.message)
        })
    }

    const songData = [];
    for(var i=0;i<sID.length;i++){
        songData.push({
            id: sID[i],
            name: sName[i],
            image: sImg[i],
            url: sUrl[i],
            genreid: sGenreID[i],
            artistid: sArtistID[i]
        }
        )
    }

    // Logout Function
    const logout = () => {
        setLoginStatus(false)
        Axios.post('http://localhost:7000/admin', {
            admin: loginStatus
        })
        navigate("/")
    }

    useEffect(() => {
        Axios.get('http://localhost:7000/admin').then((response) => {
            if(response.data.admin === true){
                console.log("Admin")
            }else{
                navigate("/")
            }
        })
    }, [])



    return (
        <div className={adminCSS.main}>
         <div className={adminCSS.logout}>
            <h1 className={adminCSS.title}>ADMIN</h1>
            <button onClick={logout}>Logout</button>
         </div>
         <Container>
            
            <Row>
            <h1>Artist</h1>
            <br/><br/><br/>
                <Col>
                    <div className={adminCSS.operation}>
                        <h2>Add:</h2>
                            <label>Artist Name:</label>
                            <input type='text' placeholder='name' onChange={(e)=>{
                            setArtistName(e.target.value);
                            }}/><br/>
                            <label>Artist Image URL:</label>
                            <input type='text' placeholder='image-url' onChange={(e)=>{
                            setArtistImage(e.target.value);
                            }}/><br/>
                            <button onClick={addArtist}>Add Artist</button>
                    </div>
                </Col>
                <Col>
                    <div className={adminCSS.operation}>
                        <h2>Update:</h2>
                            <label>Artist Name:</label>
                            <input type='text' placeholder='name of artist to update' onChange={(e)=>{
                            setArtistName(e.target.value);
                            }}/><br/>
                            <label>Artist Image URL:</label>
                            <input type='text' placeholder='new image-url' onChange={(e)=>{
                            setArtistImage(e.target.value);
                            }}/><br/>
                            <button onClick={updateArtist}>Update Artist Image</button>
                    </div>
                </Col>
                <Col>
                    <div className={adminCSS.operation}>
                        <h2>Delete:</h2>
                            <label>Artist ID:</label>
                            <br/>
                            <select name='select' onClick={showArtist} onChange={(e)=>{
                            setArtistID(e.target.value);
                            }}>
                                    {artistData.map(item=>{
                                        return(
                                            <option key={item.id} value={item.id}>{item.id}</option>
                                        )
                                    })}
                            </select>
                            <br/>
                            <button onClick={deleteArtist}>Delete Artist</button>
                    </div>
                </Col>
                <Col>
                    <div className={adminCSS.operation}>
                        <h2>Show:</h2>
                            <button name='button' onClick={showArtist}>Show Artist Table</button>
                        <table className={adminCSS.admTable}>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Image</th>
                            </tr>
                            {artistData.map((val,key)=>{
                                return(
                                    <tr key={key}>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.image}</td>
                                    </tr>
                                )
                            })
                            }
                        </table>
                    </div>
                </Col>
                <h2>{artistOperationStatus}</h2>
                <hr/>
            </Row>
            
            <br/>
            
            <Row>
            <br/>
            <h1>Genre</h1>
            <br/><br/><br/>
                <Col>
                    <h2>Add:</h2>
                    <label>Genre Name:</label>
                    <input type='text' placeholder='name' onChange={(e)=>{
                    setGenreName(e.target.value);
                    }}/><br/>
                    <label>Genre Image URL:</label>
                    <input type='text' placeholder='image-url' onChange={(e)=>{
                    setGenreImage(e.target.value);
                    }}/><br/>
                    <button onClick={addGenre}>Add Genre</button>
                    <br/><br/>
                </Col>
                <Col>
                    <h2>Update:</h2>
                    <label>Genre Name:</label>
                    <input type='text' placeholder='name of genre to update' onChange={(e)=>{
                    setGenreName(e.target.value);
                    }}/><br/>
                    <label>Genre Image URL:</label>
                    <input type='text' placeholder='new genre image-url' onChange={(e)=>{
                    setGenreImage(e.target.value);
                    }}/><br/>
                    <button onClick={updateGenre}>Update Genre Image</button>
                </Col>
                <Col>
                    <h2>Delete:</h2>
                    <label>Genre ID:</label>
                    <br/>
                    <select name='select' onClick={showGenre} onChange={(e)=>{
                            setGenreID(e.target.value);
                            }}>
                                    {genreData.map(item=>{
                                        return(
                                            <option key={item.id} value={item.id}>{item.id}</option>
                                        )
                                    })}
                            </select><br/>
                    <button onClick={deleteGenre}>Delete Genre</button>
                </Col>
                <Col>
                    <div className={adminCSS.operation}>
                        <h2>Show:</h2>
                            <button onClick={showGenre}>Show Genre Table</button>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Image</th>
                            </tr>
                            {genreData.map((val,key)=>{
                                return(
                                    <tr key={key}>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.image}</td>
                                    </tr>
                                )
                            })
                            }
                        </table>
                    </div>
                </Col>
                <h2>{genreOperationStatus}</h2>
                <hr/>
            </Row>

            <br/>
            
            <Row>
            <br/>
            <h1>Song</h1>
            <br/><br/><br/>
                <Col>
                    <h2>Add:</h2>
                    <label>Song Name:</label>
                    <input type='text' placeholder='name' onChange={(e)=>{
                    setSongName(e.target.value);
                    }}/><br/>
                    <label>Song Image URL:</label>
                    <input type='text' placeholder='image-url' onChange={(e)=>{
                    setSongImage(e.target.value);
                    }}/><br/>
                    <label>Song URL:</label>
                    <br/>
                    <input type='text' placeholder='song-url' onChange={(e)=>{
                    setSongUrl(e.target.value);
                    }}/><br/>
                    <label>Genre ID:</label>
                    <br/>
                    <input type='number' placeholder='genre id' onChange={(e)=>{
                    setSongGenreID(e.target.value);
                    }}/><br/>
                    <label>Artist ID:</label>
                    <br/>
                    <input type='number' placeholder='artist id' onChange={(e)=>{
                    setSongArtistID(e.target.value);
                    }}/><br/>
                    <button onClick={addSong}>Add Song</button>
                    <br/><br/>
                </Col>
                <Col>
                    <h2>Update:</h2>
                    <label>Song Name:</label>
                    <input type='text' placeholder='name of song to update' onChange={(e)=>{
                    setSongName(e.target.value);
                    }}/><br/>
                    <label>Song Image URL:</label>
                    <input type='text' placeholder='new image-url' onChange={(e)=>{
                    setSongImage(e.target.value);
                    }}/><br/>
                    <label>Song URL:</label>
                    <br/>
                    <input type='text' placeholder='new song-url' onChange={(e)=>{
                    setSongUrl(e.target.value);
                    }}/><br/>
                    <button onClick={updateSong}>Update Song Image</button>
                </Col>
                <Col>
                    <h2>Delete:</h2>
                    <label>Song ID:</label>
                    <br/>
                    <select name='select' onClick={showSong} onChange={(e)=>{
                            setSongID(e.target.value);
                            }}>
                                    {songData.map(item=>{
                                        return(
                                            <option key={item.id} value={item.id}>{item.id}</option>
                                        )
                                    })}
                            </select><br/>
                    <button onClick={deleteSong}>Delete Song</button>
                </Col>
                <Col>
                    <div className={adminCSS.operation}>
                        <h2>Show:</h2>
                            <button onClick={showSong}>Show Songs Table</button>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Url</th>
                                <th>Genre ID</th>
                                <th>Artist ID</th>
                            </tr>
                            {songData.map((val,key)=>{
                                return(
                                    <tr key={key}>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.image}</td>
                                        <td>{val.url}</td>
                                        <td>{val.genreid}</td>
                                        <td>{val.artistid}</td>
                                    </tr>
                                )
                            })
                            }
                        </table>
                    </div>
                </Col>
                <h2>{songOperationStatus}</h2>
            </Row>
         </Container>
    </div>
    )
}

export default Admin;