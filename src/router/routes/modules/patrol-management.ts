import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const test: AppRouteModule = {
  path: '/patrol-management',
  name: 'patrol-management',
  redirect: '/patrol-management/index',
  component: LAYOUT,
  meta: {
    title: '巡防管理',
    hideChildrenInMenu: false, // false 就会渲染二级菜单
    orderNo: 11,
    icon: 'gravity-ui:shield-check',
  },
  children: [
    {
      name: 'patrol-management-index',
      path: 'index',
      component: () => import('/@/views/patrol-management/index.vue'),
      meta: {
        title: '巡防管理',
        hideMenu: false,
      },
    },
  ],
};
export default test;
