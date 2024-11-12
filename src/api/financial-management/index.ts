import { defHttp } from '/@/utils/http/axios';

export function getFinancialManagementISdata() {
  return defHttp.get({ url: '/financial-management/invoicing-services' });
}
export function getFinancialManagementBMdata() {
  return defHttp.get({ url: '/financial-management/billing-management' });
}
