import { Col, Row } from "antd";
import { Film, PlayCircle } from "react-feather";
import { useDispatch } from "react-redux";

import './index.scss'
import { songsAPI } from "@/api";
import { addSongs, setPlaying } from "@/stores/modules/playerStore";
import { formatTimes } from "@/utils/formatTime";


function MKTable({ songList, style, className }: MKTableProps) {
  const dispatch = useDispatch();

  // 播放音乐
  function playMusic(item: Song) {
    songsAPI.playMusic({ id: item.id, level: "exhigh" }).then(({ data }) => {
      const songs = Object.assign({}, item, { src: data.data[0].url });
      dispatch(addSongs(songs));
      dispatch(setPlaying(true));
    });
  }

  return (
    <>
      <Row>
        <div style={style} className={`w-full single-bow ${className}`}>
          {songList.map((item) => (
            <div
              className="flex single-item"
              key={item.id}
              onDoubleClick={() => playMusic(item)}
            >
              <Col span={8} className="textoverflow">
                <div className="cover">
                  <img src={item.cover + "?param=28y28"} className="yx-shadow" />
                  <span className="ml-10 textoverflow">{item.title}</span>
                </div>
              </Col>
              <Col span={8} className="textoverflow">
                {item.singer}
              </Col>
              <Col span={4}>{formatTimes(item.time)}</Col>
              <Col span={4}>
                <div className="flex items-center justify-flexend">
                  <PlayCircle onClick={() => playMusic(item)} />
                  {item.mv !== 0 ? <Film className="ml-10"></Film> : null}
                </div>
              </Col>
            </div>
          ))}
        </div>
      </Row>
    </>
  );
}

export default MKTable;
