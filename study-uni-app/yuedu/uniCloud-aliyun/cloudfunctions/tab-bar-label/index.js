'use strict';
exports.main = async (event, context) => {
	// 获取数据库
	const db = uniCloud.database()
	
	// 获取数据表
  const collection = db.collection('label')
  
  return collection
    .get()
    .then(res => {
      return {
        code: '000000',
        data: res.data,
        msg: '获取label标签成功'
      }      
    })
};
