import React, { useEffect, useState } from 'react';
import songCardCSS from '../home_genre_playlist.module.css';
import Card from 'react-bootstrap/Card';

function SongCard (props) {

    return (
        <a>
        <Card className={songCardCSS.card} style={{ width: '12rem' }}>
            <Card.Img variant="top" src={props.img} className={songCardCSS.cardImg} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    <p>{props.artist}</p>
                    <p>{props.genre}</p>
                </Card.Text>
            </Card.Body>
        </Card>
    </a>
    )
}

export default SongCard;