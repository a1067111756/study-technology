'use strict';
exports.main = async (event, context) => {
  const userId = event.userId
  const labelIds = event.labelIds
  
	// 获取数据库
	const db = uniCloud.database()
	
	// 获取数据表
	const collection = db.collection('user')
  
  return collection
    .where({
      _id: userId
    })
    .update({
      $set: {
        label_ids: labelIds
      }
    })
    .then(res => {
      return {
        code: '000000',
        msg: '更新成功'
      }
    })
    .catch(err => {
      console.log(err)
      return {
        code: '100',
        msg: `更新失败：${err}`
      }			
    })
};