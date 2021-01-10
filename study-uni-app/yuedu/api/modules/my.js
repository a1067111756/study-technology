/* 首页相关api */
import request from '@/utils/request'

// 获取tabBar标签
export const getTabBarLabel = params => request(params)

export default {
	getTabBarLabel
}