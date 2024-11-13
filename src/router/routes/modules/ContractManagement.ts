import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/ContractManagement',
  name: 'ContractManagement',
  component: LAYOUT,
  meta: {
    orderNo: 2,
    title: '合约管理',
    icon: 'mdi:contract',
  },
  children: [
    {
      path: 'BookingManagement',
      name: 'BookingManagement',
      component: () => import('/@/views/ContractManagement/BookingManagement/index.vue'),
      meta: {
        // affix: true,
        title: '预定管理',
      },
    },
    {
      path: 'TenantContract',
      name: 'TenantContract',
      component: () => import('/@/views/ContractManagement/TenantContract/index.vue'),
      meta: {
        title: '租客合同',
      },
    },
  ],
};

export default dashboard;
