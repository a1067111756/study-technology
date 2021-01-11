'use strict';
exports.main = async (event, context) => {
	// 获取数据库
	const db = uniCloud.database()
	
	// 获取数据表
	const collection = db.collection('article')	

	return collection
		.where(event)
		.limit(100)
		.get()
		.then(res => {
			return {
				code: '000000',
				data: res.data,
				msg: '获取文章列表成功'
			}
		})
		.catch(err => {
			return {
				code: '100',
				msg: `获取失败：${err}`
			}			
		})		
};
