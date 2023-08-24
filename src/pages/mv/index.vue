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
                <grid-head bg="10">
                    <tn-search-box placeholder-icon="search" :search-button="false" shape="round" :border="false"
                        placeholder="Search..." class="search-input" />
                </grid-head>
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