<script setup>
import { videoUrl } from "@/api/api";
const state = reactive({
    list: [],
})
const {
    list,
} = toRefs(state)
onLoad(({ id }) => {
    videoUrl({ id }).then(({ data }) => {
        state.list = data.data
    })
})

function toRouter(id) {
    uni.navigateTo({
        url: `/pages/animation/player?id=${id}`
    })
}
</script>
<template>
    <div class="detail-page">
        <div class="info">
            <div class="detail-info">
                <div class="cover tn-shadow-blur">
                    <img :src="list.cover" mode="aspectFill" />
                </div>
                <div class="detail-title">
                    <h2 class="title">{{ list.title }}</h2>
                    <p class="item"><span class="label">地区：</span>{{ list.region }}</p>
                    <p class="item"><span class="label">上映时间：</span>{{ list.releaseTime }}</p>
                    <p class="item"><span class="label">视频分类：</span>{{ list.videoType }}</p>
                </div>

            </div>

            <div class="details">
                <p class="description">{{ list.descs }}</p>
                <p class="item description"><span class="label">导演：</span>{{ list.director }}</p>
                <p class="item description"><span class="label">声优：</span>{{ list.actor }}</p>
            </div>
            <div class="episodes">
                <h3 class="section-title">集数</h3>
                <ul class="episode-list">
                    <li @click="toRouter(episode.chapterPath)" v-for="episode in list.chapterList" :key="episode" class="episode">{{ episode.title }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.detail-page {
    display: flex;
    justify-content: center;
    // align-items: flex-start;
    padding: 20px;
}


.detail-info {
    display: flex;
    flex-direction: row;
}

.cover {
    width: 200rpx;
    height: 300rpx;
    margin-right: 20px;
}

.cover img {
    width: 200rpx;
    height: 300rpx;
    object-fit: cover;
    border-radius: 10rpx;
}

.title {
    font-size: 24px;
    margin-bottom: 10px;
}

.description {
    margin-bottom: 20px;
    color: var(--tn-text-color-placeholder);
    font-size: var(--font-size-sm);
}

.details {
    margin-bottom: 20rpx;
    margin-top: 20rpx;
}

.item {
    margin-bottom: 10px;
}

.label {
    font-weight: bold;
}

.episode-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;

}

.episode {
   margin: 10rpx;
    padding: 10rpx 30rpx;
    background-color: #F1F2F4;
    border-radius: 10rpx;
}
</style>