/* 首页相关api */
import request from '@/utils/request'

// 获取tabBar标签
export const getTabBarLabel = params => {
	return request(params)
}

// 获取文章列表
export const getArticalList = params => {
	return request(params)
}

export default {
	getTabBarLabel,
	getArticalList
}