/**
 * 播放器
 */
import { useContext } from 'react'
import {
  Avatar,
  ConfigProvider,
  Row,
  Col,
  Spin,
  Slider
} from 'antd'
import {
  Shuffle,
  SkipBack,
  PauseCircle,
  PlayCircle,
  SkipForward,
  Repeat,
  Volume2
} from 'react-feather';

import { formatTime } from '@/utils/formatTime';
import MusicPlayerContext from '@/utils/PlayerContext'

export default function Player() {
  const {
    song,
    lyricList,
    currentLine,
    isPlaying,
    duration,
    currentTime,
    seek,
    handleShuffleClick,
    handlePrevClick,
    handlePlayPauseClick,
    handleNextClick,
    handleLoopClick,
  } = useContext(MusicPlayerContext);

  function SliderChange(time: number) {
    seek!(time);
  }

  return (
    <>
      <div className='mk-box'>
        <div className='song-info'>
          <div className='flex'>
            <Avatar shape="square" size={70} src={song.cover}></Avatar>
            <div className='flex flex-col justify-center flex-1 ml-5'>
              <div className='title'>{song.title}</div>
              <div className='des'>{song.singer}</div>
            </div>
          </div>
        </div>
        <div className='w-full flex item-center justify-center'>
          <div className='w-full px-5'>
            <Row>
              <ConfigProvider
                theme={{
                  components: {
                    Slider: {
                      trackBg: "#000",
                      trackHoverBg: "#000",
                    }
                  }
                }}
              >
                <Col span={6}>
                  <div className="player_left">
                    {
                      lyricList.length > 0 ? (
                        <div className='flex flex-col'>
                          <span>{lyricList[currentLine]?.lrc}</span>
                          <span>{lyricList[currentLine]?.tlyric}</span>
                        </div>
                      ) : (
                        <Spin className="flex flex-col"></Spin>
                      )
                    }
                  </div>
                </Col>
                <Col span={12}>
                  <div className='player_center'>
                    <div className='player_btn'>
                      <div onClick={handleShuffleClick}>
                        <Shuffle size={20}></Shuffle>
                      </div>
                      <div onClick={handlePrevClick}>
                        <SkipBack></SkipBack>
                      </div>
                      <div onClick={handlePlayPauseClick}>
                        {
                          isPlaying ? (
                            <PauseCircle size={35} />
                          ) : (
                            <PlayCircle size={35} />
                          )
                        }
                      </div>
                      <div onClick={handleNextClick}>
                        <SkipForward size={20}></SkipForward>
                      </div>
                      <div onClick={handleLoopClick}>
                        <Repeat size={20}></Repeat>
                      </div>
                    </div>
                    <div className="player_slider">
                      <span>{formatTime(currentTime)}</span>
                      <div className="w-full px-10">
                        <Slider
                          value={currentTime}
                          onChange={SliderChange}
                          max={duration}
                          disabled={false}
                        ></Slider>
                      </div>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div className='player_right'>
                    <Volume2></Volume2>
                    <div className="ml-5 w-120">
                      <Slider defaultValue={30} max={100} disabled={false}></Slider>
                    </div>
                  </div>
                </Col>
              </ConfigProvider>
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}
