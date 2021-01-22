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

// 获取用户的收藏列表
export const getLikeListByUserId = params => {
	return request(params)
}

// 收藏文章
export const like = params => {
	return request(params)
}

export default {
	like,
	getTabBarLabel,
	getArticalList,
	getLikeListByUserId
}