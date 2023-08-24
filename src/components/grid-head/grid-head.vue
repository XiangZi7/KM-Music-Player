<script setup>
const state = reactive({
    list: [],
})
const {
    list,
} = toRefs(state)

const props = defineProps({
    bg: {
        type: String,
        default: "8"
    }
})

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
                <img class="user-avatar" src="https://resource.tuniaokj.com/images/avatar/test_avatar.jpg"
                    alt="User Avatar">
            </div>
        </div>
        <slot></slot>
        <div class="banner tn-shadow-blur" :style="{ backgroundImage: `url(/src/static/sc${props.bg}.png)` }">
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
    background-image: url('@/static/sc10.png');
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
</style>