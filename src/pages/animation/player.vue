<script setup>
const state = reactive({
    list: [],
    url: ''
})
const {
    list,
    url
} = toRefs(state)
onLoad(({ id }) => {
    state.url = id
})

</script>
<template>
    <div>
        <video class="ad" id="myVideo" :src="url" autoplay enable-danmu danmu-btn controls></video>
    </div>
</template>
<style lang='scss' scoped>
.ad {
    width: 100%;
}
</style>