/* 仿Twitter点赞收藏组件 */
<template>
	<view class="heart" :class="{ active: innerValue }" :style="{ transform: `scale(${scale})` }" @click="onClick"></view>
</template>

<script>
	const strategy = {
		true: 'like',
		false: 'unlike'
	}
	
	export default {
		name: 'Like',
		props: {
			scale: {
				type: Number,
				default: 0.8
			},
			value: {
				type: Boolean,
				default: false				
			}
		},
		data () {
			return {
				innerValue: false
			}
		},
		watch: {
			value: {
				handler (val) {
					this.innerValue = this.value
				}
			}	
		},
		methods: {
			// 事件 - 点击
			onClick () {
				this.innerValue = !this.innerValue
				this.$emit('change', strategy[this.innerValue])
			}
		}
	}
</script>

<style lang="scss">
	.heart {
		width: 120rpx;
		height: 120rpx;
		background: url("https://cssanimation.rocks/images/posts/steps/heart.png") no-repeat;
		background-position: 0 0;
		background-size: 3200%;
		cursor: pointer;
		-webkit-transition: background-position 1s steps(28);
		transition: background-position 1s steps(28);
		-webkit-transition-duration: 0s;
		transition-duration: 0s;
		&.active {
			-webkit-transition-duration: 1s;
			transition-duration: 1s;
			background-position: -1855px 0;
		}
	}
</style>
