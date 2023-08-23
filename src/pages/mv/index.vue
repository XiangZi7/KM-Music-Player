<script setup>
import { newMV } from "@/api/api";
const paging = ref()
const state = reactive({
    list: [],
    mvList: []
})
const {
    list,
    mvList
} = toRefs(state)

function onGetAllData(pageNo, pageSize) {
    newMV().then(({ data }) => {
        state.mvList = data.data
    })
}

function onRouter(id) {
    uni.navigateTo({
        url: `/pages/mv/play?id=${id}`
    })
}
function gtback() {
    uni.navigateBack();
}
</script>
<template>
    <div class="page-container">

        <z-paging ref="paging" v-model="mvList" @query="onGetAllData">
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
                <!-- <div class="header">
                <div class="mv-logo">MV</div>
                <img class="user-avatar" src="https://resource.tuniaokj.com/images/avatar/test_avatar.jpg"
                    alt="User Avatar">
            </div> -->
                <tn-search-box placeholder-icon="search" :search-button="false" shape="round" :border="false"
                    placeholder="Search..." class="search-input" />

                <div class="banner tn-shadow-blur">
                    <div class="banner-title">Banner Title</div>
                    <div class="banner-description">Banner Description</div>
                </div>

            </template>

            <div class="mv-list">
                <div class="mv-item" v-for="item in mvList" :key="item.id" @click="onRouter(item.id)">
                    <img class="mv-cover tn-shadow-blur" :src="item.cover + '?param=370y220'" alt="MVCover">
                    <div class="mv-info">
                        <div class="mv-title">{{ item.name }}</div>
                        <div class="mv-subtitle">{{ item.artists.map(item => item.name).join() }} - 播放{{ item.playCount }}
                        </div>
                    </div>
                </div>
            </div>
        </z-paging>
    </div>
</template>
<style lang='scss' scoped>
@import './index.scss';
</style>