import {Film, PlayCircle} from "react-feather";
import {Avatar} from "antd";
import {httpGet} from '@/utils/http'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addSongs, setPlaying} from "@/stores/modules/playerStore";
import {formatTimes} from "@/utils/FormatTime";
import {it} from "node:test";

export default function MkTable({data, style, className}) {
    const dispatch = useDispatch();

    // 播放音乐
    function playMusic(item) {
        httpGet(`/song/url/v1?id=${item.id}&level=exhigh`).then(({data}) => {
            let songs = Object.assign({}, item, {src: data[0].url})
            dispatch(addSongs(songs))
            dispatch(setPlaying(true));
        })
    }

    return (
        <>
            <ul style={style} className={className}>
                {data.map((item, idx) => (
                    <li className="adobe-product" key={item.id} onDoubleClick={() => playMusic(item)}>
                        <div className="products">
                            <img src={item.cover + "?param=28y28"}/>
                            <span className="ml-5"> {item.title}</span>
                        </div>
                        <span className="status">{item.singer}</span>
                        <span className="status">{formatTimes(item.time)}</span>
                        <div className="button-wrapper">
                            <div className="flex items-center">
                                <PlayCircle onClick={() => playMusic(item)}/>
                                {item.mv !== 0 ? <Film/> : null}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}