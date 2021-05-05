/* 首页导航栏 */
<template>
	<view class="nav-bar-container">
		<view class="nav-bar-inner-container">
      <!-- 状态栏 -->
			<view :style="{ height: statusBarHeight + 'rpx' }"></view>
      <!-- 搜索栏 -->
      <view class="search-wrapper flex-row-center">
				<icon class="search-icon" type="search" size="16"/>
				<input 
					type="text"
					placeholder="搜索"
					class="search-input" 
					v-model="searchValue" 
					:style="{ 'margin-right': (menuButtonBoundWidth + 40) + 'rpx' }"
					@click="onClick" 
				/>
			</view>					
		</view>
    <!-- 填充栏, 让绝对定位坍塌的父元素撑开占据位置 -->
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
			/*
        note: 获取状态栏高度, h5是没有statusBarHeight, 主要是将微信小程序
              的状态栏高度填充防止搜索栏覆盖状态栏, 支付宝小程序的胶囊按钮在
              搜索栏上方没有必要填充状态栏高度
      */
			// #ifdef APP-PLUS || MP-WEIXIN
			const systemInfo = uni.getSystemInfoSync()
			this.statusBarHeight = systemInfo.statusBarHeight * 2
			// #endif     
			
      // 获取胶囊菜单程序按钮, 兼容胶囊按钮位置
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			const menuButtonBoundInfo = uni.getMenuButtonBoundingClientRect()
			this.menuButtonBoundWidth = menuButtonBoundInfo.width * 2
			// #endif
		},
		methods: {
			// 事件 - 搜索框点击
			onClick () {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
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
