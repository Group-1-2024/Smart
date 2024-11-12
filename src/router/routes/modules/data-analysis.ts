import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const test: AppRouteModule = {
  path: '/data-analysis',
  name: 'data-analysis',
  redirect: '/data-analysis/index',
  component: LAYOUT,
  meta: {
    title: '数据分析',
    hideChildrenInMenu: false, // false 就会渲染二级菜单
    orderNo: 8,
    icon: 'material-symbols:data-thresholding-outline',
  },
  children: [
    {
      name: 'data-analysis-index',
      path: 'index',
      component: () => import('/@/views/data-analysis/index.vue'),
      meta: {
        title: '数据分析',
        hideMenu: false,
      },
    },
  ],
};
export default test;
