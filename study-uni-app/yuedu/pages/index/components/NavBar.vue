/* 首页导航栏 */
<template>
	<view class="nav-bar-container">
		<view class="nav-bar-inner-container">
			<view :style="{ height: statusBarHeight + 'rpx' }"></view>
			<view class="search-wrapper flex-row-center">
				<icon class="search-icon" type="search" size="16"/>
				<input class="search-input" type="text" v-model="searchValue" placeholder="搜索" :style="{ 'margin-right': (menuButtonBoundWidth + 40) + 'rpx' }" />
			</view>					
		</view>
		<view :style="{ height: (90 + statusBarHeight) + 'rpx' }"></view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				searchValue: undefined,
				statusBarHeight: 0,
				menuButtonBoundWidth: 0
			}
		},
		created () {
			// 获取状态栏高度
			const systemInfo = uni.getSystemInfoSync()
			this.statusBarHeight = systemInfo.statusBarHeight * 2
			
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊菜单程序按钮
			const menuButtonBoundInfo = uni.getMenuButtonBoundingClientRect()
			this.menuButtonBoundWidth = menuButtonBoundInfo.width * 2
			// #endif
		}
	}
</script>

<style lang="scss">
	$search-height: 90rpx;
	
	.nav-bar-inner-container {
		top: 0;
		width: 100%;
		z-index: 100;
		position: fixed;
		background-color: $app-color-base;
		
		.search-wrapper {
			width: 100%;
			height: $search-height;
			position: relative;
		}	
		
		.search-icon {
			position: absolute;
			left: 70rpx;
			top: 30rpx;
		}	
		
		.search-input {
			height: 60rpx;
			width: 100%;
			margin: 0 40rpx;
			font-size: $uni-font-size-sm;
			color: $uni-text-color;
			padding: 0 80rpx;
			border-radius: 40rpx;
			background-color: $uni-bg-color;
		}
	}
</style>
