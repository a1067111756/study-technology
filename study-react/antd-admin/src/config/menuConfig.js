const menuList = [
  {
    title: '首页',
    key: '/home',
    icon: 'DashboardOutlined'
  },
  {
    title: 'UI',
    key: '/ui',
    icon: 'BuildOutlined',
    children: [
      {
        title: '按钮',
        key: '/ui/buttons',
        icon: 'AlertOutlined'
      },
      {
        title: '弹框',
        key: '/ui/modals',
        icon: 'DashboardOutlined'
      },
      {
        title: 'Loading',
        key: '/ui/loadings',
        icon: 'DashboardOutlined'
      },
      {
        title: '通知提醒',
        key: '/ui/notification',
        icon: 'DashboardOutlined'
      },
      {
        title: '全局Message',
        key: '/ui/messages',
        icon: 'DashboardOutlined'
      },
      {
        title: 'Tab页签',
        key: '/ui/tabs',
        icon: 'DashboardOutlined'
      },
      {
        title: '图片画廊',
        key: '/ui/gallery',
        icon: 'DashboardOutlined'
      },
      {
        title: '轮播图',
        key: '/ui/carousel',
        icon: 'DashboardOutlined'
      }
    ]
  },
  {
    title: '表单',
    key: '/form',
    icon: 'DashboardOutlined',
    children: [
      {
        title: '登录',
        key: '/form/login',
        icon: 'DashboardOutlined'
      },
      {
        title: '注册',
        key: '/form/reg',
        icon: 'DashboardOutlined'
      }
    ]
  },
  {
    title: '表格',
    key: '/table',
    icon: 'DashboardOutlined',
    children: [
      {
        title: '基础表格',
        key: '/table/basic',
        icon: 'DashboardOutlined'
      },
      {
        title: '高级表格',
        key: '/table/high',
        icon: 'DashboardOutlined'
      }
    ]
  },
  {
    title: '富文本',
    key: '/rich',
    icon: 'DashboardOutlined'
  },
  {
    title: '城市管理',
    key: '/city',
    icon: 'DashboardOutlined'
  },
  {
    title: '订单管理',
    key: '/order',
    icon: 'DashboardOutlined',
    children: [
      {
        title: '订单详情',
        key: 'detail',
        icon: 'DashboardOutlined'
      },
      {
        title: '结束订单',
        key: 'finish',
        icon: 'DashboardOutlined'
      }
    ]
  },
  {
    title: '员工管理',
    key: '/user',
    icon: 'DashboardOutlined'
  },
  {
    title: '车辆地图',
    key: '/bikeMap',
    icon: 'DashboardOutlined'
  },
  {
    title: '图标',
    key: '/charts',
    icon: 'DashboardOutlined',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'DashboardOutlined'
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'DashboardOutlined'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'DashboardOutlined'
      },
    ]
  },
  {
    title: '权限设置',
    key: '/permission',
    icon: 'DashboardOutlined'
  },
];
export default menuList;