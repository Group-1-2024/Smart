import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const test: AppRouteModule = {
  path: '/financial-management',
  name: 'financial-management',
  redirect: '/financial-management/index',
  component: LAYOUT,
  meta: {
    title: '财务管理',
    hideChildrenInMenu: false, // false 就会渲染二级菜单
    orderNo: 4,
    icon: 'icon-park-outline:finance',
  },
  children: [
    {
      name: 'invoicing-services',
      path: 'invoicing-services',
      component: () => import('/@/views/financial-management/invoicing-services/index.vue'),
      meta: {
        title: '发票服务',
        hideMenu: false,
      },
    },
    {
      name: 'billing-management',
      path: 'billing-management',
      component: () => import('/@/views/financial-management/billing-management/index.vue'),
      meta: {
        title: '账单管理',
        hideMenu: false,
      },
    },
    {
      name: 'receipts-payments',
      path: 'receipts-payments',
      component: () => import('/@/views/financial-management/receipts-payments/index.vue'),
      meta: {
        title: '收付流水',
        hideMenu: false,
      },
    },
    {
      name: 'tenant-transfer-notice',
      path: 'tenant-transfer-notice',
      component: () => import('/@/views/financial-management/tenant-transfer-notice/index.vue'),
      meta: {
        title: '租客转账通知',
        hideMenu: false,
      },
    },
  ],
};
export default test;
