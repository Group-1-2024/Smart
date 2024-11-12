import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const test: AppRouteModule = {
  path: '/approval-management',
  name: 'approval-management',
  redirect: '/approval-management/index',
  component: LAYOUT,
  meta: {
    title: '审批管理',
    hideChildrenInMenu: false, // false 就会渲染二级菜单
    orderNo: 6,
    icon: 'material-symbols:approval',
  },
  children: [
    {
      name: 'approval-management-index',
      path: 'index',
      component: () => import('/@/views/approval-management/index.vue'),
      meta: {
        title: '审批管理',
        hideMenu: false,
      },
    },
  ],
};
export default test;
