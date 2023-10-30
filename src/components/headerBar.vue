<script setup>
import { loginStatus, createKey, createQR, checkKey, logout } from "@/api/api";
import { ElMessage } from 'element-plus'

const globalstore = GlobalStore()
const router = useRouter();

const state = reactive({
	list: [],
	kw: "",
	dialogVisible: false,
	loginForm: {},
	loginPopup: false,
	activeName: "first",
	// 二维码图片
	qrimg: "",
	phone: ""
})
const {
	list,
	kw,
	phone,
	dialogVisible,
	loginForm,
	loginPopup,
	activeName,
	qrimg
} = toRefs(state)

const currentUserstatus = computed(() => globalstore.isLogin)

const toResult = () => {
	router.push({ path: "/search", query: { keyWorks: kw.value } })
}

onMounted(async () => {
	// 查看登录状态
	loginStatus().then(res => {
		if (!res.data.data.account || res.data.data.account.status == -10) {
			ElMessage.success({
				message: "登录会解锁更多功能哦~",
				type: 'success',
			})
			globalstore.isLogin = false
		} else {
			globalstore.isLogin = true
			globalstore.userInfo = res.data.data.profile
		}
	})
})
const login = async () => {
	state.loginPopup = true

	// 1.获取二维码的key
	if (!globalstore.qrKey) {
		const key = await createKey();
		globalstore.qrKey = key.data.data.unikey
	}
	// 2.获取二维码图片
	const createQr = await createQR({ key: globalstore.qrKey, qrimg: true })
	state.qrimg = createQr.data.data.qrimg
}

const userlogout = async () => {
	await logout()
	// 清空原本的数据
	globalstore.qrKey = ""
	globalstore.userInfo = ""
	globalstore.isLogin = false
}

// 二维码验证
const verify = async () => {
	// / 查看是否扫描了二维码
	const { data } = await checkKey({ key: globalstore.qrKey })
	if (data.code == 800) {
		// 如果过期了，重新渲染
		const key = await createKey();
		globalstore.qrKey = key.data.data.unikey
		const createQr = await createQR({ key: globalstore.qrKey, qrimg: true })
		state.qrimg = createQr.data.data.qrimg
	} else if (data.code == 803) {
		// 查看登录状态
		loginStatus().then(res => {
			if (res.data.data.account.status == -10) {
				globalstore.isLogin = false
			} else {
				globalstore.isLogin = true
				globalstore.userInfo = res.data.data.profile
			}
		})
		state.loginPopup = false
	}
}


const handleClick = (e) => {
	console.log(e);
}

const submit = () => {

}
</script>
<template>
	<div class="header">
		<div class="menu-circle"></div>
		<div class="header-menu">
			<a class="menu-link is-active" href="javascript:;" @click="router.back()">
				<svg t="1648618382129" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					p-id="2830" width="32" height="32">
					<path
						d="M576 672c-6.4 0-19.2 0-25.6-6.4l-128-128c-12.8-12.8-12.8-32 0-44.8l128-128c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L492.8 512l102.4 102.4c12.8 12.8 12.8 32 0 44.8C595.2 672 582.4 672 576 672z"
						p-id="2831" fill="#525B72"></path>
				</svg>
			</a>
			<!-- <a class="menu-link is-active" href="javascript:;" @click="router.go(1)">
				<svg t="1648618362955" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					p-id="2626" width="32" height="32">
					<path
						d="M448 672c-6.4 0-19.2 0-25.6-6.4-12.8-12.8-12.8-32 0-44.8L531.2 512 422.4 409.6c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0l128 128c12.8 12.8 12.8 32 0 44.8l-128 128C467.2 672 454.4 672 448 672z"
						p-id="2627" fill="#525B72"></path>
				</svg>
			</a> -->
		</div>

		<div class="search-bar">
			<input type="text" placeholder="Index" @keyup.enter='toResult' v-model='kw'>
		</div>
		<div class="about">
			<a href="https://github.com/XiangZi7/KM-Music-Player/" target="_blank">github</a>
			<a href="https://github.com/XiangZi7/" target="_blank">about</a>
		</div>
		<!-- <Navigation /> -->
		<div class="header-profile" v-if="!currentUserstatus">
			<div class="username"> <a href="javascript:;" @click="login">登录</a> </div>
			<div class="card" v-show="loginPopup">
				<div class="tools">
					<div class="circle">
						<span @click="loginPopup = false" class="red box"></span>
					</div>
					<div class="circle">
						<span class="yellow box"></span>
					</div>
					<div class="circle">
						<span class="green box"></span>
					</div>
				</div>
				<div class="card__content">
					<el-tabs v-model="activeName" class="login-tabs" @tab-click="handleClick">
						<el-tab-pane label="二维码登录" name="first">
							<div class="demo-login">
								<img :src="qrimg" alt="">
							</div>
							<div>
								<el-button @click="verify" type="primary" style="width: 100%; margin-top: 20px;"
									round>验证</el-button>
							</div>
						</el-tab-pane>
						<el-tab-pane label="Cookie登录" name="second">
							<div class="demo-login">
								<el-input type="textarea" style="width: 300px;" v-model="phone" class="demo-text"
									placeholder="请输入Cookie" />
								<div class="input-text">
									<el-button @click="submit" type="primary" style="width: 100%; margin-top: 20px;" round>
										确定</el-button>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
		<!-- 已登陆 -->
		<div class="header-profile" v-else>
			<el-dropdown>
				<img class="profile-img" :src="globalstore.userInfo.avatarUrl" alt="">
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="userlogout">注销</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<div class="username">{{ globalstore.userInfo.nickname }}</div>
			<div class="notification">
				<span class="notification-number">3</span>
				<svg t="1648737299278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					p-id="8950" width="25" height="25">
					<path
						d="M192.032 631.402667V404.725333C192.032 228.330667 335.285333 85.333333 512 85.333333s319.968 142.997333 319.968 319.392v226.677334l60.608 121.013333c10.645333 21.237333-4.832 46.218667-28.618667 46.218667H160.042667c-23.786667 0-39.253333-24.981333-28.618667-46.218667l60.608-121.013333z m620.16 103.36l-40.842667-81.536a31.893333 31.893333 0 0 1-3.381333-14.282667V404.725333c0-141.12-114.602667-255.509333-255.968-255.509333S256.032 263.605333 256.032 404.725333V638.933333c0 4.96-1.162667 9.845333-3.381333 14.293334l-40.842667 81.525333h600.384z m-443.306667 152.32a31.893333 31.893333 0 0 1-4.149333-44.981334 32.032 32.032 0 0 1 45.056-4.138666A159.36 159.36 0 0 0 512 874.773333a159.36 159.36 0 0 0 102.186667-36.8 32.032 32.032 0 0 1 45.056 4.138667 31.893333 31.893333 0 0 1-4.16 44.981333A223.402667 223.402667 0 0 1 512 938.666667c-52.981333 0-103.2-18.453333-143.114667-51.594667z"
						p-id="8951" fill="#525B72"></path>
				</svg>
			</div>
		</div>
		<!-- 已登陆 -->
	</div>
</template>
<style lang='scss' scoped>
.card {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 550px;
	height: 500px;
	transform: translate(-50%) translatey(-50%);
	background-color: #fff;
	border-radius: 30px;
	box-shadow: 0 5px 16px #0000001a;
	z-index: 3;
	background-image: url('../static/img/login.png');
	background-size: 150px;
	background-repeat: no-repeat;
	background-position: bottom left;

	.circle {
		padding: 0 4px;
	}

	.box {
		display: inline-block;
		align-items: center;
		width: 10px;
		height: 10px;
		padding: 1px;
		border-radius: 50%;
	}

	.red {
		background-color: #ff605c;
		width: 15px;
		height: 15px;
	}

	.yellow {
		background-color: #ffbd44;
		width: 15px;
		height: 15px;
	}

	.green {
		background-color: #00ca4e;
		width: 15px;
		height: 15px;
	}

	.tools {
		display: flex;
		align-items: center;
		padding: 15px 20px;
		border-bottom: 1px solid var(--border-color);
	}

	.card__content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
