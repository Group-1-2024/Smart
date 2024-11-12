import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const test: AppRouteModule = {
  path: '/performance-management',
  name: 'performance-management',
  redirect: '/performance-management/index',
  component: LAYOUT,
  meta: {
    title: '业绩管理',
    hideChildrenInMenu: false, // false 就会渲染二级菜单
    orderNo: 12,
    icon: 'mingcute:performance-line',
  },
  children: [
    {
      name: 'performance-management-index',
      path: 'index',
      component: () => import('/@/views/performance-management/index.vue'),
      meta: {
        title: '业绩管理',
        hideMenu: false,
      },
    },
  ],
};
export default test;
