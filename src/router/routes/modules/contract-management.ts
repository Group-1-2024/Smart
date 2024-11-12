import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const test: AppRouteModule = {
  path: '/contract-management',
  name: 'contract-management',
  redirect: '/contract-management/index',
  component: LAYOUT,
  meta: {
    title: '合约管理',
    hideChildrenInMenu: false, // false 就会渲染二级菜单
    orderNo: 3,
    icon: 'mdi:contract',
  },
  children: [
    {
      name: 'contract-management-index',
      path: 'index',
      component: () => import('/@/views/contract-management/index.vue'),
      meta: {
        title: '合约管理',
        hideMenu: false,
      },
    },
  ],
};
export default test;
