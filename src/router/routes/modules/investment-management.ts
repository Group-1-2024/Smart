import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const test: AppRouteModule = {
  path: '/investment-management',
  name: 'investment-management',
  redirect: '/investment-management/index',
  component: LAYOUT,
  meta: {
    title: '招商管理',
    hideChildrenInMenu: true, // false 就会渲染二级菜单
    orderNo: 1,
    icon: 'streamline:information-desk-customer',
  },
  children: [
    {
      name: 'investment-management-index',
      path: 'index',
      component: () => import('/@/views/investment-management/index.vue'),
      meta: {
        title: '招商管理',
        hideMenu: true,
      },
    },
  ],
};
export default test;
