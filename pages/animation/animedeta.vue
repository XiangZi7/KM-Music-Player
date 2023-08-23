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

</script>
<template>
    <div class="detail-page">
        <div class="info">
            <div class="detail-info">
                <div class="cover">
                    <img :src="list.cover" mode="aspectFill" />
                </div>
                <div class="detail-title">
                    <h2 class="title">{{ list.title }}</h2>
                    <p class="description">{{ list.descs }}</p>
                </div>

            </div>

            <div class="details">
                <p class="item"><span class="label">导演：</span>{{ list.director }}</p>
                <p class="item"><span class="label">声优：</span>{{ list.actor }}</p>
                <p class="item"><span class="label">地区：</span>{{ list.region }}</p>
                <p class="item"><span class="label">上映时间：</span>{{ list.releaseTime }}</p>
                <p class="item"><span class="label">视频分类：</span>{{ list.videoType }}</p>
            </div>
            <div class="episodes">
                <h3 class="section-title">集数</h3>
                <ul class="episode-list">
                    <li v-for="episode in list.chapterList" :key="episode" class="episode">{{ episode.title }}</li>
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
    margin-bottom: 20px;
}

.item {
    margin-bottom: 10px;
}

.label {
    font-weight: bold;
}

.episode-list {
    list-style: none;
    padding: 0;
}

.episode {
    margin-bottom: 5px;
}
</style>