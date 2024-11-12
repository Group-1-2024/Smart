import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';
// path name redirect meta children
const dashboard: AppRouteModule = {
  path: '/workbench',
  name: 'Workbench',
  component: LAYOUT,
  redirect: '/workbench/index',
  meta: {
    // 把二级菜单渲染为一级菜单
    hideChildrenInMenu: true, // false 就会渲染二级菜单
    icon: '',
    title: '工作台',
    orderNo: 0,
  },
  children: [
    {
      path: 'index',
      name: 'WorkbenchPage',
      component: () => import('/@/views/workbench/index.vue'),
      meta: {
        title: '工作台页面',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
