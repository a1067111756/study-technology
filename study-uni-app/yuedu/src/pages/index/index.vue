<template>
  <u-button type="primary">主要按钮</u-button>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
      var loginRes = this.$checkLogin('../index/index', '2')
      if (!loginRes) return  
		},
		methods: {

		}
	}
</script>

<style>
</style>
