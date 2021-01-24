<template>
	<view class="u-flex-col label-manager__container">
    <!-- 消息弹出框 -->
    <u-toast ref="uToast" />
    
    <!-- 用户标签编辑 -->
		<view class="cell">
      <view class="u-flex u-row-between u-font-32 u-padding-20 u-border-bottom">
        <text>我的标签</text>
        <text class="edit" @click="() => { canEdit ? onCompelete() : onEdit() }">{{ canEdit ? '完成' : '编辑'}}</text>
      </view>
      
      <!-- 用户标签 -->
      <view v-if="labelListOfUser.length > 0" class="u-flex u-flex-wrap u-padding-top-20 u-padding-bottom-20">
        <u-tag 
          class="u-margin-10" 
          v-for="(tag, index) in labelListOfUser" 
          :key="index"
          :text="tag.name" 
          mode="plain" 
          type="primary" 
          :closeable="canEdit"
          @close="onDelete(index)"
        />
      </view>
      <!-- 空内容展示 -->
      <view v-else class="u-flex u-row-center u-padding-top-80 u-padding-bottom-80">
        <text>喔哦! 没有标签请先添加0.0</text>
      </view>
    </view>
    
    <!-- 所有标签 -->
    <view class="cell u-margin-top-20">
      <view class="u-flex u-row-between u-font-32 u-padding-20 u-border-bottom">
        <text class="recommend">标签推荐</text>
      </view>
      
      <!-- 推荐标签 -->
      <view v-if="recommendLabel.length > 0" class="u-flex u-flex-wrap u-padding-top-20 u-padding-bottom-20">
        <u-tag 
          class="u-margin-10" 
          :key="index"
          v-for="(tag, index) in recommendLabel"
          type="info" 
          mode="plain" 
          :text="tag.name"
          @click="onAdd(tag)"
         />
      </view>
      <!-- 空内容展示 -->
      <view v-else class="u-flex u-row-center u-padding-top-80 u-padding-bottom-80">
        <text>暂无更多推荐标签^_^</text>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
        canEdit: false, // 允许编辑
				labelListOfAll: [], // 所有的标签列表
        labelListOfUser: [] // 用户拥有的标签列表ids
			}
		},
		onLoad () {
			this.getAllLabel()
      this.getListByUserId()
		},
    computed: {
      recommendLabel () {
        const labelIdsOfUser = this.labelListOfUser.map(item => item._id)
        
        return this
          .labelListOfAll
          .filter(item => !labelIdsOfUser.includes(item._id))
      }  
    },    
		methods: {
			// 请求 - 获取tabBar标签
			getAllLabel () {
				this
					.$api
					.home
					.getTabBarLabel({
						name: 'tab-bar-label',
            data: {
              userId: this.$store.getters.getUserInfo._id,
            }            
					})
					.then(data => {
						this.labelListOfAll = data
					})
			},	
			// 请求 - 获取用户下属的标签
			getListByUserId () {
				this
					.$api
					.label
					.getListByUserId({
						name: 'label-of-user',
            data: {
              userId: this.$store.getters.getUserInfo._id,
            }
					})
					.then(data => {
						this.labelListOfUser = data
					})
			},
      // 事件 - 编辑
      onEdit () {
        this.canEdit = true
      },
      // 事件 - 编辑完成
      onCompelete () {
				this
					.$api
					.label
					.updateListByUserId({
						name: 'update-label-of-user',
            data: {
              userId: this.$store.getters.getUserInfo._id,
              labelIds: this.labelListOfUser.map(item => item._id)
            }
					})
					.then(data => {
						this.canEdit = false
            this.$refs.uToast.show({
              title: '更新成功',
              type: 'success'
            })      
            uni.$emit('label-change')
					})
          .catch(e => {
            this.$refs.uToast.show({
              title: '更新失败',
              type: 'error'
            })            
          })
      },
      // 事件 - 添加
      onAdd (tag) {
        if (!this.canEdit) {
          this.$refs.uToast.show({
            title: '请先点击编辑',
            type: 'warning'
          })           
          return
        }
        this.labelListOfUser.push(tag)
      },
      // 事件 - 删除
      onDelete (index) {
        this.labelListOfUser.splice(index, 1)
      }      
		}
	}
</script>

<style lang="scss" scoped>
  .label-manager__container {
    width: 100%;
    height: 100%;
    background-color: $uni-bg-color-grey;
    
    .edit {
      font-weight: bold;
      color: $u-type-success;
    }
    
    .recommend {
      color: $app-color-base;      
    }
    
    .empty {
      font-size: 26rpx;
      color: $uni-text-color-grey;
    }
  }
  
  .cell {
    padding: 20rpx;
    padding-bottom: 0;
    background-color: $uni-bg-color;
  }
</style>
