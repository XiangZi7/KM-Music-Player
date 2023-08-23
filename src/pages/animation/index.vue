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
        url: `/pages/animation/animedeta?id=${id}`
    })
}
function gtback() {
    uni.navigateBack();
}

</script>
<template>
    <div class="page-container">
        <z-paging ref="paging" v-model="animationList" @query="onGetAllData">
            <template #top>
                <div class="head tn-flex justify-between">
                    <div class="btn">
                        <tn-icon size="30" name="left" @click="gtback" />
                    </div>
                    <div class="btn">
                        <img class="user-avatar" src="https://resource.tuniaokj.com/images/avatar/test_avatar.jpg"
                            alt="User Avatar">
                    </div>
                </div>
                <tn-search-box placeholder-icon="search" :search-button="false" shape="round" :border="false"
                    placeholder="Search..." class="search-input" v-model="kw" />

                <div class="banner tn-shadow-blur">
                    <div class="banner-title">Banner Title</div>
                    <div class="banner-description">Banner Description</div>
                </div>

            </template>

            <div class="mv-list">
                <div class="mv-item" v-for="item in animationList" :key="item.videoId" @click="onRouter(item.videoId)">
                    <img class="mv-cover tn-shadow-blur" :src="item.cover" alt="MVCover">
                    <div class="mv-info">
                        <div class="mv-title">{{ item.title }}</div>
                        <div class="mv-subtitle">{{ item.videoType }}</div>
                    </div>
                </div>
            </div>
        </z-paging>
    </div>
</template>
<style lang='scss' scoped>
@import './index.scss';
</style>