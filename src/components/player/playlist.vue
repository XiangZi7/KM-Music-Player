<script setup>
import { PlayerStore } from "@/stores/modules/player";
const playerstore = PlayerStore();
const popup = ref();
const state = reactive({
  list: [],
  showPopup: false,
});
const { list, showPopup } = toRefs(state);
function showPlayList(params) {
  popup.value.open();
}

function playMusic(idx) {
  playerstore.currentIndex = idx;
}
</script>
<template>
  <div class="des" @click="showPlayList">
    <tn-icon size="45" name="align" />
  </div>
  <uni-popup ref="popup" type="bottom">
    <div class="main">
      <div
        v-for="(item, index) in playerstore.songs"
        :key="item.id"
        @click="playMusic(index)"
      >
        <div
          class="loader"
          :class="{ active: index == playerstore.currentIndex }"
        >
          <div v-if="index == playerstore.currentIndex" class="loading">
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
          </div>
          <div v-else class="play"></div>
          <yxcr-show-img
            class="albumcover"
            :src="item.cover + '?param=75y75'"
          ></yxcr-show-img>
          <div class="song">
            <p class="name">{{ item.title }}</p>
            <p class="artist">{{ item.singer }}</p>
          </div>
        </div>
      </div>
    </div>
  </uni-popup>
</template>
<style lang="scss" scoped>
.main {
  background-color: white;
  padding: 1em;
  padding-bottom: 1.1em;
  //   border-radius: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  //   margin: 1em;
}

.loader {
  display: flex;
  flex-direction: row;
  height: 4em;
  padding-left: 1em;
  padding-right: 1em;
  //   transform: rotate(180deg);
  //   justify-content: right;
  border-radius: 10px;
  transition: 0.4s ease-in-out;
}

.loader:hover {
  cursor: pointer;
  background-color: lightgray;
}
.active {
  background-color: lightgray;
}
.currentplaying {
  display: flex;
  margin: 1em;
}

.spotify {
  width: 50px;
  height: 50px;
  margin-right: 0.6em;
}

.heading {
  color: black;
  font-size: 1.1em;
  font-weight: bold;
  align-self: center;
}

.loading {
  display: flex;
  margin-bottom: 1em;
  margin-right: 0.3em;
  transform: rotate(180deg);
}

.load {
  width: 2px;
  height: 33px;
  background-color: limegreen;
  animation: 1s move6 infinite;
  border-radius: 5px;
  margin: 0.1em;
}

.load:nth-child(1) {
  animation-delay: 0.2s;
}

.load:nth-child(2) {
  animation-delay: 0.4s;
}

.load:nth-child(3) {
  animation-delay: 0.6s;
}

.play {
  position: relative;
  right: 0.5em;
  height: 1.6em;
  width: 1.6em;
  clip-path: polygon(50% 50%, 100% 50%, 75% 6.6%);
  background-color: black;
  transform: rotate(90deg);
  align-self: center;
  margin-bottom: 0.7em;
  justify-self: center;
}

.albumcover {
  position: relative;
  margin-right: 1em;
  height: 40px;
  width: 40px;
  background-color: rgb(233, 232, 232);
  align-self: center;
  border-radius: 5px;
  //   transform: rotate(-180deg);
}

.song {
  position: relative;
  //   transform: rotate(180deg);
  margin-right: 1em;
  color: black;
  align-self: center;
}

.artist {
  font-size: 0.6em;
}

@keyframes move6 {
  0% {
    height: 0.2em;
  }

  25% {
    height: 0.7em;
  }

  50% {
    height: 1.5em;
  }

  100% {
    height: 0.2em;
  }
}

.des {
  font-size: var(--font-size-sm);
  color: var(--text-color-placeholder);
}

</style>
