import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const test: AppRouteModule = {
  path: '/asset-management',
  name: 'asset-management',
  redirect: '/asset-management/index',
  component: LAYOUT,
  meta: {
    title: '资产管理',
    hideChildrenInMenu: false, // false 就会渲染二级菜单
    orderNo: 2,
    icon: 'hugeicons:gold',
  },
  children: [
    {
      name: 'asset-management-index',
      path: 'index',
      component: () => import('/@/views/asset-management/index.vue'),
      meta: {
        title: '资产管理',
        hideMenu: false,
      },
    },
  ],
};
export default test;
