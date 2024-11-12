import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const test: AppRouteModule = {
  path: '/smart-devices',
  name: 'smart-devices',
  redirect: '/smart-devices/index',
  component: LAYOUT,
  meta: {
    title: '智能设备',
    hideChildrenInMenu: false, // false 就会渲染二级菜单
    orderNo: 10,
    icon: 'material-symbols:smart-toy-outline-sharp',
  },
  children: [
    {
      name: 'smart-devices-index',
      path: 'index',
      component: () => import('/@/views/smart-devices/index.vue'),
      meta: {
        title: '智能设备',
        hideMenu: false,
      },
    },
  ],
};
export default test;
