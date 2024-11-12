// 请求主体 defHttp是对axios的二次封装
// import { apiHttp } from '/@/utils/http/axios';
// // 文件以model结尾 类型定义文件/文件夹(请求参数、响应数据)
// import { clientListParams, clientListResult } from './model/investmentManagementModel';

// // import { ErrorMessageMode } from '/#/axios';

// enum Api {
//   ClientList = '/investment-management/client/list',
// }
// /**
//  * @description: 获取客户列表
//  */
// export function clientListApi(params: clientListParams) {
//   return apiHttp.get<clientListResult>({
//     url: Api.ClientList,
//     params,
//   });
// }
import { defHttp } from '/@/utils/http/axios';

export function getInvestmentManagementdata() {
  return defHttp.get({ url: '/investment-management' });
}
