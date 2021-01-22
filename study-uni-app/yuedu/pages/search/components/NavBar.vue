/* 搜索导航栏 */
<template>
	<view class="nav-bar-container">
		<view class="nav-bar-inner-container">
			<!-- status状态栏 -->
			<view :style="{ height: statusBarHeight + 'rpx' }"></view>
			
			<!-- 搜索框 -->
			<view class="search-wrapper flex-row-center">
				<i class="iconfont icon-sousuo" />
				<i class="iconfont icon-fanhui" @click="onBack" />
				<input 
					type="text"
					placeholder="搜索"
					class="search-input" 
					v-model="searchValue" 
					:style="{ 'margin-right': (menuButtonBoundWidth + 40) + 'rpx' }"
					@confirm="onEnter"
				/>
				<i v-if="searchValue" class="iconfont icon-clear" @click="onClear" />
			</view>					
		</view>
		
		<!-- 占位 -->
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
		},
		methods: {
			// 事件 - 搜索框点击
			onBack () {
				uni.navigateBack()
			},
			// 事件 - 清除输入框
			onClear () {
				this.searchValue = ''
			},
			// 事件 - 回车事件
			onEnter () {
				this.$emit('confirm', this.searchValue.trim())
				this.onClear()
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
		
		.icon-fanhui {
			color: #ffffff; 
			margin-left: 40rpx;
			margin-right: 20rpx;
		}
		
		.icon-clear {
			position: absolute;
			right: 70rpx;
			top: 26rpx;
		}	
		
		.icon-sousuo {
			position: absolute;
			left: 120rpx;
			top: 26rpx;
		}			
		
		.search-input {
			height: 60rpx;
			width: 100%;
			margin-right: 40rpx;
			font-size: $uni-font-size-sm;
			color: $uni-text-color;
			padding: 0 80rpx;
			border-radius: 40rpx;
			background-color: $uni-bg-color;
		}
	}
</style>
