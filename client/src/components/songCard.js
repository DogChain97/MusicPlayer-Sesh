import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import songCardCSS from '../home_genre_playlist.module.css';
import Card from 'react-bootstrap/Card';

function SongCard (props) {
    const [playlists, setPlaylists] = useState([])
    const [isShown, setIsShown] = useState(false);

    let data = props.playlists
    let ids = props.ids

    let finalData = []
    const showOptions = ()=>{
        setIsShown(!isShown)
        if(data.length>0){
            for(let i=0;i<data.length;i++){
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
        <Card className={songCardCSS.card} onContextMenu={props.onContextMenu} style={{ width: '14rem' }}>

        <div className={songCardCSS.songOptions} onClick={showOptions}><div class={songCardCSS.threeDots}></div></div>
        {isShown &&
            <ul className={songCardCSS.listPlaylist}>
                <div className={songCardCSS.optionHeading}>Add to playlist</div>
                    {playlists.map(item=>{
                        return (
                            <li className={songCardCSS.listItem} key={item.data} value={item.data} onClick={props.addToPlaylist} data-id = {item.id} data-title={props.title} >{item.name}</li>
                        )
                    })}
            </ul>
        }

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