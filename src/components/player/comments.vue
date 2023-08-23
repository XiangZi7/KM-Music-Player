<script setup>
import { commentMusic } from "@/api/api";
import { PlayerStore } from "@/stores/modules/player";
const paging = ref()
const playerstore = PlayerStore()

const state = reactive({
    list: [],
    showPopup: false,
    commentsList: [],
    total: 0
})
const {
    list,
    showPopup,
    commentsList,
    total
} = toRefs(state)
const props = defineProps({
    id: {
        type: String,
        default: ""
    }
})
// onLoad(() => {
//     commentMusic({ id: props.id }).then(({ data }) => {
//         state.total = data.total
//         state.commentsList = data.comments
//         // paging.value.complete(data.comments)
//     })
// })

watch(() => props.id, () => {
    paging.value.clear()
    commentMusic({ id: props.id }).then(({ data }) => {
        state.total = data.total
        // state.commentsList = data.comments
        paging.value.complete(data.comments)
    })
})

function showComment() {
    state.showPopup = true
}

function onGetAllData(pageNo, pageSize) {
    commentMusic({ id: props.id, offset: (pageNo - 1) * 20, limit: pageSize }).then(({ data }) => {
        state.total = data.total
        // state.commentsList = data.comments
        paging.value.complete(data.comments)
    })
}
</script>
<template>
    <div class="des" @click="showComment">
        <text>评论({{ total }}) </text>
        <tn-icon class="tn-ml-xs" size="20" name="up-double" />
    </div>
    <tn-popup :z-index="999999" v-model="showPopup" bg-color="#EEF5FD" open-direction="bottom" height="85%">
        <z-paging ref="paging" v-model="commentsList" @query="onGetAllData">
            <div style="padding: 10px;">
                <div class="comment-container" v-for="item in commentsList" :key="item.id">
                    <div class="comment-header">
                        <img class="comment-avatar" :src="item.user.avatarUrl + '?param=32y32'" alt="Avatar">
                        <div>
                            <span class="comment-author">{{ item.user.nickname }}</span>
                        </div>
                    </div>
                    <div class="comment-content">
                        {{ item.content }}
                    </div>
                    <div class="comment-footer">
                        <span class="comment-ip">IP所属:{{ item.ipLocation.location }}</span>
                        <span class="comment-date">{{ item.timeStr }}</span>
                    </div>
                </div>
            </div>
        </z-paging>
    </tn-popup>
</template>
<style lang='scss' scoped>
@import './comments.scss';

.des {
    font-size: var(--font-size-sm);
    color: var(--text-color-placeholder);
}
</style>