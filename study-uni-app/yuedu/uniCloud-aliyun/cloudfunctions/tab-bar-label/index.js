'use strict';
exports.main = (event, context) => {
	// 获取数据库
	const db = uniCloud.database()
	
	// 获取数据表
	const collection = db.collection('label')
	
	// 查询索引label
	return collection
		.get()
		.then(res => {
			return {
				code: '000000',
				data: res.data,
				msg: '获取tabBar标签成功'
			}
		})
		.catch(err => {
			return {
				code: '100',
				msg: `获取失败：${err}`
			}			
		})
};
