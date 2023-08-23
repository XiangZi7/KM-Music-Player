<script setup>
import { anonimous, cellphone, captcha, verify } from "@/api/api";
const formRef = ref()
// 规则
const formRules = {
    phone: [
        { required: true, message: 'Please enter the phone number', trigger: ['change', 'blur'] },
        {
            pattern: /^1[3456789]\d{9}$/,
            message: 'The mobile phone number format is incorrect',
            trigger: ['change', 'blur'],
        },
    ],
    captcha: [
        { required: true, message: 'Please enter the verification code', trigger: ['change', 'blur'] },
        {
            trigger: ['change', 'blur'],
        },
    ],
}
const state = reactive({
    list: [],
    model: {},
})
const {
    list,
    model
} = toRefs(state)

function gtback() {
    uni.navigateBack()
}
async function anonimousFn() {
    const { data } = await anonimous()

    uni.switchTab({
        url: "/pages/index/index"
    })
}

// 登录
async function fnLogin() {
    formRef.value?.validate(async (valid) => {
        if (valid) {
            // 因接口要验证、暂时实现不了登录功能
            // verify(state.model).then(({ data }) => {
            //     if (data.data) {
            //         cellphone(state.model)
            //     }
            // })
            uni.showToast({
                title: '表单成功',
                icon: 'none',
            })
        } else {
            uni.showToast({
                title: '表单校验失败',
                icon: 'none',
            })
        }
    })

}
function sent() {
    captcha({ phone: state.model.phone })
}
</script>
<template>
    <div class="container">
        <div class="head tn-flex justify-between">
            <div class="btn">
                <tn-icon size="30" name="left" @click="gtback" />
            </div>
            <div class="btn">
                <tn-icon size="30" name="share" />
            </div>
        </div>
        <div class="cover tn-shadow-blur"> </div>
        <tn-form class="form_main" ref="formRef" :model="model" :rules="formRules">
            <p class="heading">Login</p>
            <tn-form-item label="" prop="phone">
                <div class="inputContainer">
                    <tn-icon name="phone" class="inputIcon" />
                    <input placeholder="Phone" v-model="model.phone" class="inputField" type="number">
                </div>
            </tn-form-item>
            <tn-form-item label="" prop="captcha">
                <div class="inputContainer">
                    <tn-icon name="lock" class="inputIcon" />
                    <input placeholder="Verification code" v-model="model.captcha" class="inputField" type="number">
                    <tn-button class="tn-ml-xs" shape="round" size="lg" shadow type="success" @click="sent">Send</tn-button>
                </div>
            </tn-form-item>
            <tn-button class="tnbutton" shape="round" size="lg" shadow type="primary" @click="fnLogin">Login</tn-button>
            <tn-button class="tnbutton tn-mt-xs" shape="round" size="lg" shadow type="success"
                @click="anonimousFn">anonimous</tn-button>
            <div class="signupContainer">
                <p>Don't have any account?</p>
                <a href="#">Sign up</a>
            </div>
        </tn-form>
    </div>
</template>
<style lang='scss' scoped>
@import "./index.scss";
</style>