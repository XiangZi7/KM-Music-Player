<script setup>
import { PlayerStore } from "@/stores/modules/player";
import { getImageThemeColor } from "@/src/utils/ThemeColor";
import { lyric } from "@/api/api";
import comments from "./comments.vue";
const playerstore = PlayerStore()
const state = reactive({
    list: [],
    sliderValue: 0,
    progress: 0,
    currentTime: 0,
    duration: 0,
    lyrics: [],

    // 歌词属性：
    height: 0,
    top: 0,
    currentLine: -1
})
const {
    list,
    sliderValue,
    progress,
    currentTime,
    duration,
    lyrics,
    height,
    top,
    currentLine
} = toRefs(state)
onMounted(() => {
    // 获取歌词
    getLyric()
    nextTick(async () => {
        // 初始化播放器
        initPlayer()
        // 初始化动态封面颜色
        getImageThemeColor(playerstore.songs[playerstore.currentIndex].cover, "getImageThemeColorCanvas", (retRGBColor) => {
            playerstore.songs[playerstore.currentIndex].coverThemeColor = retRGBColor
        })
    })

})

const Emits = defineEmits(['leftClick'])
function getLyric() {
    if (playerstore.songs[playerstore.currentIndex].Lyric) {
        state.lyrics = parseLyrics(playerstore.songs[playerstore.currentIndex].Lyric)
    } else {
        lyric(playerstore.songs[playerstore.currentIndex].id).then(res => {
            playerstore.songs[playerstore.currentIndex].Lyric = res.data.lrc.lyric
            state.lyrics = parseLyrics(playerstore.songs[playerstore.currentIndex].Lyric)
        })
    }

}
function initPlayer() {
    // 侦听时间变化
    playerstore.player.onTimeUpdate(() => {
        // 进度条时间
        state.progress = playerstore.player.currentTime / playerstore.player.duration * 100
        // 当前播放时间
        state.currentTime = Math.floor(playerstore.player.currentTime)
        // 当前播放歌曲的总时长
        state.duration = Math.floor(playerstore.player.duration)

        //
        for (let i = 0; i < state.lyrics.length; i++) {
            if (i === state.lyrics.length - 1 || state.currentTime < state.lyrics[i + 1].time) {
                var newi = i - 1;
                state.currentLine = i
                state.top = (newi * -30) + 100 + "rpx";
                var height = 50 - newi * 30
                state.height = height
                break
            }
        }
    });
    // 侦听播放状态
    playerstore.player.onPlay(() => {
        playerstore.isPlaying = true
        playerstore.animationPlayState = "running"

        nextTick(() => {
            // 设置动态封面颜色
            if (!playerstore.songs[playerstore.currentIndex].coverThemeColor) {
                getImageThemeColor(playerstore.songs[playerstore.currentIndex].cover, "getImageThemeColorCanvas", (retRGBColor) => {
                    playerstore.songs[playerstore.currentIndex].coverThemeColor = retRGBColor
                })
            }
        })
        getLyric()
        console.log("音频播放事件");
    })

    playerstore.player.onPause(() => {
        playerstore.isPlaying = false
        playerstore.animationPlayState = "paused"
        console.log("音频暂停事件");
    })

    // 歌曲结束自动下一首
    playerstore.player.onEnded(() => {
        playNext()
    })

    // 默认选择第一首歌曲
    playerstore.player.src = playerstore.songs[playerstore.currentIndex].src
}

// 解析歌词
const parseLyrics = (lyric) => {
    if (!lyric) return
    const lines = lyric.split('\n')
    return lines.map(line => {
        const matches = line.match(/^\[(\d{2}):(\d{2}\.\d{2,3})\](.*)/)
        if (matches) {
            const minutes = parseInt(matches[1])
            const seconds = parseFloat(matches[2])
            const text = matches[3].trim()
            return { time: minutes * 60 + seconds, text }
        } else {
            return null
        }
    }).filter(line => line !== null)
}

// 播放方法
function play() {
    playerstore.isPlaying = true
    playerstore.animationPlayState = "running"
    nextTick(() => {
        playerstore.player.play();
    })
}

// 暂停方法
function pause() {
    playerstore.isPlaying = false
    playerstore.animationPlayState = "paused"
    playerstore.player.pause();
}

function togglePlay() {
    if (playerstore.isPlaying) {
        pause()
    } else {
        play()
    }
}
// 下一首
function playNext() {
    if (playerstore.currentIndex === playerstore.songs.length - 1) {
        playerstore.currentIndex = 0
    } else {
        playerstore.currentIndex++
    }
    playerstore.player.src = playerstore.songs[playerstore.currentIndex].src;
    nextTick(() => {
        playerstore.player.play();

    })
}
// 上一首
function playPrev() {
    if (playerstore.currentIndex === 0) {
        playerstore.currentIndex = playerstore.songs.length - 1
    } else {
        playerstore.currentIndex--
    }
    playerstore.player.src = playerstore.songs[playerstore.currentIndex].src;
    nextTick(() => {
        playerstore.player.play();
    })
}

// 格式化时间
function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
// 更改歌曲时间进度
function changeProgress() {
    let ct = (state.progress * state.duration) / 100;
    if (!isNaN(ct)) {
        playerstore.player.seek(ct)
    }
}


function leftClick() {
    Emits("leftClick")
}
</script>
<template>
    <div class="container"
        :style="{ 'background': `linear-gradient(${playerstore.songs[playerstore.currentIndex].coverThemeColor} 0%,#EEF2F8 50%, #EDF4FC 100%` }">
        <!-- 规避头部的距离 -->
        <div style=" padding-top: var(--status-bar-height);"></div>
        <canvas id="getImageThemeColorCanvas" canvas-id="getImageThemeColorCanvas" style="position: absolute;
  left: -9999px;
  top: -9999px;"></canvas>
        <!-- 头部 -->
        <div class="header">
            <div class="by" style="background-color: #fff;width: 3em;height: 3em;">
                <tn-icon size="45" name="down" @click="leftClick" />
            </div>
            <div class="header-title">
                <text class="title">{{ playerstore.songs[playerstore.currentIndex].title }}</text>
                <text class="des" style="color: #000;">{{ playerstore.songs[playerstore.currentIndex].singer }}</text>
            </div>
            <div class="by" style="background-color: #fff;width: 3em;height: 3em;">
                <tn-icon size="45" name="share" />
            </div>
        </div>
        <!-- 封面 -->
        <div class="content">
            <div class="cover">
                <image class="image rotate" :style="{ animationPlayState: playerstore.animationPlayState }"
                    :src="playerstore.songs[playerstore.currentIndex].cover" mode="aspectFill" />
            </div>
        </div>
        <!-- 歌词 -->
        <div class="lyrics-container">
            <div class="other" :style="{ 'transform': 'translateY(' + height + 'px)' }"
                :class="{ active: index == currentLine }" v-for="(item, index) in lyrics" :key="index"
                style="text-align: center;">
                {{ item.text }}
            </div>
        </div>
        <!-- 操作栏 -->
        <div class="tabbar">
            <div class="tn-p-lg">
                <tn-slider @change="changeProgress" v-model="progress" :min="0" :max="100" />
                <div class="time des">
                    <text>{{ formatTime(currentTime) }}</text>
                    <text>{{ formatTime(duration) }}</text>
                </div>
                <div class="btn">
                    <div class="by">
                        <tn-icon size="49" name="previous-song-fill" @click="playNext" />
                    </div>
                    <div class="by" style="width: 5em;height: 5em;">
                        <tn-icon size="60" :name="playerstore.isPlaying ? 'stop' : 'play-fill'" @click="togglePlay" />
                    </div>
                    <div class="by">
                        <tn-icon size="49" name="next-song-fill" @click="playPrev" />
                    </div>

                </div>
            </div>
            <div class="review">
                <tn-icon size="45" name="menu" />
                <comments :id="playerstore.songs[playerstore.currentIndex].id"></comments>
                <tn-icon size="45" name="align" />
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
@import "./index.scss";
</style>