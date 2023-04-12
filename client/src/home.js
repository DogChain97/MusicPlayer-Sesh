import React, { useEffect, useState } from 'react';
import homeCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/homeActive.png';
import genre from './assets/menu.png';
import playlist from './assets/playlist.png';
import jackboys from './assets/jackboys.png';
import SearchBar from './components/searchBar';
import SongCard from './components/songCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home (){

    return (
        <div className={homeCSS.main}>
            <div className={homeCSS.leftPanel}>
                <h1 className={homeCSS.brand}><img src={logo} alt='logo'/>SESH</h1>
                <h2 className={homeCSS.tabName}><a className={homeCSS.active} href='/home'><img className={homeCSS.tabs} src={home} alt='home' />Home</a></h2>
                <h2 className={homeCSS.tabName}><a href='/genre'><img className={homeCSS.tabs} src={genre} alt='genre'/>Genre</a></h2>
                <h2 className={homeCSS.tabName}><a href='/createPlaylist'><img className={homeCSS.tabs} src={playlist} alt='create'/>Create Playlist</a></h2>
            </div>

            <div className={homeCSS.rightPanel}>
                <div className={homeCSS.searchPanel}>
                    <SearchBar/>
                    <button className={homeCSS.logout}>A</button>
                </div>

                <div className={homeCSS.contentPanel}>
                    
                    <div className={homeCSS.welcomeText}>
                        <h1>Hello, Abhishek</h1>
                        <p>Hope you have a good sesh!</p>
                    </div>
                
                    <div>
                        <h3 className={homeCSS.contentTitle}>Top Songs</h3>
                        <Container>
                            <Row >
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Song 1' artist='Artist 1' genre='Genre 1' />
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Song 2' artist='Artist 2' genre='Genre 2' />
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Song 3' artist='Artist 3' genre='Genre 3' />
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Song 4' artist='Artist 4' genre='Genre 4' />
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Song 4' artist='Artist 4' genre='Genre 4' />
                                </Col>
                            </Row>
                            <Row >
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Song 1' artist='Artist 1' genre='Genre 1' />
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Song 2' artist='Artist 2' genre='Genre 2' />
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Song 3' artist='Artist 3' genre='Genre 3' />
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Song 4' artist='Artist 4' genre='Genre 4' />
                                </Col>
                                <Col className={homeCSS.gridColumn}>
                                    <SongCard img={jackboys} title='Song 4' artist='Artist 4' genre='Genre 4' />
                                </Col>
                            </Row>
                        </Container>
                    </div>                
                </div>
            </div>            
        </div>
    )
}

export default Home;