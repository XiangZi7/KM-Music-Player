<script setup>
import { GlobalStore } from "@/stores/index";
import { PlayerStore } from "@/stores/modules/player";
import { songUrl, cloudsearch } from "@/api/api";
const playerstore = PlayerStore();
const globalstore = GlobalStore();
const state = reactive({
  list: [],
  kw: "",
  currentTabIndex: 0,
  songData: [],
  songList: [],
  albumList: [],
  mvList: [],
});
const { list, kw, currentTabIndex, songData, songList, albumList, mvList } =
  toRefs(state);
const tabsData = [
  {
    text: "歌曲",
    type: 1,
  },
  {
    text: "歌单",
    type: 1000,
  },
  {
    text: "专辑",
    type: 10,
  },
  {
    text: "MV",
    type: 1006,
  },
];
function tabsChange(idx) {
  confirm(state.kw, tabsData[idx].type);
}
async function confirm(kw, type = 1) {
  // 存入输入的内容
  globalstore.setHistorcontent(state.kw);
  // 加载歌曲
  cloudsearch({ keywords: state.kw, type }).then(({ data }) => {
    switch (type) {
      case 1:
        state.songData = data.result.songs.map((item) => {
          const names = item.ar.map((subItem) => subItem.name).join(",");
          return {
            cover: item.al.picUrl,
            title: item.name,
            singer: names,
            album: item.al.name,
            time: item.dt,
            id: item.id,
            mv: item.mv,
          };
        });
        break;
      case 1000:
        state.songList = data.result.playlists;
        break;
      case 10:
        state.albumList = data.result.albums;
        break;
      case 1006:
        state.mvList = data.result.songs;
        break;

      default:
        break;
    }
  });
}
async function playerMusic(params) {
  const isExisting = playerstore.songs.findIndex(
    (item) => item.id == params.id
  );
  if (isExisting != -1) {
    playerstore.currentIndex = isExisting;
  } else {
    // 1.获取歌曲链接
    songUrl(params).then(({ data }) => {
      playerstore.songs.push({
        title: params.title,
        singer: params.singer,
        cover: params.cover,
        src: data.data[0].url,
        time: params.time,
        album: params.album,
        id: params.id,
        mv: params.mv,
      });
      playerstore.player.src =
        playerstore.songs[playerstore.songs.length - 1].src;
      playerstore.currentIndex = playerstore.songs.length - 1;
      nextTick(() => {
        playerstore.player.play();
      });
    });
  }
}

function navigate(params) {
  uni.switchTab({
    url: "/pages/" + params,
  });
}

function taphisto(params) {
  state.kw = params;
  confirm();
}
</script>
<template>
  <div class="page-container">
    <div class="container">
      <div class="header">
        <tn-input
          height="60"
          @confirm="confirm"
          clearable
          custom-class="ipt tn-shadow-md"
          v-model="kw"
          type="text"
          placeholder="请输入歌曲"
        >
          <template #prefix>
            <tn-icon name="search" size="40" class="des" />
          </template>
        </tn-input>
        <div class="tn-ml-xs">
          <tn-button type="primary" size="lg" @click="navigate('index/index')"
            >取消</tn-button
          >
        </div>
      </div>
      <!-- 最近搜索 -->
      <div class="Recentsearch">
        <div class="tn-pt-sm tn-pb-sm">
          <text>最近搜索</text>
        </div>
        <div class="rtsearch tn-shadow">
          <tn-tag
            v-for="(item, index) in globalstore.historcontent"
            @click="taphisto(item)"
            :key="index"
            bg-color="#E6F3F9"
            text-color="#000"
            shape="round"
            class="yxbr-10 tn-mr-sm tn-mb-sm tn-shadow-md"
            >{{ item }}</tn-tag
          >
        </div>
      </div>
      <!-- 搜索结果 -->
      <div class="searchResult tn-pt-sm tn-pb-sm" v-show="kw">
        <tn-tabs
          @change="tabsChange"
          bg-color=""
          v-model="currentTabIndex"
          class="yxbr-10"
        >
          <tn-tabs-item
            v-for="(item, index) in tabsData"
            :key="index"
            :title="item.text"
          />
        </tn-tabs>
        <!-- 歌曲 -->
        <yxcr-table :data="songData" v-show="currentTabIndex == 0"></yxcr-table>
        <!-- 歌单 -->
        <div class="List tn-mt-xs" v-show="currentTabIndex == 1">
          <div
            class="ListItem tn-mb-sm"
            v-for="item in songList"
            :key="item.id"
            @click="playerMusic(item)"
          >
            <div class="songcover">
              <tn-avatar
                shape="square"
                :url="item.coverImgUrl + '?param=60y60'"
              />
            </div>
            <div class="title tn-mr-xs tn-ml-xs">
              <text class="tn-text-lg">{{ item.name }}</text>
              <text class="tn-text-xs des tn-text-ellipsis-1">{{
                item.description
              }}</text>
            </div>
            <div>
              <tn-icon name="video" size="40" class="des tn-mr-xs" />
              <tn-icon name="more-horizontal" size="40" class="des" />
            </div>
          </div>
        </div>
        <div class="List tn-mt-xs" v-show="currentTabIndex == 2">
          <div
            class="ListItem tn-mb-sm"
            v-for="item in albumList"
            :key="item.id"
            @click="playerMusic(item)"
          >
            <div class="songcover">
              <tn-avatar
                shape="square"
                :url="item.blurPicUrl + '?param=60y60'"
              />
            </div>
            <div class="title tn-mr-xs tn-ml-xs">
              <text class="tn-text-lg">{{ item.name }}</text>
              <text class="tn-text-xs des tn-text-ellipsis-1">{{
                item.type
              }}</text>
            </div>
            <div>
              <tn-icon name="video" size="40" class="des tn-mr-xs" />
              <tn-icon name="more-horizontal" size="40" class="des" />
            </div>
          </div>
        </div>
        <div class="List tn-mt-xs" v-show="currentTabIndex == 3">
          <div
            class="ListItem tn-mb-sm"
            v-for="item in mvList"
            :key="item.id"
            @click="playerMusic(item)"
          >
            <div class="songcover">
              <tn-avatar
                shape="square"
                :url="item.al.picUrl + '?param=60y60'"
              />
            </div>
            <div class="title tn-mr-xs tn-ml-xs">
              <text class="tn-text-lg">{{ item.name }}</text>
              <text class="tn-text-xs des tn-text-ellipsis-1">{{
                item.ar.map((item) => item.name).join()
              }}</text>
            </div>
            <div>
              <tn-icon name="video" size="40" class="des tn-mr-xs" />
              <tn-icon name="more-horizontal" size="40" class="des" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "./index.scss";
</style>
