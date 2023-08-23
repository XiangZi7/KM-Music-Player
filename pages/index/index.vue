<script setup>
import { reactive, toRefs } from "vue";
import { banner, newMusic, songPlaylist } from "@/api/api";
import { btnList } from "./btnlist";
const state = reactive({
  list: [],
  currentSwiperIndex: 0,
  // 轮播图数据
  bannerList: [],
  // 流行音乐
  popMusic: [],
  // 歌单
  songList: []
})
const {
  list,
  currentSwiperIndex,
  bannerList,
  popMusic,
  songList
} = toRefs(state)

onMounted(async () => {
  try {
    const [bannerResult, newMusicResult, songListResult] = await Promise.all([
      banner(),
      newMusic(),
      songPlaylist({ limit: 30, offset: 0 })
    ]);
    state.bannerList = bannerResult.data.banners;

    state.popMusic = newMusicResult.data.result.map(item => {
      const names = item.song.artists.map(subItem => subItem.name).join(',');
      return {
        cover: item.picUrl,
        title: item.name,
        singer: names,
        album: item.song.album.name,
        time: item.song.duration,
        id: item.id,
        mv: item.song.mvid
      };
    });

    state.songList = songListResult.data.playlists;
  } catch (error) {
    console.error("Failed to load data:", error);
  }
})
function navigate(params, value) {
  if (!params) {
    uni.showToast({
      title: "空跳转",
      icon: "none"
    })
  }
  uni.navigateTo({
    url: "/pages/" + params + (value ? "?id=" + value : "")
  });
}
</script>
<template>
  <div class="app page-container">
    <div class="app__bar">
      <div class="app__bar__toolbar">
        <div class="app__bar__content">
          <div class="app__border">
            <div class="tn-flex-center" style="height: 35px;">
              <tn-icon name="search" size="40" @click="navigate('search/index')" />
            </div>
          </div>
          <text class="tn-text-lg">Home</text>
          <div class="app__border">
            <tn-avatar size="100%" url="https://resource.tuniaokj.com/images/avatar/test_avatar.jpg" />
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="swiper-item">
        <div class="swiper-wrapper tn-shadow-md">
          <tn-swiper autoplay v-model="currentSwiperIndex" indicator indicator-type="dot" :data="bannerList" width="100%"
            height="300">
            <template #default="{ data }">
              <view class="swiper-data">
                <image class="image" :src="data.pic" mode="aspectFill" />
              </view>
            </template>
          </tn-swiper>
        </div>
      </div>


      <div class="btn-icon">
        <div class="grid tn-flex-row tn-p tn-shadow-md yxbr-10">
          <div class="btn-icon-item tn-flex-column" v-for="item in btnList" :key="item.id" @click="navigate(item.url)">
            <tn-icon type="primary" :name="item.icon" size="35" />
            <text class="tn-mt-xs">
              {{ item.title }}
            </text>
          </div>
        </div>
      </div>

      <div class="songlist">
        <text class="tn-text-lg songlist-title">歌单</text>
        <div class="songbox">
          <div class="songlist-item" v-for="item in songList" :key="item.id">
            <div class="avatar">
              <div class="overlay">
                <div class="box" @click="navigate('playListDetail/index', item.id)">
                  <div class="tn-flex tn-flex-column">
                    <text class="list-title tn-text-xs tn-text-ellipsis-2">{{ item.name }}</text>
                    <div class="tn-flex des">
                      <tn-icon name="music-fill" size="30" />
                      <text class="tn-ml-xs"> {{ item.trackCount }} 首</text>
                    </div>
                  </div>
                  <tn-icon name="video-fill" color="#fff" size="45" />
                </div>
              </div>
              <tn-avatar @click="navigate('playListDetail/index', item.id)" class="tn-shadow-md" shape="square" size="300"
                :url="item.coverImgUrl + '?param=300y300'" />
            </div>
          </div>
        </div>
      </div>

      <div class="popular">
        <text class="tn-text-lg popular-title">流行音乐</text>
        <yxcr-table :data="popMusic"></yxcr-table>
      </div>

    </div>
    <yxcr-nav></yxcr-nav>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";

// .aq {
//   padding-top: var(--status-bar-height); //给组件加个上边距
// }
</style>