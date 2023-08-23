<script setup>
import { playListDetail } from "@/api/api";
const state = reactive({
    list: [],
    router: {},
    playlists: {}
})
const {
    list,
    router,
    playlists
} = toRefs(state)
onLoad(async (params) => {
    console.log("🚀 => params:", params)

    const { data } = await playListDetail({ id: params.id })
    state.playlists = data.playlist
    state.list = data.playlist.tracks.map(item => {
        const names = item.ar.map(subItem => subItem.name).join(',');
        return {
            cover: item.al.picUrl,
            title: item.name,
            singer: names,
            album: item.al.name,
            time: item.dt,
            id: item.id,
            mv: item.mv
        }
    })

})
function gtback() {
    uni.navigateBack()
}

</script>
<template>
    <div class="container">
        <div class="head tn-flex justify-between">
            <div class="btn">
                <tn-icon size="30" name="left" @click="gtback" />
            </div>
            <div class="btn">
                <tn-icon size="30" name="share" />
            </div>
        </div>
        <div class="card" :style="{ backgroundImage: `url(${playlists.coverImgUrl + '?param=250y250'})` }">
            <div class="card-content">
                <h2 class="card-title tn-text-ellipsis-1">{{ playlists.name }}</h2>
                <div class="user-info">
                    <img class="avatar" :src="playlists.creator?.avatarUrl + '?param=60y60'" alt="User Avatar">
                    <span class="username">{{ playlists.creator?.nickname }}</span>
                </div>
                <p class="description tn-text-ellipsis-2">
                    {{ playlists.description }}
                </p>
            </div>
        </div>
        <div class="main">
            <div class="play-all">
                <div class="play-item">
                    <div class="play-icon">
                        <tn-icon size="20" color="#fff" name="play" />
                    </div>
                    <div class="play-text">播放全部</div>
                </div>
                <div class="play-item">
                    <div class="icon tn-mr-xs">
                        <tn-icon size="20" name="audio" />
                    </div>
                    <div class="icon">
                        <tn-icon size="20" name="align" />
                    </div>
                </div>
            </div>
            <yxcr-table :data="list"></yxcr-table>
        </div>
    </div>
</template>
<style lang='scss' scoped>
@import './index.scss';
</style>