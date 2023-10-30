import React, {useState, useEffect, useRef, useContext} from 'react'
import {formatTime} from "@/utils/FormatTime.jsx";
import MusicPlayerContext from '@/utils/PlayerContext.js';
import {PauseCircleIcon} from "@/components/min-Player/PauseCircleIcon.jsx";
import {PlayIcon} from "@/components/min-Player/PlayIcon.jsx";

export default function Test() {
    const {
        isPlaying,
        duration,
        currentTime,
        song,
        handleNextClick,
        handlePlayPauseClick
    } = useContext(MusicPlayerContext)

    return (
        <div>
            {/*<button onClick={play}>Play</button>*/}
            {/*<button onClick={pause}>Pause</button>*/}
            <button onClick={handlePlayPauseClick}>
                {isPlaying ? <PauseCircleIcon size={54}/> : <PlayIcon size={54}/>}</button>
            <p>Is playing: {isPlaying ? 'Yes' : 'No'}</p>
            <p>{formatTime(duration)}</p>
            <p>{formatTime(currentTime)}</p>
            <p>{song.title}</p>
            <button onClick={handleNextClick}>下一首</button>
        </div>
    );
}