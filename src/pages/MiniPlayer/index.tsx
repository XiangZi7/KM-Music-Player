import { ConfigProvider, Slider } from 'antd'
import {
  Shuffle,
  SkipBack,
  PauseCircle,
  PlayCircle,
  SkipForward,
  Repeat,
  // Volume2
} from 'react-feather'

import MusicPlayerContext from '@/utils/PlayerContext'
import './index.scss'
import { formatTime } from '@/utils/formatTime'

function MiniPlayer() {

  const {
    song,
    isPlaying,
    duration,
    currentTime,
    seek,
    handleShuffleClick,
    handleLoopClick,
    handleNextClick,
    handlePlayPauseClick,
    handlePrevClick,
  } = useContext(MusicPlayerContext)

  const SliderChange = (e: number) => {
    seek && seek(e);
  }

  return (
    <div className='minibox'>
      <div className='mini-player'>
        <div className='wrap'>
          <div className='grid'>
            {/* 封面 */}
            <div className='cover'>
              <div className='img'>
                <img src={song.cover} alt="" />
              </div>
            </div>
            {/* 控制器 */}
            <div className='controller'>
              <div className='title'>
                <div className='flex flex-col gap-0'>
                  <p className='font-semibold text-foreground/90'>
                    {song.title}
                  </p>
                  <p className='text-sm text-foreground/80'>{song.album}</p>
                  <p className='text-lg font-medium mt-2'>{song.singer}</p>
                </div>
              </div>
              {/* 进度条 */}
                <div className='Progress'>
                <div className='w-full px-10'>
                  <ConfigProvider
                    theme={{
                      components: {
                        Slider: {
                          trackBg: "#000",
                          trackHoverBg: "#010101",
                        }
                      }
                    }}
                  >
                    <Slider
                      value={currentTime}
                      onChange={SliderChange}
                      max={duration}
                      disabled={false}
                    />
                  </ConfigProvider>
                </div>
                <div className='flex justify-between'>
                  <p className='text-sm'>{formatTime(currentTime)}</p>
                  <p className='text-sm text-foreground/50'>
                    {formatTime(duration)}
                  </p>
                </div>
              </div>
              {/* 控制器 - button */}
              <div className='con-btn'>
                <Shuffle size={28} onClick={handleShuffleClick}></Shuffle>
                <SkipBack size={28} onClick={handlePrevClick} />
                <div onClick={handlePlayPauseClick}>
                  {isPlaying ? (
                    <PauseCircle size={45}></PauseCircle>
                  ) : (
                    <PlayCircle size={45}></PlayCircle>
                  )}
                </div>
                <SkipForward size={28} onClick={handleNextClick}></SkipForward>
                <Repeat size={28} onClick={handleLoopClick} />
                {/* control volume */}
                {/* <div className='volume-btn'>
                  <Volume2></Volume2>
                  <div className="ml-5 w-120">
                    <Slider defaultValue={30} max={100} disabled={false}></Slider>
                  </div>
                </div> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniPlayer
