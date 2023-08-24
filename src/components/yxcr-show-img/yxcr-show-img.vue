<script setup>
import buyer from "@/assets/images/buyer-img.png";
import imAvatar from "@/assets/images/imAvatar.png";
import userImg from "@/assets/images/userImg.jpg";
import defs from "@/assets/img/def.png";
const state = reactive({
    list: [],
    imgPath: "",
    // 图片是否加载错误，如果是，则显示错误占位图
    isError: false
})
const {
    list,
    imgPath,
    isError
} = toRefs(state)
const emit = defineEmits(['handleClick'])
const props = defineProps({
    src: {
        type: String,
        default: ''
    },
    imgAlt: {
        type: String,
        default: ''
    },
    classList: {
        type: Array,
        default: () => {
            return []
        }
    },
    imgStyle: {
        type: Object,
        default: () => {
            return {}
        }
    },
    defImg: { // 图片失效后，默认图类型
        type: String,
        default: '1'
    }
})
watch(
    () => props.src,
    (path) => {
        if (!path) {
            state.isError = true
        } else {
            state.isError = false
            state.imgPath = path
        }
    },
    { immediate: true }
)

function imgError() {
    state.isError = true
}
function imgLoad() {
    state.isError = false
}
function handleClick() {
    emit('handleClick')
}
function onGetDefImg() {
    if (props.defImg === '1') {
        return defs
    } else if (props.defImg === '2') {
        console.log(userImg);
        return userImg
    } else if (props.defImg === '3') {
        return imAvatar
    } else if (props.defImg === '4') {
        return buyer
    }
}


</script>
<template>
    <image v-if="!isError" :src="imgPath" :class="classList" :style="imgStyle" :alt="imgAlt" @error="imgError" @load="imgLoad"
        @click="handleClick" />
    <image v-else :src="onGetDefImg()" alt="def.png" :class="classList" :style="imgStyle" @click="handleClick" />
</template>
<style lang='scss' scoped></style>