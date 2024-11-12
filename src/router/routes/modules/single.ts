import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';
// path name redirect meta children
const dashboard: AppRouteModule = {
  path: '/single',
  name: 'Single',
  component: LAYOUT,
  redirect: '/single/index',
  meta: {
    // 把二级菜单渲染为一级菜单
    hideChildrenInMenu: true, // false 就会渲染二级菜单
    icon: 'material-symbols:computer-outline',
    title: '单页模块',
    orderNo: 15,
  },
  children: [
    {
      path: 'index',
      name: 'SinglePage',
      component: () => import('/@/views/single/index.vue'),
      meta: {
        title: '单页模块的页面',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
