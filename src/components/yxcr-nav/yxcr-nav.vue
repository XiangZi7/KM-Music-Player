<script setup>
import YxcrPlayer from "../player/player.vue";
import { PlayerStore } from "@/stores/modules/player";
import { GlobalStore } from "@/stores/index";
const globalstore = GlobalStore()
const playerstore = PlayerStore()

const state = reactive({
    list: [],
    currentTabbar: 0,
    showPlayer: false,
    routerList: [
        { url: "/pages/index/index" },
        { url: "/pages/me/index" },
    ]
})
const {
    list,
    currentTabbar,
    showPlayer
} = toRefs(state)

function change(idx) {
    uni.switchTab({
        url: state.routerList[idx].url
    })
}

onLoad(() => {
    uni.hideTabBar()
})
</script>
<template>
    <div>
        <tn-tabbar :z-index="2" @change="change" frosted v-model="globalstore.currentTabbar" fixed>
            <tn-tabbar-item icon="home" active-icon="home-fill" text="首页" />
            <div class="tn-flex items-center">
                <tn-avatar size="95" :url="playerstore.songs[playerstore.currentIndex].cover" @click="showPlayer = true" />
            </div>
            <tn-tabbar-item icon="my-circle" active-icon="my-circle-fill" text="我的" />
        </tn-tabbar>
    </div>
    <tn-popup v-model="showPlayer" bg-color="#EEF5FD" open-direction="bottom" height="100%">
        <YxcrPlayer @left-click="showPlayer = false"></YxcrPlayer>
    </tn-popup>
</template>
<style lang='scss' scoped>
@import "./index.scss";
</style>