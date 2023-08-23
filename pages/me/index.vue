<script setup>
const state = reactive({
    songList: [
        { title: "栗山未来", sum: 50, cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F9495b6a9-acef-4749-b0d1-bd41b56ac2ff%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694075938&t=6631cb8c488699ce113b5e7ff52d2b74" },
        { title: "栗山未来", sum: 67, cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F9495b6a9-acef-4749-b0d1-bd41b56ac2ff%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694075938&t=6631cb8c488699ce113b5e7ff52d2b74" },
    ],

})
const {
    songList,
} = toRefs(state)
function routerLK(params) {
    uni.navigateTo({
        url: "/pages/login/index"
    })
}

</script>
<template>
    <div class="page-container">
        <div class="app">
            <div class="card bg">
                <div class="header">
                    <div @click="goBack">
                        <!-- <img class="button-icon" src="/static/back.png" alt="返回" /> -->
                    </div>
                    <div class="header-button" @click="routerLK">
                        <tn-icon name="install" size="40" />
                        <!-- <img class="button-icon" src="/static/settings.png" alt="设置" /> -->
                    </div>
                </div>
                <div class="content">
                    <img class="avatar"
                        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F9495b6a9-acef-4749-b0d1-bd41b56ac2ff%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694075938&t=6631cb8c488699ce113b5e7ff52d2b74"
                        alt="用户头像" />
                    <p class="username">yxcr</p>
                </div>
            </div>

            <div class="card">
                <div class="grid-container">
                    <div class="grid-item">
                        <tn-icon name="video" size="50" />
                        <p class="grid-label">最近播放</p>
                    </div>
                    <div class="grid-item">
                        <tn-icon name="download" size="50" />
                        <p class="grid-label">本地下载</p>
                    </div>
                    <div class="grid-item">
                        <tn-icon name="upload" size="50" />
                        <p class="grid-label">云盘</p>
                    </div>
                    <div class="grid-item">
                        <tn-icon name="like" size="50" />
                        <p class="grid-label">收藏</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <p class="section-title">我的歌单</p>
                <div class="song-list">
                    <div class="song-item" v-for="song in songList" :key="song.id">
                        <img class="song-cover" :src="song.cover" alt="封面" />
                        <div class="song-info">
                            <p class="song-title">{{ song.title }}</p>
                            <p class="song-artist">{{ song.sum }} 首</p>
                        </div>
                        <tn-icon name="more-vertical" color="#838383" size="35" />
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="headbox tn-shadow-blur tn-flex items-center">
                <div class="userinfo tn-flex items-center tn-ml-lg" @click="routerLK">
                    <tn-avatar size="xl" url="https://resource.tuniaokj.com/images/avatar/test_avatar.jpg"
                        @click="routerLK" />
                    <text class="tn-text-3xl tn-ml-sm" style="color: #fff;">yxcr</text>
                </div>
            </div>
            <div class="tn-flex-wrap boxgrid">
                <div class="colitem yxbr-10 tn-shadow-md tn-flex justify-around items-center">
                    <tn-avatar size="80" shape="square" url="https://tnuiimage.tnkjapp.com/logo/tuniao.png" />
                    <div class="tn-flex tn-flex-column  items-center">
                        <text class="tn-text-lg">收藏</text>
                        <text class="des">123</text>
                    </div>
                </div>
                <div class="colitem yxbr-10 tn-shadow-md tn-flex justify-around items-center">
                    <tn-avatar size="80" shape="square" url="https://tnuiimage.tnkjapp.com/logo/tuniao.png" />
                    <div class="tn-flex tn-flex-column  items-center">
                        <text class="tn-text-lg">最近</text>
                        <text class="des">123</text>
                    </div>
                </div>
                <div class="colitem yxbr-10 tn-shadow-md tn-flex justify-around items-center">
                    <tn-avatar size="80" shape="square" url="https://tnuiimage.tnkjapp.com/logo/tuniao.png" />
                    <div class="tn-flex tn-flex-column  items-center">
                        <text class="tn-text-lg">本地</text>
                        <text class="des">123</text>
                    </div>
                </div>
                <div class="colitem yxbr-10 tn-shadow-md tn-flex justify-around items-center">
                    <tn-avatar size="80" shape="square" url="https://tnuiimage.tnkjapp.com/logo/tuniao.png" />
                    <div class="tn-flex tn-flex-column  items-center">
                        <text class="tn-text-lg">云盘</text>
                        <text class="des">123</text>
                    </div>
                </div>
            </div>
            <div class="songlist">
                <div>
                    <text style="font-size: var(--font-size-lg);">我的歌单</text>
                    <text class="des tn-ml-xs">123</text>
                </div>
                <div class="songlist-item yxbr-10  tn-flex  items-center">
                    <tn-avatar size="120" shape="square" url="https://tnuiimage.tnkjapp.com/logo/tuniao.png" />
                    <div class="tn-flex tn-flex-column  items-center tn-ml-lg">
                        <text class="tn-text-lg">云盘</text>
                        <text class="des">123</text>
                    </div>
                </div>
                <div class="songlist-item yxbr-10  tn-flex  items-center">
                    <tn-avatar size="120" shape="square" url="https://tnuiimage.tnkjapp.com/logo/tuniao.png" />
                    <div class="tn-flex tn-flex-column  items-center tn-ml-lg">
                        <text class="tn-text-lg">云盘</text>
                        <text class="des">123</text>
                    </div>
                </div>
                <div class="songlist-item yxbr-10  tn-flex  items-center">
                    <tn-avatar size="120" shape="square" url="https://tnuiimage.tnkjapp.com/logo/tuniao.png" />
                    <div class="tn-flex tn-flex-column  items-center tn-ml-lg">
                        <text class="tn-text-lg">云盘</text>
                        <text class="des">123</text>
                    </div>
                </div>
            </div> -->
        <yxcr-nav></yxcr-nav>
    </div>
</template>
<style lang="scss" scoped>
@import "./index.scss";
</style>