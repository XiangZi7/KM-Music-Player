<script setup>
import HeaderBar from "@/components/headerBar.vue";
import MenuBar from "@/components/MenuBar.vue";
import Player from "@/components/Player.vue";
</script>
<template>
	<div class="app">
		<!-- //////////////////// -->
		<!-- ////  HeaderBar  ///// -->
		<!-- //////////////////// -->
		<HeaderBar />
		<div class="wrapper">
			<!-- //////////////////// -->
			<!-- ////  MenuBar  ///// -->
			<!-- //////////////////// -->
			<MenuBar />
			<div class="main-container">
				<div class="content-wrapper">
					<!-- //////////////////// -->
					<!-- ////  AppMain  ///// -->
					<!-- //////////////////// -->
					<router-view v-slot="{ Component }">
						<transition name="el-fade-in-linear">
							<keep-alive>
								<component :is="Component" />
							</keep-alive>
						</transition>
					</router-view>
				</div>
				<player />
			</div>
		</div>
		<div class="overlay-app"></div>
	</div>
</template>

<style></style>
