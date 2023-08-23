<script setup>
import { formatTime } from "@/src/utils/formatTime";
import { GlobalStore } from "@/stores/index";
import { PlayerStore } from "@/stores/modules/player";
import { songUrl, cloudsearch } from "@/api/api";
const playerstore = PlayerStore()
const globalstore = GlobalStore()
const state = reactive({
    list: [],
})
const {
    list,
} = toRefs(state)

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
})

async function playerMusic(params) {
    const isExisting = playerstore.songs.findIndex(item => item.id == params.id)
    if (isExisting != -1) {
        playerstore.currentIndex = isExisting
    } else {
        // 1.获取歌曲链接
        const { data } = await songUrl(params)
        playerstore.songs.push({
            title: params.title,
            singer: params.singer,
            cover: params.cover,
            src: data.data[0].url,
            time: params.time,
            album: params.album,
            id: params.id,
            mv: params.mv,
        })
        playerstore.player.src = playerstore.songs[playerstore.songs.length - 1].src;
        playerstore.currentIndex = playerstore.songs.length - 1;
        nextTick(() => {
            playerstore.player.play();
        })
    }
}

</script>
<template>
    <div class="popular">
        <div class="popular-item" v-for="item in props.data" :key="item.id" @click="playerMusic(item)">
            <div class="avatar">
                <tn-avatar class="tn-shadow-md" shape="square" size="130" :url="item.cover + '?param=100y100'" />
            </div>
            <div class="info">
                <text class="tn-text-sm">{{ item.title }}</text>
                <text class="des tn-text-ellipsis-2">{{ item.singer }}</text>
            </div>
            <div class="tn-flex justify-end tn-flex-1 des items-center">
                <text class="tn-text-xs">{{ formatTime(item.time) }}</text>
                <tn-icon name="more-vertical" size="45" />
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
@import './index.scss';

.des {
    color: var(--text-color-placeholder);
}
</style>