/* 作者相关api */
import request from '@/utils/request'

// 获取user下的label标签
export const getList = params => request(params)

export default {
	getList
}