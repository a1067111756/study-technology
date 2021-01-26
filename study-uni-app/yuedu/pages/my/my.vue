<template>
	<view class="page-my__container">
    <!-- 顶部栏 -->
		<view class="header u-flex u-flex-col u-col-center u-row-center">
      <u-image width="120rpx" height="120rpx" shape="circle" :src="userInfo.avatar"></u-image>
      <text class="u-margin-top-40 u-font-36" style="font-weight: bold;">{{ userInfo.author_name }}</text>
      <u-grid :col="3" :border="false" style="flex: none">
        <u-grid-item bg-color="transparent">
          <text>关注</text>
          <view class="grid-text">{{ userInfo.fans_count }}</view>
        </u-grid-item>
        <u-grid-item bg-color="transparent">
          <text>粉丝</text>
          <view class="grid-text">{{ userInfo.follow_count }}</view>
        </u-grid-item>
        <u-grid-item bg-color="transparent">
          <text>积分</text>
          <view class="grid-text">0</view>
        </u-grid-item>
      </u-grid>      
    </view>
    
    <!-- 信息栏 -->
    <view>
      <u-cell-group>
        <u-cell-item icon="bookmark-fill" title="我的文章"></u-cell-item>
        <u-cell-item icon="question-circle" title="意见反馈" @click="jumpFeedBack"></u-cell-item>
      </u-cell-group>      
    </view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
			}
		},
    computed: {
      userInfo () {
        return this.$store.getters.getUserInfo 
      }
    },
		methods: {
      // 事件 - 跳转到反馈页面
      jumpFeedBack () {
        this.$u.route({
          url: '/pages/feedback/feedback'
        })        
      }
		}
	}
</script>

<style lang="scss" scoped>
  .header {
    height: 450rpx;
    background-color: $app-color-base;
  }
</style>
