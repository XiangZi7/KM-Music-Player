import MkTable from '@/components/Mk-Table/Mk-Table'
import {useEffect, useRef, useState} from "react";
import {httpGet} from '@/utils/http'
import {Button} from "antd";

export default function App() {
    const songsCard = useRef();
    const [songCardWidth, setSongCardWidth] = useState(0)
    const [song, setSong] = useState([])
    // header
    const headerLink = ["Message", "Music Library", "Animation"]
    const [headerActive, setHeaderActive] = useState(0)
    // 歌单
    const [playlists, setPlayLists] = useState([])
    useEffect(() => {
        httpGet('/playlist/track/all?id=86596672&limit=30&offset=1').then((data) => {
            let newData = data.songs.map(item => {
                const names = item.ar.map(subItem => subItem.name).join(',');
                let songs = {
                    title: item.name,
                    singer: names,
                    cover: item.al.picUrl,
                    time: item.dt,
                    album: item.al.name,
                    id: item.id,
                    mv: item.mv,
                    Lyric: item.id
                }
                return songs
            })
            setSong(newData)
        });
        httpGet("/top/playlist?limit=30&offset=0").then(({playlists}) => {
            setPlayLists(playlists)
        })
    }, [])

    useEffect(() => {
        if (songsCard.current) {
            const width = songsCard.current.getBoundingClientRect().width;
            setSongCardWidth(width)
        }
    }, [songsCard.current]);

    function handleHeader(idx: number) {
        setHeaderActive(idx)
    }

    return (
        <>
            <div className="main-container">
                <div className="main-header">
                    <span className="menu-link-main">Hot Music</span>
                    <div className="header-menu">
                        {headerLink.map((item, idx) => (
                            <span key={idx}
                                  onClick={() => handleHeader(idx)}
                                  className={`main-header-link ${headerActive == idx ? 'is-active' : ''}`}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="content-wrapper-header">
                        <div className="content-wrapper-header-padding">
                            <div className="content-wrapper-context">
                                <h3 className="img-content">
                                    境界的彼方
                                </h3>
                                <div className="content-text">
                                    《境界的彼方》是由鸟居奈古梦著作、鸭居知世插画的轻小说，于2012年6月9日，由KAESUMA文库文库（京都动画）发行。小说曾获得第2回京都动画大赏（小说部门）奖励赏。
                                </div>
                                <Button style={{padding: ' 0px 45px'}} className="content-button" shape="round"
                                        type="primary">试听专辑</Button>
                            </div>
                        </div>
                        <img src="src/static/km.png" height={230}/>
                    </div>
                    {/*歌单*/}
                    <div className="content-section">
                        <div className="content-section-title" ref={songsCard}>Song List</div>
                        <div className="songs-card"
                             style={{maxWidth: `${songCardWidth}px`}}>
                            {playlists.map((item, idx) => (
                                <div className="song-card" key={idx}>
                                    {/*<div className="song-title">*/}
                                    {/*    {item.name}*/}
                                    {/*</div>*/}
                                    <img className="song-img"
                                         src={`${item.coverImgUrl}?param=200y200`}/>
                                    <div className="song-des">
                                        <div>
                                            <p>{item.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*歌曲*/}
                    {song.length !== 0 ?
                        <div className="content-section">
                            <div className="content-section-title">Album</div>
                            <MkTable data={song} style={{maxHeight: "40vh"}}/>
                        </div>
                        : null}

                </div>
            </div>
        </>
    );
}
