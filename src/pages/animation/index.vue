<script setup>
import { newMV, videoSearch } from "@/api/api";
const paging = ref()
const state = reactive({
    list: [],
    animationList: [],
    kw: "刀剑神域"
})
const {
    list,
    kw,
    animationList
} = toRefs(state)

function onGetAllData(pageNo, pageSize) {
    videoSearch({ name: state.kw }).then(({ data }) => {
        state.animationList = data.data
    })
}

function onRouter(id) {
    uni.navigateTo({
        url: `/pages/mv/play?id=${id}`
    })
}
</script>
<template>
    <z-paging ref="paging" v-model="animationList" @query="onGetAllData">
        <template #top>
            <div class="header">
                <div class="mv-logo">animation</div>
                <img class="user-avatar" src="https://resource.tuniaokj.com/images/avatar/test_avatar.jpg"
                    alt="User Avatar">
            </div>
            <tn-search-box placeholder-icon="search" :search-button="false" shape="round" :border="false"
                placeholder="Search..." class="search-input" v-model="kw" />

            <div class="banner tn-shadow-blur">
                <div class="banner-title">Banner Title</div>
                <div class="banner-description">Banner Description</div>
            </div>

        </template>

        <div class="mv-list">
            <div class="mv-item" v-for="item in animationList" :key="item.id" @click="onRouter(item.id)">
                <img class="mv-cover tn-shadow-blur" :src="item.cover + '?param=370y220'" alt="MVCover">
                <div class="mv-info">
                    <div class="mv-title">{{ item.name }}</div>
                    <div class="mv-subtitle">{{ item.artists.map(item => item.name).join() }} - 播放{{ item.playCount }}</div>
                </div>
            </div>
        </div>
    </z-paging>
</template>
<style lang='scss' scoped>
@import './index.scss';
</style>