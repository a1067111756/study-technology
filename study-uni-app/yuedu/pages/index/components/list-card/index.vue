<template>
	<view class="list-card__container">
		<scroll-view class="scroll-Y" :scroll-top="0" scroll-y="true">
			<slot></slot>
		</scroll-view>		
	</view>
</template>

<script>
</script>

<style lang="scss">
	.list-card__container {
		height: 100%;
		.scroll-Y {
			height: 100%;
		}
	}
</style>
