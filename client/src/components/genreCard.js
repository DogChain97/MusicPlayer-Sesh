import React from 'react';
import {Link} from 'react-router-dom';
import songCardCSS from '../home_genre_playlist.module.css';
import Card from 'react-bootstrap/Card';

function GenreCard (props) {

    return (
        <Link to={props.to}>
        
        <Card className={songCardCSS.card} onContextMenu={props.onContextMenu} style={{ width: '14rem' }}>
            <Card.Img variant="top" src={props.img} className={songCardCSS.cardImg} onClick={props.onClick} data-title={props.title} data-artist={props.artist} data-url={props.url}/>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    <p>{props.artist}</p>
                    <p>{props.genre}</p>
                </Card.Text>
            </Card.Body>
        </Card>
    </Link>
    )
} 

export default GenreCard;