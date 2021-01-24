<template>
	<view class="page-follow__container">
    <u-sticky>
      <view class="sticky tab__button u-flex">
        <text 
          v-for="(item, index) in tabList" 
          :key="index" 
          :class="{ active: index === activeIndex }"
          @click="onTabItemClick(index)"
         >{{ item.label }}</text>
      </view>
    </u-sticky>
    
    <view class="content u-padding-bottom-80">
			<ListCard v-if="activeIndex === 0">
				<view v-for="(item, index) in articalList" :key="index">
					<ListItem1 v-if="item.mode === 'base'" :value="item" :like="articalLikeList.includes(item.id)" @likeChange="onLikeChange"></ListItem1>
					<ListItem2 v-else-if="item.mode === 'image'" :value="item" :like="articalLikeList.includes(item.id)" @likeChange="onLikeChange"></ListItem2>
					<ListItem3 v-else-if="item.mode === 'column'" :value="item" :like="articalLikeList.includes(item.id)" @likeChange="onLikeChange"></ListItem3>
				</view>
			</ListCard>     
      
      <view v-else class="u-flex u-padding-20" v-for="(item, index) in auditorList" :key="index">
        <u-image shape="circle" width="120rpx" height="120rpx" :src="item.avatar"></u-image>
        <view class="u-flex-1 u-margin-left-20">
          <text class="u-font-28" style="font-weight: bold;">{{ item.author_name }}</text>
          <view class="u-flex u-row-between u-margin-top-30 u-font-26" style="color: #999999;">
            <text>{{ item.professional }}</text>
            <view>
              <text>发帖：{{ item.follow_count }}</text>
              <text class="u-margin-left-20">粉丝：{{ item.fans_count }}</text>              
            </view>
          </view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
  import ListCard from '@/pages/index/components/list-card/index.vue'
  import ListItem1 from '@/pages/index/components/list-card/ListItem1'
  import ListItem2 from '@/pages/index/components/list-card/ListItem2'
  import ListItem3 from '@/pages/index/components/list-card/ListItem3'
  
	export default {
		components: {
			ListCard,
			ListItem1,
			ListItem2,
			ListItem3
		},    
		data () {
			return {
        activeIndex: 0,
        auditorList: [],
        articalList: [],
        articalLikeList: [],
        tabList: [{ label: '文章' }, { label: '作者' } ]
			}
		},
    onLoad () {
      this.getAuditorList(),
      this.getArticalList(),
      this.getLikeListByUserId()
    },
		methods: {
			// 请求 - 获取作者列表
			getAuditorList () {
				this
					.$api
					.auditor
					.getList({
						name: 'user-list'
					})
					.then(data => {
            this.auditorList = data
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
							userId: this.$store.getters.getUserInfo.id
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
			},
      // 事件 - tab条目点击
      onTabItemClick (index) {
        this.activeIndex = index
      }
		}
	}
</script>

<style lang="scss" scoped>
  .tab__button {
    padding: 20rpx 40rpx;
    background-color: #ffffff;
    text {
      flex: 1;
      padding: 15rpx 0;
      text-align: center;
      border-top-right-radius: 0;
      border: 1rpx solid $app-color-base;
      &.active {
        color: #ffffff;
        background-color: $app-color-base;
      }
      &:first-child {
        border-right: none;
        border-top-left-radius: 10rpx;
        border-bottom-left-radius: 10rpx;
      }
      &:last-child {
        border-top-right-radius: 10rpx;
        border-bottom-right-radius: 10rpx;
      }      
    }
  }
</style>
