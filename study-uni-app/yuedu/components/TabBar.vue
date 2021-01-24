<template>
	<view class="tab-bar__scroll">
		<view class="left">
			<scroll-view class="scroll-view_H" scroll-x="true" :scroll-with-animation="true" scroll-left="0">
				<view 
					class="scroll-view-item_H" :class="{ active: activeIndex === index }" 
					v-for="(item, index) in value" :key="index"
					@click="onItemClick(index, item)"
				>{{ item.name }}</view>
			</scroll-view>
		</view>
		<view class="right">
			<i class="iconfont icon-setting" style="font-size: 40rpx;" @click="onLabelMagClick" />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				activeIndex: 0
			}
		},
		methods: {
			// 事件 - 条目栏点击 
			onItemClick (index, item) {
				this.activeIndex = index
				this.$emit('itemClick', item)
			},
      // 事件 - 标签管理页跳转
      onLabelMagClick () {
        this.$u.route({
          type: 'navigateTo',
          url: '/pages/label-manager/label-manager'
        })        
      }
		},
	}
</script>

<style lang="scss">
	.tab-bar__scroll {
		width: 100%;
		display: flex;
		align-items: center;
		background-color: $uni-bg-color-grey;
		border-bottom: 1px solid #f5f5f5;
		.left {
      flex: 1;
			white-space: nowrap;
			overflow-x: auto;
			.scroll-view_H {
				.scroll-view-item_H {
					font-size: 30rpx;
					display: inline-block;
					padding: 20rpx 20rpx;
				}			
			}			
		}
		.right {
			width: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-left: 1px solid #c8c7cc;
		}
	}
	
	.active {
		color: $app-color-base;
		font-size: 36rpx !important;
		display: inline-flex !important;
		flex-flow: column;
		&:after {
			content: '';
			display: inline-block;
			width: 100%;
			height: 4rpx;
			margin-top: 8rpx;
			background-color: $app-color-base;
		}
	}
</style>
