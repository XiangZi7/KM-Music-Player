<script setup>
import { logout, userPlaylist } from "@/api/api";
const state = reactive({
  userinfo: uni.getStorageSync("userinfo"),
  playlist: [],
});
const { userinfo, playlist } = toRefs(state);
onShow(() => {
  state.userinfo = uni.getStorageSync("userinfo");
  if (state.userinfo) {
    userPlaylist(state.userinfo.profile.userId).then(({ data }) => {
      state.playlist = data.playlist;
    });
  }
});

function routerLK(params) {
  uni.navigateTo({
    url: "/pages/login/index",
  });
}

function handLogout(params) {
  uni.showModal({
    content: "确定退出登录吗？",
    success: function (res) {
      if (res.confirm) {
        logout();
        uni.setStorageSync("userinfo", { test: 1 });
      }
    },
  });
}

function toRouter(params, value) {
  uni.navigateTo({
    url: "/pages/" + params + (value ? "?id=" + value : ""),
  });
}
</script>
<template>
  <div class="page-container">
    <div class="app">
      <div class="card bg tn-shadow-blur">
        <div class="header">
          <div class="header-button" @click="routerLK">
            <tn-icon name="install" size="40" />
          </div>
        </div>
        <div class="content">
          <yxcr-show-img
            defImg="2"
            class="avatar"
            :src="userinfo.profile?.avatarUrl + '?param=120y120'"
          ></yxcr-show-img>
          <p class="username">{{ userinfo.profile?.nickname || "" }}</p>
        </div>
      </div>

      <div class="card">
        <div class="grid-container">
          <div class="grid-item">
            <tn-icon name="video" size="50" />
            <p class="grid-label">最近播放</p>
          </div>
          <div class="grid-item">
            <tn-icon name="download" size="50" />
            <p class="grid-label">本地下载</p>
          </div>
          <div class="grid-item">
            <tn-icon name="upload" size="50" />
            <p class="grid-label">云盘</p>
          </div>
          <div class="grid-item">
            <tn-icon name="like" size="50" />
            <p class="grid-label">收藏</p>
          </div>
        </div>
      </div>

      <div class="card" v-if="playlist.length">
        <p class="section-title">我的歌单</p>
        <div class="song-list">
          <div
            class="song-item"
            v-for="song in playlist"
            :key="song.id"
            @click="toRouter('playListDetail/index', song.id)"
          >
            <img
              class="song-cover"
              :src="song.coverImgUrl + '?param=50y50'"
              alt="封面"
            />
            <div class="song-info">
              <p class="song-title">{{ song.name }}</p>
              <p class="song-artist">{{ song.trackCount }} 首</p>
            </div>
            <tn-icon name="more-vertical" color="#838383" size="35" />
          </div>
        </div>
      </div>
      <div class="logout" v-if="userinfo">
        <button class="tn-shadow" @click="handLogout">退出登录</button>
      </div>
    </div>
    <yxcr-nav></yxcr-nav>
  </div>
</template>
<style lang="scss" scoped>
@import "./index.scss";
</style>
