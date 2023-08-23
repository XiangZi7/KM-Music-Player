<script setup>
import { songPlaylist, catlist } from "@/api/api";
import { formatNumber } from "@/src/utils/formatTime";
const state = reactive({
    songList: [],
    currentTabIndex: 0,
    pageNo: 1,
    isLoading: false,
    tabsData: []
});

const { songList, currentTabIndex, tabsData } = toRefs(state);



function gtback() {
    uni.navigateBack();
}

onLoad(async () => {
    catlist().then(({ data }) => {
        state.tabsData = data.sub
        state.tabsData.unshift(data.all)
        queryList();
    })

});
// 底部时自动下一页
function lowerBottom(params) {
    if (params.detail.direction != 'bottom') return
    queryList()
}
// 数据加载
async function queryList(cat) {
    if (state.isLoading) return;

    state.isLoading = true;
    try {
        const offset = (state.pageNo - 1) * 30;
        songPlaylist({ limit: 30, offset, cat }).then(res => {
            state.songList = state.songList.concat(res.data.playlists);
            state.pageNo++;
        })

    } catch (error) {
        console.error("Failed to load data:", error);
    } finally {
        state.isLoading = false;
    }
}
// tabs发生改变
function tabsChange(idx) {
    state.songList = []
    queryList(state.tabsData[idx].name)
}

function navigate(params, value) {
    uni.navigateTo({
        url: "/pages/" + params + (value ? "?id=" + value : "")
    });
}
</script>
<template>
    <div class="page-container">
        <div class="head tn-flex justify-between">
            <div class="btn">
                <tn-icon size="30" name="left" @click="gtback" />
            </div>
            <div class="btn">
                <tn-icon size="30" name="share" />
            </div>
        </div>
        <tn-tabs @change="tabsChange" bg-color="" v-model="currentTabIndex" class="yxbr-10 tn-mt-sm tn-mb-sm">
            <tn-tabs-item v-for="(item, index) in tabsData" :key="index" :title="item.name" />
        </tn-tabs>

        <scroll-view @scrolltolower="lowerBottom" style="height:90vh;" scroll-y="true">
            <tn-water-fall :data="songList">
                <template #left="{ item }">
                    <div class="song-item" @click="navigate('playListDetail/index', item.id)">
                        <div class="song-card">
                            <div class="play-count">
                                <tn-icon name="play" />
                                {{ formatNumber(item.playCount) }}
                            </div>
                            <img class="song-cover" :src="item.coverImgUrl + '?param=200y200'" alt="封面" />
                        </div>
                        <div class="song-info">
                            <p class="song-title">{{ item.name }}</p>
                        </div>
                    </div>
                </template>
                <template #right="{ item }">
                    <div class="song-item" @click="navigate('playListDetail/index', item.id)">
                        <div class="song-card">
                            <div class="play-count">
                                <tn-icon name="play" />
                                {{ formatNumber(item.playCount) }}
                            </div>
                            <img class="song-cover" :src="item.coverImgUrl + '?param=200y200'" alt="封面" />
                        </div>
                        <div class="song-info">
                            <p class="song-title">{{ item.name }}</p>
                        </div>
                    </div>
                </template>
            </tn-water-fall>
        </scroll-view>
    </div>
</template>
<style lang='scss' scoped>
@import './index.scss';
</style>