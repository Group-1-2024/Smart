import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const test: AppRouteModule = {
  path: '/marketing-promotion',
  name: 'marketing-promotion',
  redirect: '/marketing-promotion/index',
  component: LAYOUT,
  meta: {
    title: '营销推广',
    hideChildrenInMenu: false, // false 就会渲染二级菜单
    orderNo: 5,
    icon: 'icon-park-outline:finance',
  },
  children: [
    {
      name: 'marketing-promotion-index',
      path: 'index',
      component: () => import('/@/views/marketing-promotion/index.vue'),
      meta: {
        title: '营销推广',
        hideMenu: false,
      },
    },
  ],
};
export default test;
