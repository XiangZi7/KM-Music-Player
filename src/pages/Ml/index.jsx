import './index.scss';
import {Avatar, Col, Row} from "antd";
import {useEffect, useState} from "react";
import {httpGet} from "@/utils/http.js";
import {useNavigate} from "react-router-dom";

const MusicLibrary = () => {
    // 示例数据
    const [songList, setSongList] = useState([])

    const [playlist, setPlayList] = useState([])
    const Navigate = useNavigate();

    useEffect(() => {
        httpGet("/playlist/track/all?id=526287570&limit=30&offset=1").then(({songs}) => {
            setSongList(songs)
        })
        httpGet("/cloudsearch?keywords=魔女宅急便&type=1000").then(({result}) => {
            setPlayList(result.playlists)
        })
    }, []);

    return (
        <div className="music-library-container">
            <div className="content-container">
                <Row>
                    <Col span={17}>
                        <div className="left">
                            <div className="avatar">
                                <img src="32.png" alt=""/>
                                <div className="bnmsg">
                                    <Avatar shape="square" size={64} src="1.jpg"/>
                                    <div className="name-box">
                                        <div className="title">Kiki's Delivery Service</div>
                                        <div className="des">Kiki</div>
                                    </div>
                                </div>

                            </div>
                            <div className="banner">
                                <h2 style={{textAlign: "left"}}>Featured for you</h2>
                                <div className="wrapper-contexts">
                                    <img src="kiki1.png"/>
                                    <div className="content-wrapper-header-padding dw">
                                        <div className="content-wrapper-context">
                                            <div
                                                className="content-text" style={{maxWidth: "400px"}}>
                                                Once a magical girl reaches the age of 13, she must leave home for a
                                                year of independent training, and Qiqi is no exception.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={7}>
                        <div className="right">
                            <h2 style={{textAlign: "left"}}>Recently Listened</h2>
                            <div className="songlist">
                                {songList && songList.map((item) => (
                                    <div className="song-item" key={item.id}
                                         onClick={() => Navigate("/playlist?id=" + item.id)}>
                                        <Avatar shape="square" size={55} src={item.al.picUrl + "?param=52y52"}/>
                                        <div className="msg">
                                            <div>{item.name}</div>
                                            <div>{item.ar.map((item2, idx) => item2.name).join()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="footer--container">
                <h2 className="mb-10" style={{textAlign: "left"}}>Recommended Song List</h2>
                <div className="songlist">
                    {
                        playlist.map((item, idx) => (
                            <div className="songlist-item" key={item.id}>
                                <img className="songlist-img"
                                     src={item.coverImgUrl}
                                     alt=""/>
                                <div className="songlist-title">
                                    <div>{item.name}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MusicLibrary;