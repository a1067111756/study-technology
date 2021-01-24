'use strict';
exports.main = async (event, context) => {
  const userId = event.userId
  
	// 获取数据库
	const db = uniCloud.database()
	
	// 获取数据表
	const userCollection = db.collection('user')
  const labelCollection = db.collection('label')

  const userInfo = await userCollection.where({ _id: userId }).get()
	if (userInfo.data.length <= 0) {
		return {
			code: '1001',
			msg: `当前用户不存在`
		}		
	}
  
  const label = await labelCollection.get()
  const match = label.data.filter(item => userInfo.data[0].label_ids.includes(item._id))
  return {
    code: '000000',
    data: match,
    msg: '获取label标签成功'
  }
};
