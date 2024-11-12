import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/mutiple',
  name: 'Multiple',
  component: LAYOUT,
  redirect: '/mutiple/foo/index',
  meta: {
    orderNo: 20,
    icon: 'ion:grid-outline',
    title: '多页模块',
  },
  children: [
    {
      path: 'foo',
      name: 'Foo',
      component: () => import('/@/views/multiple/foo/index.vue'),
      meta: {
        // affix: true,
        title: 'Foo页面',
      },
    },
    {
      path: 'bar',
      name: 'Bar',
      component: () => import('/@/views/multiple/bar/index.vue'),
      meta: {
        title: 'Bar页面',
      },
    },
  ],
};

export default dashboard;
