<template>
	<view class="list-item__container">
		<image class="thumb-pic" :src="getThumbPic" lazy-load></image>
		<view>
			<text class="title">{{ value.title }}</text>
			<view class="bottom">
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
		flex-flow: column;	
		padding: 30rpx;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		margin: 20rpx;
		
		> image {
			width: 100%;
			height: 250rpx;
		}
		
		> view {
			display: flex;
			flex: 1;
			margin-left: 30rpx;
			flex-flow: column;
			.title {
				margin-top: 20rpx;
				color: #000000;
				font-size: $uni-font-size-base;
			}
			
			.sub-title {
				color: $uni-text-color;
				font-size: $uni-font-size-base;		
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;						
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
	}
</style>
