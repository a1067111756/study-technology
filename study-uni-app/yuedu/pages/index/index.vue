<template>
	<view class="page-home-container">
		<!-- 导航栏 -->
		<NavBar></NavBar>
		
		<!-- tabBar导航 -->
		<TabBar :value="tabBarLabel" @itemClick="onTabBarClick"></TabBar>
		
		<!-- 主内容 -->
		<view class="content">
			<ListCard>
				<view v-for="(item, index) in articalListCmp" :key="index">
					<ListItem1 v-if="item.mode === 'base'" :value="item" :like="articalLikeList.includes(item.id)" @likeChange="onLikeChange"></ListItem1>
					<ListItem2 v-else-if="item.mode === 'image'" :value="item" :like="articalLikeList.includes(item.id)" @likeChange="onLikeChange"></ListItem2>
					<ListItem3 v-else-if="item.mode === 'column'" :value="item" :like="articalLikeList.includes(item.id)" @likeChange="onLikeChange"></ListItem3>
				</view>
			</ListCard>
		</view>
	</view>
</template>

<script>
	import NavBar from './components/NavBar'
	import TabBar from '@/components/TabBar.vue'
	import ListCard from './components/list-card/index.vue'
	import ListItem1 from './components/list-card/ListItem1'
	import ListItem2 from './components/list-card/ListItem2'
	import ListItem3 from './components/list-card/ListItem3'
	
	export default {
		components: {
			NavBar,
			TabBar,
			ListCard,
			ListItem1,
			ListItem2,
			ListItem3
		},
		data () {
			return {
				tabBarLabel: [],
				articalList: [],
				articalType: '全部',
				articalLikeList: []
			}
		},
		computed: {
			// 筛选文章
			articalListCmp () {
				return this.articalType === '全部'
					? this.articalList
					: this.articalList.filter(item => item.classify === this.articalType)
			}
		},
		onLoad () {
			this.getTabBarLabel()
			this.getArticalList()
			this.getLikeListByUserId()
		},
		methods: {
			// 事件 - tabBar点击
			onTabBarClick (tabItem) {
				this.articalType = tabItem.name
			},
			// 请求 - 获取tabBar标签
			getTabBarLabel () {
				this
					.$api
					.home
					.getTabBarLabel({
						name: 'tab-bar-label'
					})
					.then(data => {
						this.tabBarLabel = [{ name: '全部', _id: '000000' }, ...data]
					})
			},
			// 请求 - 获取文章列表
			getArticalList () {
				this
					.$api
					.home
					.getArticalList({
						name: 'artical-list'
					})
					.then(data => {
						this.articalList = data
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

<style lang="scss">
	.page-home-container {
		display: flex;
		height: 100%;
		flex-flow: column;
		flex-wrap: nowrap;
		.content {
			flex: 1;
			overflow: hidden;
		}
	}
</style>
