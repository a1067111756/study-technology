'use strict';
exports.main = async (event, context) => {
	// 获取参数
	const articalId = event.articalId
	const userId = event.userId
	const type = event.type
				
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
	
	// 2. 更新用户的收藏
	if (type === 'like') {
		await collection.where({ id: userId }).update({
			article_likes_ids: dbCmd.addToSet(articalId)
		})		
		
		return {
			code: '000000',
			msg: `收藏成功`
		}				
	} else {
		await collection.where({ id: userId }).update({
			article_likes_ids: dbCmd.pull(articalId)
		})		
		
		return {
			code: '000000',
			msg: `取消收藏成功`
		}				
	}	
};
