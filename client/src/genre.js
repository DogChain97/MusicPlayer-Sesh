import React, { useEffect, useState } from 'react';
import genreCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/home.png';
import genre from './assets/menuActive.png';
import playlist from './assets/playlist.png';
import jackboys from './assets/jackboys.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SongCard from './components/songCard';

function Genre (){

    return (
        <div className={genreCSS.main}>
            <div className={genreCSS.leftPanel}>
                <h1 className={genreCSS.brand}><img src={logo} />SESH</h1>
                <h2 className={genreCSS.tabName}><a href='/home'><img className={genreCSS.tabs} src={home} />Home</a></h2>
                <h2 className={genreCSS.tabName}><a className={genreCSS.active} href='/genre'><img className={genreCSS.tabs} src={genre} />Genre</a></h2>
                <h2 className={genreCSS.tabName}><a href='/createPlaylist'><img className={genreCSS.tabs} src={playlist} />Create Playlist</a></h2>
            </div>

            <div className={genreCSS.rightPanel}>
                <div className={genreCSS.genreSearchPanel}>
                    <button className={genreCSS.genreLogout}>A</button>
                </div>

                <div className={genreCSS.contentPanel}>
                
                    <div>
                        <h3 className={genreCSS.contentTitle}>Browse All</h3>
                        <Container>
                            <Row >
                                <Col className={genreCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Genre 1'/>
                                </Col>
                                <Col className={genreCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Genre 2'/>
                                </Col>
                                <Col className={genreCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Genre 3'/>
                                </Col>
                                <Col className={genreCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Genre 4'/>
                                </Col>
                            </Row>
                            <Row >
                                <Col className={genreCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Genre 5'/>
                                </Col>
                                <Col className={genreCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Genre 6'/>
                                </Col>
                                <Col className={genreCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Genre 7'/>
                                </Col>
                                <Col className={genreCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Genre 8'/>
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