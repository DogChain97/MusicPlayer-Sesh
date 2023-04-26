import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import songCardCSS from '../home_genre_playlist.module.css';
import Card from 'react-bootstrap/Card';

function SongCard (props) {
    const [playlists, setPlaylists] = useState([])
    const [isShown, setIsShown] = useState(false);

    var data = props.playlists
    var ids = props.ids

    var finalData = []
    const showOptions = ()=>{
        setIsShown(!isShown)
        if(data.length>0){
            for(var i=0;i<data.length;i++){
                finalData.push({
                    name: data[i],
                    id: ids[i]
                })
            }
        }else{
            finalData.push({
                name: 'No Playlists'
            })
        }
        setPlaylists(finalData)
    }

    return (
        <Link to={props.to}>
        <div className={songCardCSS.songOptions} onClick={showOptions}></div>
        {isShown &&
            <ul className={songCardCSS.listPlaylist}>
            <span>Add to playlist</span>
                {/* <span>Add to playlist:</span> */}
                {playlists.map(item=>{
                    return (
                        <li className={songCardCSS.listItem} key={item.data} value={item.data} onClick={props.addToPlaylist} data-id = {item.id} data-title={props.title} >{item.name}</li>
                    )
                })}
            </ul>
        }
        
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

export default SongCard;