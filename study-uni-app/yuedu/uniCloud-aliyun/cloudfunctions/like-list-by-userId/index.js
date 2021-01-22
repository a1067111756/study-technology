'use strict';
exports.main = async (event, context) => {
	const userId = event.userId
	
	// 获取数据库
	const db = uniCloud.database()
	const dbCmd = db.command
	
	// 获取数据表
	const collection = db.collection('user')
	
	// 1. 查询user用户 
	const userInfo = await collection.where({ id: userId }).get()
	if (userInfo.data.length <= 0) {
		return {
			code: '1001',
			msg: `当前用户不存在`
		}		
	}
	
	//返回数据给客户端
	return {
		code: '000000',
		msg: `查询成功`,
		data: userInfo.data[0].article_likes_ids
	}		
};
