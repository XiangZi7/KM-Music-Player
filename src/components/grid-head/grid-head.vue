<script setup>

const state = reactive({
    list: [],
    bgUrlList: [
        'https://s1.ax1x.com/2023/08/25/pPtrEsf.jpg',
        'https://s1.ax1x.com/2023/08/25/pPtrPJA.jpg',
        'https://s1.ax1x.com/2023/08/25/pPtrFzt.jpg',
        'https://s1.ax1x.com/2023/08/25/pPtrAQP.jpg',
        'https://s1.ax1x.com/2023/08/25/pPtrEsf.jpg',
    ]
})
const {
    list,
} = toRefs(state)
const changeBg = computed(() => state.bgUrlList[Math.floor(Math.random() * state.bgUrlList.length)])
const userinfo = computed(() => uni.getStorageSync('userinfo'));

function gtback() {
    uni.navigateBack();
}

</script>
<template>
    <div class="head">
        <div class="tn-flex justify-between">
            <div class="btn">
                <tn-icon size="30" name="left" @click="gtback" />
            </div>
            <div class="btn">
                <yxcr-show-img defImg="2" class="yxavatar" :src="userinfo.profile?.avatarUrl"></yxcr-show-img>
            </div>
        </div>
        <slot></slot>
        <div class="banner tn-shadow-blur" :style="{ backgroundImage: `url(${changeBg})` }">
            <div class="dw">
                <div class="banner-title">Banner Title</div>
                <div class="banner-description">Banner Description</div>
            </div>

        </div>
    </div>
</template>
<style lang='scss' scoped>
.head {
    width: 100%;
    padding-top: var(--status-bar-height);
    flex-direction: column;

    .btn {
        z-index: 99;
        background-color: #fff;
        width: 2em;
        height: 2em;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(0.625rem);
        margin: 0 10px;
    }
}

.user-avatar {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
}

.banner {
    // background-image: url('@/static/sc10.png');
    background-size: cover;
    background-position: 50% 30%;
    padding: 20px;
    color: #fff;
    height: 220rpx;
    position: relative;
}

.dw {
    position: absolute;
}

.banner-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.banner-description {
    font-size: 16px;
}

.yxavatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
</style>