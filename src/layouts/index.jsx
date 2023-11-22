import Router from "@/routes/index";
import Player from "@/components/player/player";
// 共享音乐播放器的状态
import MusicPlayerContext from "@/utils/PlayerContext";
import useMusicPlayer from "@/utils/usePlayerMusic";
import LeftSide from "./components/left-side";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

export default function LayoutIndex() {
  const musicPlayer = useMusicPlayer();

  const navigate = useNavigate();

  function routerBack() {
    navigate(-1);
  }

  return (
    <MusicPlayerContext.Provider value={musicPlayer}>
      <div className="video-bg">
        <video width="320"
          height="240"
          autoPlay
          loop
          muted>
          <source
            src="https://assets.codepen.io/3364143/7btrrd.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="app">
        <div className="wrapper">
          {/*Side*/}
          <LeftSide />

          {/*Main*/}
          <div className="flex flex-col app-main">
            <Router></Router>
            <div className="float"
              onClick={routerBack}>
              <div className="button-f">
                <LeftOutlined />
                Back
              </div>
            </div>
          </div>
        </div>
        <Player />
      </div>
      <div className="overlay-app"></div>
    </MusicPlayerContext.Provider>
  );
}
