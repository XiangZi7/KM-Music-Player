import {Card, CardBody, Image, Button, ScrollShadow, Spinner} from "@nextui-org/react";
import {HeartIcon} from "./HeartIcon";
import {PauseCircleIcon} from "./PauseCircleIcon";
import {NextIcon} from "./NextIcon";
import {PreviousIcon} from "./PreviousIcon";
import {RepeatOneIcon} from "./RepeatOneIcon";
import {ShuffleIcon} from "./ShuffleIcon";
import {PlayIcon} from "./PlayIcon.jsx"
import {useState, useEffect, useRef, useContext} from 'react'

import {formatTime} from "@/utils/FormatTime.jsx";
import './index.scss'
import Slider from "@/components/min-Player/slider.jsx";
import MusicPlayerContext from "@/utils/PlayerContext.js";


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
        lyricList,
        currentLine,
        lineHeights
    } = useContext(MusicPlayerContext)
    // 设置喜欢
    const [liked, setLiked] = useState(false);

    // 滑块Change事件
    const SliderChange = (e) => {
        seek(e);
    }

    return (
        <div>
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] backdrop-blur-lg"
                shadow="sm"
            >
                <CardBody>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                        <div className="relative col-span-6 md:col-span-4">
                            <Image
                                alt="Album cover"
                                className="object-cover"
                                height={200}
                                shadow="md"
                                src={song.cover}
                                width="100%"
                            />
                        </div>

                        <div className="flex flex-col col-span-6 md:col-span-8">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-0">
                                    <h3 className="font-semibold text-foreground/90">{song.title}</h3>
                                    <p className="text-small text-foreground/80">{song.album}</p>
                                    <h1 className="text-large font-medium mt-2">{song.singer}</h1>
                                </div>
                                <Button
                                    isIconOnly
                                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                    radius="full"
                                    variant="light"
                                    onPress={() => setLiked((v) => !v)}
                                >
                                    <HeartIcon
                                        className={liked ? "[&>path]:stroke-transparent" : ""}
                                        fill={liked ? "#EF1C26" : "none"}
                                    />
                                </Button>
                            </div>

                            <div className="flex flex-col mt-3 gap-1">
                                <Slider min={0} max={duration} step={1} value={currentTime} onChange={SliderChange}/>
                                <div className="flex justify-between">
                                    <p className="text-small">{formatTime(currentTime)}</p> {/* 显示当前播放时间 */}
                                    <p className="text-small text-foreground/50">{formatTime(duration)}</p> {/* 显示歌曲时长 */}
                                </div>
                            </div>

                            <div className="flex w-full items-center justify-center">
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
                                    {isPlaying ? <PauseCircleIcon size={54}/> : <PlayIcon size={54}/>}
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
                        </div>
                        <ScrollShadow hideScrollBar className="w-[570px] h-[400px] lyrics-container">
                            {lyricList.length > 0 ?
                                <ul className="w-full" style={{transform: `translateY(${lineHeights}px)`}}>
                                    {lyricList.map((item, idx) => (
                                        <li className={`text-sm text-center py-1 ${idx === currentLine ? 'active text-lg font-semibold text-foreground/100  transition-all py-1.5' : 'text-foreground/60'}`}
                                            key={item.time}
                                        >
                                            <p>{item.lrc}</p>
                                            <p>{item.tlyric}</p>
                                        </li>
                                    ))}
                                </ul> : <Spinner className="flex item-center h-full"/>}
                        </ScrollShadow>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
