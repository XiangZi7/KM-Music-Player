import MkTable from '@/components/Mk-Table/Mk-Table'
import {useEffect, useState} from "react";
import {httpGet} from '@/utils/http'
import {Button} from "antd";

export default function App() {
    const [song, setSong] = useState([])
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
    }, [])


    return (
        <>
            <div className="main-container">
                <div className="main-header">
                    <a className="menu-link-main" href="#">Hot Music</a>
                    <div className="header-menu">
                        <a className="main-header-link is-active" href="#">Desktop</a>
                        <a className="main-header-link" href="#">Mobile</a>
                        <a className="main-header-link" href="#">Web</a>
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
                                {/*<button className="content-button"><a*/}
                                {/*    href="#/search?keyworks=%E5%A2%83%E7%95%8C%E7%9A%84%E5%BD%BC%E6%96%B9"*/}
                                {/*    className="content-button">试听专辑*/}
                                {/*</a></button>*/}
                            </div>
                        </div>
                        <img src="src/static/km.png" height={230}/>
                    </div>

                    {song.length !== 0 ?
                        <div className="content-section">
                            <div className="content-section-title">Album</div>
                            <MkTable data={song} style={{maxHeight: "40vh"}}/>
                        </div>
                        : null}
                    <div className="content-section">
                        <div className="content-section-title">Song List</div>
                        <div className="apps-card">
                            <div className="app-card">
       <span>
        <svg viewBox="0 0 512 512">
         <path xmlns="http://www.w3.org/2000/svg"
               d="M480 0H32C14.368 0 0 14.368 0 32v448c0 17.664 14.368 32 32 32h448c17.664 0 32-14.336 32-32V32c0-17.632-14.336-32-32-32z"
               fill="#210027" data-original="#7b1fa2"></path>
         <g xmlns="http://www.w3.org/2000/svg">
          <path
              d="M192 64h-80c-8.832 0-16 7.168-16 16v352c0 8.832 7.168 16 16 16s16-7.168 16-16V256h64c52.928 0 96-43.072 96-96s-43.072-96-96-96zm0 160h-64V96h64c35.296 0 64 28.704 64 64s-28.704 64-64 64zM400 256h-32c-18.08 0-34.592 6.24-48 16.384V272c0-8.864-7.168-16-16-16s-16 7.136-16 16v160c0 8.832 7.168 16 16 16s16-7.168 16-16v-96c0-26.464 21.536-48 48-48h32c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
              fill="#f6e7fa" data-original="#e1bee7"></path>
         </g>
        </svg>
        Premiere Pro
       </span>
                                <div className="app-card__subtext">Edit, master and create fully proffesional
                                    videos
                                </div>
                                <div className="app-card-buttons">
                                    <button className="content-button status-button">Update</button>
                                    <div className="menu"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
