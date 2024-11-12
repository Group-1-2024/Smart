import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const test: AppRouteModule = {
  path: '/material-management',
  name: 'material-management',
  redirect: '/material-management/index',
  component: LAYOUT,
  meta: {
    title: '物资管理',
    hideChildrenInMenu: false, // false 就会渲染二级菜单
    orderNo: 7,
    icon: 'mdi:folder-key-outline',
  },
  children: [
    {
      name: 'material-management-index',
      path: 'index',
      component: () => import('/@/views/material-management/index.vue'),
      meta: {
        title: '物资管理',
        hideMenu: false,
      },
    },
  ],
};
export default test;
