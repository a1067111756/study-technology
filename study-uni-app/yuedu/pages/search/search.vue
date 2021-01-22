<template>
	<view class="page-search__container">
		<!-- 搜索栏 -->
		<NavBar @confirm="onConfirm"></NavBar>
		
		<!-- 搜索结果 -->
		<view v-if="searchPageFlag" class="result">
			<ListCard>
				<view v-for="(item, index) in articalList" :key="index">
					<ListItem1 v-if="item.mode === 'base'" :value="item" :like="articalLikeList.includes(item.id)" @likeChange="onLikeChange"></ListItem1>
					<ListItem2 v-else-if="item.mode === 'image'" :value="item" :like="articalLikeList.includes(item.id)" @likeChange="onLikeChange"></ListItem2>
					<ListItem3 v-else-if="item.mode === 'column'" :value="item" :like="articalLikeList.includes(item.id)" @likeChange="onLikeChange"></ListItem3>
				</view>
			</ListCard>			
		</view>
		
		<!-- 搜索历史记录 -->
		<view v-else class="history">
			<!-- 清空操作 -->
			<view class="clear">
				<text>搜索历史</text>
				<text @click="onClearHistory">清空</text>
			</view>
			
			<!-- 搜索标签 -->
			<view v-if="tagsList.length > 0" class="search-tag__wrapper">
				<text class="tag" v-for="(tag, index) in tagsList" :key="index">{{ tag }}</text>
			</view>
			
			<!-- 空标签 -->
			<view v-else class="search-tag__empty">
				<text>^_^ 无搜索历史标签</text>
			</view>			
		</view>		
	</view>
</template>

<script>
	import NavBar from './components/NavBar.vue'
	import ListCard from '../index/components/list-card/index.vue'
	import ListItem1 from '../index/components/list-card/ListItem1'
	import ListItem2 from '../index/components/list-card/ListItem2'
	import ListItem3 from '../index/components/list-card/ListItem3'	
	
	export default {
		components: {
			NavBar,
			ListCard,
			ListItem1,
			ListItem2,
			ListItem3
		},
		data () {
			return {
				searchPageFlag: false,
				articalList: [],
				articalType: '全部',
				articalLikeList: []			
			}
		},
		computed: {
			tagsList () {
				return this.$store.getters.getHistory || []
			}
		},
		methods: {
			// 事件 - 输入框确认
			onConfirm (value) {
				this.$store.dispatch('addNewTag', value)
				this.getLikeListByUserId()
				this.getArticalList(value)
			},
			// 事件 - 清空历史记录
			onClearHistory () {
				this.$store.dispatch('clearHistory')
			},
			// 请求 - 获取文章列表
			getArticalList (classify) {
				this
					.$api
					.home
					.getArticalList({
						name: 'artical-list',
						data: {
							classify: classify
						}
					})
					.then(data => {
						this.articalList = data
						this.searchPageFlag = true
					})
			},		
			// 请求 - 获取用户的收藏列表
			getLikeListByUserId () {
				this
					.$api
					.home
					.getLikeListByUserId({
						name: 'like-list-by-userId',
						data: {
							userId: '8010388'
						}
					})
					.then(data => {
						this.articalLikeList = data
					})				
			},				
			// 事件 - 收藏变化
			onLikeChange (type, articalId) {
				this
					.$api
					.home
					.like({
						name: 'like',
						data: {
							type: type,
							userId: '8010388',
							articalId: articalId							
						}
					})
					.then(data => {
						uni.showToast({
							title: type === 'like' ? '收藏成功' : '取消收藏'
						})
					})				
			}			
		}
	}
</script>

<style lang="scss" scoped>
	.history {
		.clear {
			display: flex;
			align-items: center;
			margin: 0 20rpx;
			padding: 30rpx 20rpx;
			justify-content: space-between;
			border-bottom: 1px solid #E4E7ED;
			text:nth-child(1) {
				cursor: pointer;
				font-size: 28rpx;
				font-weight: bold;
				color: $app-color-base;
			}
			text:nth-child(2) {
				cursor: pointer;
				font-size: 28rpx;
				font-weight: bold;
				color: $uni-color-success;
			}		
		}	
			
		.search-tag__wrapper {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			padding: 40rpx;
			.tag {
				color: #999999;
				padding: 8rpx 15rpx;
				border-radius: 10rpx;
				border: 1px solid #999;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				font-size: 26rpx;
			}
		}
		
		.search-tag__empty {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
			color: #909399;
			min-height: 200rpx;
		}			
	}
</style>
