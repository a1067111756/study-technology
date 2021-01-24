<template>
	<view class="page-feedback__container">
    <u-form :model="form" ref="uForm" label-position="top">
      <u-form-item label="意见反馈:" :border-bottom="false">
        <u-input v-model="form.content" border height="250" type="textarea" placeholder="请输入反馈意见" />
      </u-form-item>
      <u-form-item label="反馈图片:" :border-bottom="false">
        <u-upload :action="action" :file-list="form.fileList"></u-upload>
      </u-form-item>
      <u-button ripple type="error">提交反馈意见</u-button>
    </u-form>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
        action: ''
			}
		},
		methods: {
			
		}
	}
</script>

<style>
  .page-feedback__container {
    padding: 40rpx;
  }
</style>
