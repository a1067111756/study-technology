<template>
	<view class="list-item__container">
		<Like class="like" :value="like" @change="type => $emit('likeChange', type, value.id)"></like>
		<view class="top">
			<text class="title">{{ value.title }}</text>
		</view>
		
		<view class="middle">
			<image v-for="(item, index) in getThumbPic" :key="index" :src="item"></image>
		</view>
		
		<view class="bottom">
			<text class="label">{{ value.classify }}</text>
			<text class="view">{{ value.browse_count }}浏览</text>
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
					return (this.value.cover && this.value.cover.slice(0, 3)) || 
						[
							'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-y8scmupgmahza1384f/a34777d0-536e-11eb-97b7-0dc4655d6e68.png',
							'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-y8scmupgmahza1384f/a34777d0-536e-11eb-97b7-0dc4655d6e68.png',
							'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-y8scmupgmahza1384f/a34777d0-536e-11eb-97b7-0dc4655d6e68.png'
						]
				}
			},
	}
</script>

<style lang="scss">
	.list-item__container {
		display: flex;
		flex-flow: column;	
		padding: 30rpx;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		margin: 20rpx;
		position: relative;
		
		.like {
			position: absolute;
			top: 8rpx;
			right: -14rpx;
		}		
		
		.top {
			display: flex;
			flex-flow: column;
			align-items: flex-start;
			justify-content: flex-start;
			.title {
				margin-top: 20rpx;
				padding-right: 40rpx;
				color: #000000;
				font-size: $uni-font-size-base;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;				
			}
			
			.sub-title {
				color: $uni-text-color;
				font-size: $uni-font-size-base;		
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;						
			}			
		}
		
		.middle {
			margin-top: 20rpx;
			display: flex;
			align-items: center;			
			justify-content: space-around;
			
			> image {
				width: 160rpx;
				height: 160rpx;
			}		
		}
		
		.bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 30rpx;
			.label {
				color: $uni-text-color;
				font-size: $uni-font-size-sm;						
			}
			
			.view {
				color: $uni-text-color;
				font-size: $uni-font-size-sm;					
			}
		}
	}
</style>
