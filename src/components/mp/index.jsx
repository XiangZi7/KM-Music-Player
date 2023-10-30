import Slider from "@/components/min-Player/slider.jsx";
import {formatTime} from "@/utils/FormatTime.jsx";
import {useState, useEffect, useContext} from "react";
import MusicPlayerContext from '@/utils/PlayerContext.js';
import {PauseCircleIcon} from "@/components/min-Player/PauseCircleIcon.jsx";
import {PlayIcon} from "@/components/min-Player/PlayIcon.jsx";
import {Button,Image} from "@nextui-org/react";
import {PreviousIcon} from "@/components/min-Player/PreviousIcon.jsx";
import {RepeatOneIcon} from "@/components/min-Player/RepeatOneIcon.jsx";
import {NextIcon} from "@/components/min-Player/NextIcon.jsx";
import {ShuffleIcon} from "@/components/min-Player/ShuffleIcon.jsx";
import {BsFillVolumeUpFill} from 'react-icons/bs';
import {BiSolidVolumeMute} from "react-icons/bi";
import {MdLibraryMusic} from "react-icons/md";

export default function App() {
    const {
        isPlaying,
        duration,
        currentTime,
        song,
        handlePlayPauseClick,
        seek,
        handleLoopClick,
        handlePrevClick,
        handleNextClick,
        handleShuffleClick,
        handleVolume,
        volume,
    } = useContext(MusicPlayerContext)
    // 滑块Change事件
    const SliderChange = (e) => {
        seek(e);
    }

    function changeVolume() {
        if (volume) {
            handleVolume(0)
        } else {
            handleVolume(70)
        }
    }

    function SliderChangeVolume(e) {
        handleVolume(e)
    }

    return (
        <div
            className="mp absolute bottom-0 left-0 h-[85px] w-full flex items-center justify-center bg-[#00000066] backdrop-blur flex">
            <Image
                isZoomed
                width={90}
                radius="none"
                alt="NextUI Fruit Image with Zoom"
                className="cursor-pointer"
                src={song.cover}
            />
            <div className="flex flex-col mx-2 w-1/5">
                <span className="mb-2">{song.title}</span>
                <span>{song.singer}</span>
            </div>
            <div className="flex flex-col w-3/5 ">
                <div className="flex w-full items-center justify-center pt-0.5">
                    <Button
                        isIconOnly
                        className="data-[hover]:bg-foreground/10"
                        radius="full"
                        variant="light"
                        onClick={handleLoopClick}
                    >
                        <RepeatOneIcon className="text-foreground/80"/>
                    </Button>
                    <Button
                        isIconOnly
                        className="data-[hover]:bg-foreground/10"
                        radius="full"
                        variant="light"
                        onClick={handlePrevClick}
                    >
                        <PreviousIcon/>
                    </Button>
                    <Button
                        isIconOnly
                        className="w-auto h-auto data-[hover]:bg-foreground/10"
                        radius="full"
                        variant="light"
                        onClick={handlePlayPauseClick}
                    >
                        {isPlaying ? <PauseCircleIcon size={45}/> : <PlayIcon size={45}/>}
                    </Button>
                    <Button
                        isIconOnly
                        className="data-[hover]:bg-foreground/10"
                        radius="full"
                        variant="light"
                        onClick={handleNextClick}
                    >
                        <NextIcon/>
                    </Button>
                    <Button
                        isIconOnly
                        className="data-[hover]:bg-foreground/10"
                        radius="full"
                        variant="light"
                        onClick={handleShuffleClick}
                    >
                        <ShuffleIcon className="text-foreground/80"/>
                    </Button>
                </div>
                <div className="flex  items-center justify-center">
                    <p className="text-small text-foreground/50">{formatTime(currentTime)}</p> {/* 显示当前播放时间 */}
                    <div className="w-[800px] mx-3">
                        <Slider min={0} max={duration} step={1} value={currentTime} onChange={SliderChange}/>
                    </div>
                    <p className="text-small text-foreground/50">{formatTime(duration)}</p> {/* 显示歌曲时长 */}
                </div>

            </div>
            <div className="w-1/5 flex items-center justify-center h-full">
                <div className="cursor-pointer">
                    <Button
                        isIconOnly
                        className="data-[hover]:bg-foreground/10"
                        radius="full"
                        variant="light"
                        onClick={changeVolume}
                    >
                        {volume == 0 ? <BiSolidVolumeMute size={20}/> : <BsFillVolumeUpFill size={20}/>}
                    </Button>
                </div>
                <div className="w-[120px]">
                    <Slider min={0} max={100} step={1} value={volume} onChange={SliderChangeVolume}/>
                </div>
                <Button
                    isIconOnly
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    onClick={changeVolume}
                >
                    <MdLibraryMusic size={20}/>
                </Button>
            </div>
        </div>
    )
}