function request({ name, data={} }) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
				name: name, // 云函数名字
				data: data, // 参数
				success: res => { // 成功回调
					const result = res.result
					// 错误情况
					if (result.code !== '000000') {
						reject(result)
						return
					}
					
					// 成功情况
					resolve(result.data)
				}, 
				fail: (res) => { // 失败回调
					console.log(res)
					reject(res.result)
				}, 
		})
	}).catch(error => { // 当前层捕获异常处理, 上层可以不处理
		console.error(error)
		return Promise.reject(error) // 将promise状态置为reject, 否则默认会返回resolve状态, 会走正常流程
	})
}

export default request
