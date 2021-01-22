<template>
	<view class="list-item__container">
		<Like class="like" :value="like" @change="type => $emit('likeChange', type, value.id)"></like>
		<image class="thumb-pic" :src="getThumbPic" lazy-load></image>
		<view class="right">
			<text class="title">{{ value.title }}</text>

			<view class="right-bottom">
				<text class="label">{{ value.classify }}</text>
				<text class="view">{{ value.browse_count }}浏览</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: Object,
				default: () => {}
			},
			like: {
				type: Boolean,
				default: false		
			}
		},
		computed: {
			getThumbPic () {
				return (this.value.cover && this.value.cover[0]) || 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-y8scmupgmahza1384f/a34777d0-536e-11eb-97b7-0dc4655d6e68.png'
			}
		}
	}
</script>

<style lang="scss">
	.list-item__container {
		display: flex;
		padding: 30rpx;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		margin: 20rpx;
		position: relative;
		
		.like {
			position: absolute;
			top: -14rpx;
			right: -14rpx;
		}
		
		.thumb-pic {
			width: 140rpx;
			height: 140rpx;
			border-radius: 10rpx;
			margin-right: 30rpx;
		}
		
		.right {
			flex: 1;
			display: flex;
			flex-flow: column;
			justify-content: space-between;
			width: 300rpx;
			
			.title {
				color: #000000;
				padding-right: 40px;
				font-size: $uni-font-size-base;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			
			.right-bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 10rpx;
				.label {
					text-align: center;
					min-width: 60rpx;
					color: $uni-text-color;
					font-size: 20rpx;
					padding: 10rpx 15rpx;
					border-radius: 30rpx;
					border: 1px solid $app-color-base;
				}
				
				.view {
					color: $uni-text-color;
					font-size: 20rpx;					
				}
			}
		}
	}
</style>
