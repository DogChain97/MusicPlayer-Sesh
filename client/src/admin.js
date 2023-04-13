import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import adminCSS from './admin.module.css';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Admin(){
    const [table, setTable] = useState('');
    const [artistName, setArtistName] = useState('');
    const [artistImage, setArtistImage] = useState(''); 
    const [genreName, setGenreName] = useState('');
    const [genreImage, setGenreImage] = useState('');
    const [songName, setSongName] = useState('');
    const [songImage, setSongImage] = useState('');
    const [songUrl, setSongUrl] = useState('');
    const [songGenreID, setSongGenreID] = useState('');
    const [songArtistID, setSongArtistID] = useState('');
    const [operation, setOperation] = useState('')
    const [loginStatus, setLoginStatus] = useState('');

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
            console.log(response.data.message)
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
            console.log(response.data.message)
        })
    }

    const deleteArtist = () => {
        setTable("artist")
        setOperation("delete")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation,
        artistName: artistName
        }).then((response) => {
            console.log(response.data.message)
        })
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
            console.log(response.data.message)
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
            console.log(response.data.message)
        })
    }

    const deleteGenre = () => {
        setTable("genre")
        setOperation("delete")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation,
        genreName: genreName
        }).then((response) => {
            console.log(response.data.message)
        })
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
            console.log(response.data.message)
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
            console.log(response.data.message)
        })
    }

    const deleteSong = () => {
        setTable("song")
        setOperation("delete")
        Axios.post('http://localhost:7000/admin', {
        table: table,
        operation: operation,
        songName: songName
        }).then((response) => {
            console.log(response.data.message)
        })
    }

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
                <Col>
                    <div className={adminCSS.operation}>
                        <h2>Add:</h2>
                            <input type='text' placeholder='name' onChange={(e)=>{
                            setArtistName(e.target.value);
                            }}/><br/>
                            <input type='text' placeholder='image-url' onChange={(e)=>{
                            setArtistImage(e.target.value);
                            }}/><br/>
                            <button onClick={addArtist}>Add Artist</button>
                    </div>
                </Col>
                <Col>
                    <div className={adminCSS.operation}>
                        <h2>Update:</h2>
                            <input type='text' placeholder='name of artist to update' onChange={(e)=>{
                            setArtistName(e.target.value);
                            }}/><br/>
                            <input type='text' placeholder='new image-url' onChange={(e)=>{
                            setArtistImage(e.target.value);
                            }}/><br/>
                            <button onClick={updateArtist}>Update Artist Image</button>
                    </div>
                </Col>
                <Col>
                    <div className={adminCSS.operation}>
                        <h2>Delete:</h2>
                            <input type='text' placeholder='name' onChange={(e)=>{
                            setArtistName(e.target.value);
                            }}/><br/>
                            <button onClick={deleteArtist}>Delete Artist</button>
                    </div>
                </Col>
            </Row>
            <br/>
            <Row>
            <h1>Genre</h1>
                <Col>
                    <h2>Add:</h2>
                    <input type='text' placeholder='name' onChange={(e)=>{
                    setGenreName(e.target.value);
                    }}/><br/>
                    <input type='text' placeholder='image-url' onChange={(e)=>{
                    setGenreImage(e.target.value);
                    }}/><br/>
                    <button onClick={addGenre}>Add Genre</button>
                    <br/><br/>
                </Col>
                <Col>
                    <h2>Update:</h2>
                    <input type='text' placeholder='name of artist to update' onChange={(e)=>{
                    setGenreName(e.target.value);
                    }}/><br/>
                    <input type='text' placeholder='new image-url' onChange={(e)=>{
                    setGenreImage(e.target.value);
                    }}/><br/>
                    <button onClick={updateGenre}>Update Genre Image</button>
                </Col>
                <Col>
                    <h2>Delete:</h2>
                    <input type='text' placeholder='name' onChange={(e)=>{
                    setGenreName(e.target.value);
                    }}/><br/>
                    <button onClick={deleteGenre}>Delete Genre</button>
                </Col>
            </Row>
            <br/>
            <Row>
            <h1>Song</h1>
                <Col>
                    <h2>Add:</h2>
                    <input type='text' placeholder='name' onChange={(e)=>{
                    setSongName(e.target.value);
                    }}/><br/>
                    <input type='text' placeholder='image-url' onChange={(e)=>{
                    setSongImage(e.target.value);
                    }}/><br/>
                    <input type='text' placeholder='song-url' onChange={(e)=>{
                    setSongUrl(e.target.value);
                    }}/><br/>
                    <input type='number' placeholder='genre id' onChange={(e)=>{
                    setSongGenreID(e.target.value);
                    }}/><br/>
                    <input type='number' placeholder='artist id' onChange={(e)=>{
                    setSongArtistID(e.target.value);
                    }}/><br/>
                    <button onClick={addSong}>Add Song</button>
                    <br/><br/>
                </Col>
                <Col>
                    <h2>Update:</h2>
                    <input type='text' placeholder='name of song to update' onChange={(e)=>{
                    setSongName(e.target.value);
                    }}/><br/>
                    <input type='text' placeholder='new image-url' onChange={(e)=>{
                    setSongImage(e.target.value);
                    }}/><br/>
                    <input type='text' placeholder='new song-url' onChange={(e)=>{
                    setSongUrl(e.target.value);
                    }}/><br/>
                    <button onClick={updateSong}>Update Song Image</button>
                </Col>
                <Col>
                    <h2>Delete:</h2>
                    <input type='text' placeholder='name' onChange={(e)=>{
                    setSongName(e.target.value);
                    }}/><br/>
                    <button onClick={deleteSong}>Delete Song</button>
                </Col>
            </Row>
         </Container>
    </div>
    )
}

export default Admin;