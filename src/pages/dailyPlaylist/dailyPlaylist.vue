<script setup>
import { recommendSongs } from "@/api/api";
const paging = ref();
const state = reactive({
  list: [],
  tableData: [],
  songresource: [],
});
const { list, kw, animationList, tableData } = toRefs(state);

function onGetAllData(pageNo, pageSize) {
  recommendSongs().then(({ data }) => {
    state.tableData = data.data.dailySongs.map((item) => {
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
  });
}

function onRouter(id) {
  uni.navigateTo({
    url: `/pages/animation/animedeta?id=${id}`,
  });
}
function gtback() {
  uni.navigateBack();
}
</script>
<template>
  <div class="page-container">
    <z-paging ref="paging" v-model="animationList" @query="onGetAllData">
      <template #top>
        <grid-head bg="10">
          <tn-search-box
            placeholder-icon="search"
            :search-button="false"
            shape="round"
            :border="false"
            placeholder="Search..."
            class="search-input"
          />
        </grid-head>
      </template>

      <div class="mv-list">
        <yxcr-table :data="tableData"></yxcr-table>
        <!-- <div
          class="mv-item"
          v-for="item in animationList"
          :key="item.videoId"
          @click="onRouter(item.videoId)"
        >
          <img
            class="mv-cover tn-shadow-blur"
            :src="item.cover"
            alt="MVCover"
          />
          <div class="mv-info">
            <div class="mv-title">{{ item.title }}</div>
            <div class="mv-subtitle">{{ item.videoType }}</div>
          </div>
        </div> -->
      </div>
    </z-paging>
  </div>
</template>
<style lang="scss" scoped>
@import "./index.scss";
</style>
