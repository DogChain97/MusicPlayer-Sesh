import React, { useEffect, useState } from 'react';
import homeCSS from './home_genre_playlist.module.css';
import logo from './assets/sesh_white.png';
import home from './assets/homeActive.png';
import genre from './assets/menu.png';
import playlist from './assets/playlist.png';
import SearchBar from './components/searchBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Home (){

    return (
        <div className={homeCSS.main}>
            <div className={homeCSS.leftPanel}>
                <h1 className={homeCSS.brand}><img src={logo} />SESH</h1>
                <h2 className={homeCSS.tabName}><a className={homeCSS.active} href='/home'><img className={homeCSS.tabs} src={home} />Home</a></h2>
                <h2 className={homeCSS.tabName}><a href='/genre'><img className={homeCSS.tabs} src={genre} />Genre</a></h2>
                <h2 className={homeCSS.tabName}><a href='/playlist'><img className={homeCSS.tabs} src={playlist} />Create Playlist</a></h2>
            </div>

            <div className={homeCSS.rightPanel}>
                <div className={homeCSS.searchPanel}>
                    <SearchBar />
                    <button className={homeCSS.logout}>A</button>
                </div>

                <div className={homeCSS.contentPanel}>
                    
                    <div className={homeCSS.welcomeText}>
                        <h1>Hello, Abhishek</h1>
                        <p>Hope you have a good sesh!</p>
                    </div>
                
                    <div className={homeCSS.cards}>
                        <h3>Top Songs</h3>
                        <Container>
                            <Row>
                                <Col>
                                    <a>
                                        <Card className={homeCSS.card} style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src="" />
                                            <Card.Body>
                                                <Card.Title>Song 1</Card.Title>
                                                <Card.Text>
                                                    <p>Artist1</p>
                                                    <p>Genre1</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </Col>
                                <Col>
                                    <a>
                                        <Card className={homeCSS.card} style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src="" />
                                            <Card.Body>
                                                <Card.Title>Song 2</Card.Title>
                                                    <Card.Text>
                                                        <p>Artist2</p>
                                                        <p>Genre2</p>
                                                    </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </Col>
                                <Col>
                                    <a>
                                        <Card className={homeCSS.card} style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src="" />
                                            <Card.Body>
                                            <Card.Title>Song 3</Card.Title>
                                                <Card.Text>
                                                    <p>Artist3</p>
                                                    <p>Genre3</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </Col>
                                <Col>
                                    <a>
                                        <Card className={homeCSS.card} style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src="" />
                                            <Card.Body>
                                            <Card.Title>Song 4</Card.Title>
                                                <Card.Text>
                                                    <p>Artist4</p>
                                                    <p>Genre4</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </a>
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