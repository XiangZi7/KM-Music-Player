<script setup>
import { mvUrl, mvDetail, commentMV } from "@/api/api";
const paging = ref()
const state = reactive({
    danmuList: [],
    mvInfo: {},
    commentList: [],
    total: 0,
    mvid: "",
})
const {
    danmuList,
    mvInfo,
    commentList,
    total,
} = toRefs(state)
onLoad(async ({ id }) => {
    const [mvData, mvDetailData] = await Promise.all([
        // 1.mv链接
        mvUrl(id),
        // 2.MV详情
        mvDetail(id),
        // 3.获取评论
        state.mvid = id
    ]);
    state.mvInfo = { url: mvData.data.data.url, mvDetail: mvDetailData.data.data }
})
// 获取评论
function onGetCommData(pageNo, pageSize) {
    commentMV({ id: state.mvid, offset: (pageNo - 1) * 20, limit: pageSize }).then(({ data }) => {
        state.total = data.total
        paging.value.complete(data.comments)
    })
}
</script>
<template>
    <div>
        <z-paging ref="paging" v-model="commentList" @query="onGetCommData">
            <template #top>
                <div class="mv-player">
                    <video id="myVideo" :src="mvInfo.url" :danmu-list="danmuList" enable-danmu danmu-btn controls
                        autoplay></video>
                </div>

                <div class="mv-details tn-shadow-md">
                    <div class="mv-title">{{ mvInfo.mvDetail?.name }}</div>
                    <div class="mv-artist">{{ mvInfo.mvDetail?.artists.map(item => item.name).join() }} - 播放 {{
                        mvInfo.mvDetail?.playCount }}</div>
                </div>
            </template>

            <div class="user-comments">
                <div class="user-comment tn-shadow-md" v-for="item in commentList" :key="item.id">
                    <div class="user-card">
                        <img class="user-avatar" :src="item.user.avatarUrl + '?param=32y32'" alt="User 1">
                        <div class="user-info">
                            <div class="user-name">{{ item.user.nickname }}</div>
                            <div class="comment-text">{{ item.content }}</div>
                            <div class="comment-time">
                                <span class="ip-address">{{ item.ipLocation.location }}</span>
                                <span>{{ item.timeStr }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </z-paging>
    </div>
</template>
<style lang='scss' scoped>
@import './play.scss';
</style>