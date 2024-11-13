import { defHttp } from '/@/utils/http/axios';

export function getcontractManagementData() {
  return defHttp.get({ url: '/contractManagement' });
}
