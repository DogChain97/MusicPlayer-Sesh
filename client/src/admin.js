import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import adminCSS from './admin.module.css';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Admin(){
    const [loginStatus, setLoginStatus] = useState('');

    const [artistName, setArtistName] = useState('');
    const [artistImage, setArtistImage] = useState(''); 
    const [artistOperationStatus, setArtistOperationStatus] = useState('')
    // For Show
    const [aID, setAID] = useState('')
    const [aName, setAName] = useState('')
    const [aImg, setAImg] = useState('')

    const [genreName, setGenreName] = useState('');
    const [genreImage, setGenreImage] = useState('');
    const [genreOperationStatus, setGenreOperationStatus] = useState('')
    // For Show
    const [gID, setGID] = useState('')
    const [gName, setGName] = useState('')
    const [gImg, setGImg] = useState('')

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
        Axios.post('http://localhost:7000/addartist', {
        artistName: artistName, 
        artistImage: artistImage
        }).then((response) => {
            setArtistOperationStatus(response.data.message)
        }).catch(err =>{
            console.log(err)
        })
    }

    const updateArtist = () => {
        Axios.post('http://localhost:7000/updateartist', {
        artistName: artistName, 
        artistImage: artistImage
        }).then((response) => {
            setArtistOperationStatus(response.data.message)
        }).catch(err =>{
            console.log(err)
        })
    }

    const deleteArtist = () => {
        Axios.post('http://localhost:7000/deleteartist', {
        artistName: artistName
        }).then((response) => {
            setArtistOperationStatus(response.data.message)
        }).catch(err =>{
            console.log(err)
        })
    }

    const showArtist = (e) => {
        Axios.post('http://localhost:7000/showartist').then((response) => {
                setAID(response.data.artistID)
                setAName(response.data.artistName)
                setAImg(response.data.artistImage)
            setArtistOperationStatus(response.data.message)
        }).catch(err =>{
            console.log(err)
        })
    }

    const artistData = [];
    for(let i=0;i<aID.length;i++){
        artistData.push({
            id: aID[i],
            name: aName[i],
            image: aImg[i],
        }
        )
    }    

    // GENRE FUNCTIONS
    const addGenre = () => {
        Axios.post('http://localhost:7000/addgenre', {
        genreName: genreName, 
        genreImage: genreImage
        }).then((response) => {
            setGenreOperationStatus(response.data.message)
        }).catch(err =>{
            console.log(err)
        })
    }

    const updateGenre = () => {
        Axios.post('http://localhost:7000/updategenre', {
        genreName: genreName, 
        genreImage: genreImage
        }).then((response) => {
            setGenreOperationStatus(response.data.message)
        }).catch(err =>{
            console.log(err)
        })
    }

    const deleteGenre = () => {
        Axios.post('http://localhost:7000/deletegenre', {
        genreName: genreName
        }).then((response) => {
            setGenreOperationStatus(response.data.message)
        }).catch(err =>{
            console.log(err)
        })
    }

    const showGenre = () => {
        Axios.post('http://localhost:7000/showgenre').then((response) => {
            setGID(response.data.genreID)
            setGName(response.data.genreName)
            setGImg(response.data.genreImage)
            setGenreOperationStatus(response.data.message)
        }).catch(err =>{
            console.log(err)
        })
    }

    const genreData = [];
    for(let j=0;j<gID.length;j++){
        genreData.push({
            id: gID[j],
            name: gName[j],
            image: gImg[j],
        }
        )
    }

    // SONG FUNCTIONS
    const addSong = () => {
        Axios.post('http://localhost:7000/addsong', {
        songName: songName, 
        songImage: songImage,
        songUrl: songUrl,
        songGenreID: songGenreID,
        songArtistID: songArtistID
        }).then((response) => {
            setSongOperationStatus(response.data.message)
        }).catch(err =>{
            console.log(err)
        })
    }

    const updateSong = () => {
        Axios.post('http://localhost:7000/updatesong', {
        songName: songName, 
        songImage: songImage,
        songUrl: songUrl
        }).then((response) => {
            setSongOperationStatus(response.data.message)
        }).catch(err =>{
            console.log(err)
        })
    }

    const deleteSong = () => {
        Axios.post('http://localhost:7000/deletesong', {
        songName: songName
        }).then((response) => {
            setSongOperationStatus(response.data.message)
        }).catch(err =>{
            console.log(err)
        })
    }

    const showSong = () => {
        Axios.post('http://localhost:7000/showsong').then((response) => {
            setSID(response.data.songID)
            setSName(response.data.songName)
            setSImg(response.data.songImage)
            setSUrl(response.data.songUrl)
            setSGenreID(response.data.songGenreID)
            setSArtistID(response.data.songArtistID)
            setSongOperationStatus(response.data.message)
        }).catch(err =>{
            console.log(err)
        })
    }

    const songData = [];
    for(let k=0;k<sID.length;k++){
        songData.push({
            id: sID[k],
            name: sName[k],
            image: sImg[k],
            url: sUrl[k],
            genreid: sGenreID[k],
            artistid: sArtistID[k]
        }
        )
    }

    // Logout Function
    const logout = () => {
        setLoginStatus("no")
        Axios.post('http://localhost:7000/admin', {
            admin: loginStatus
        }).catch(err =>{
            console.log(err)
        })
        navigate("/")
    }

    useEffect(() => {
        Axios.get('http://localhost:7000/admin').then((response) => {
            if(response.data.admin === "yes"){
                console.log("Admin")
            }else{
                navigate("/")
            }
        }).catch(err =>{
            console.log(err)
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
                            <select name='select' onChange={(e)=>{
                            setArtistName(e.target.value);
                            }}>
                                    {artistData.map(item=>{
                                        return(
                                            <option key={item.id} value={item.name}>{item.name}</option>
                                        )
                                    })}
                            </select><br/>
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
                            <label>Artist Name:</label>
                            <br/>
                            <select name='select' onChange={(e)=>{
                            setArtistName(e.target.value);
                            }}>
                                    {artistData.map(item=>{
                                        return(
                                            <option key={item.id} value={item.name}>{item.name}</option>
                                        )
                                    })}
                            </select>
                            <br/>
                            <button onClick={deleteArtist}>Delete Artist</button>
                    </div>
                </Col>
                <h2>{artistOperationStatus}</h2>
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
                            {artistData.map((val)=>{
                                return(
                                    <tr key={val.id}>
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
                    <select name='select' onChange={(e)=>{
                            setGenreName(e.target.value);
                            }}>
                                    {genreData.map(item=>{
                                        return(
                                            <option key={item.id} value={item.name}>{item.name}</option>
                                        )
                                    })}
                    </select><br/>
                    <label>Genre Image URL:</label>
                    <input type='text' placeholder='new genre image-url' onChange={(e)=>{
                    setGenreImage(e.target.value);
                    }}/><br/>
                    <button onClick={updateGenre}>Update Genre Image</button>
                </Col>
                <Col>
                    <h2>Delete:</h2>
                    <label>Genre Name:</label>
                    <br/>
                    <select name='select' onChange={(e)=>{
                            setGenreName(e.target.value);
                            }}>
                                    {genreData.map(item=>{
                                        return(
                                            <option key={item.id} value={item.name}>{item.name}</option>
                                        )
                                    })}
                            </select><br/>
                    <button onClick={deleteGenre}>Delete Genre</button>
                </Col>
                <h2>{genreOperationStatus}</h2>
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
                            {genreData.map((val)=>{
                                return(
                                    <tr key={val.id}>
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
                    <select name='select' onChange={(e)=>{
                            setSongName(e.target.value);
                            }}>
                            {songData.map(item=>{
                                return(
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                )
                            })}
                    </select><br/>
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
                    <label>Song Name:</label>
                    <br/>
                    <select name='select' onChange={(e)=>{
                            setSongName(e.target.value);
                            }}>
                            {songData.map(item=>{
                                return(
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                )
                            })}
                    </select><br/>
                    <button onClick={deleteSong}>Delete Song</button>
                </Col>
                <h2>{songOperationStatus}</h2>
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
                            {songData.map((val)=>{
                                return(
                                    <tr key={val.id}>
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
            </Row>
         </Container>
    </div>
    )
}

export default Admin;