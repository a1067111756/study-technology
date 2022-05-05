import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
import localTango from 'local-tango';
import { getTree } from '@/services/api/menu'

const loginPath = '/auth/login';
const registerPath = '/auth/register';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

// 生命周期钩子 - 初始化默认状态
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: MODEL.IUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<MODEL.IUser | undefined>;
}> {
  // 方法 - 获取用户信息
  const fetchUserInfo = async (): Promise<MODEL.IUser | undefined> => {
    // 从本地存储中获取用户信息
    const userInfo = localTango.getItemJSON('userInfo', {}) as MODEL.IUser

    // 用户信息不存在，视为未登录，跳转到登录页
    if (!userInfo) {
      history.push(loginPath);
      return
    }

    return userInfo
  };

  // 如果是登录页面、注册页面，不执行
  if (history.location.pathname !== loginPath && history.location.pathname !== registerPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    // 顶栏右侧布局
    rightContentRender: () => <RightContent />,
    // 底部布局
    footerRender: () => <Footer />,
    // 主内容布局
    childrenRender: (children, props) => {
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    // 动态菜单
    menu: {
      params: {
        userId: initialState?.currentUser?.id,
      },
      request: async (params, defaultMenuData) => {
        console.log(params, defaultMenuData);
        const menuData = await getTree();
        console.log(menuData);
        return defaultMenuData;
      },
    },
    // 兼容
    disableContentMargin: false,
    // 页面改变回调
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // 全局设置
    ...initialState?.settings,
  };
};
