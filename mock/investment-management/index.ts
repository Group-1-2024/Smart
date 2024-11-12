import { MockMethod } from 'vite-plugin-mock';
// import { fakerZH_CN } from '@faker-js/faker';
// import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util';
import { resultSuccess } from '../_util';
import Mock from 'mockjs';
function investmentManagement() {
  return Mock.mock({
    'clientList|30': [
      {
        'id|+1': 1,
        'name|1': '@cname',
        'phone|1': '@integer(13000000000,19999999999)',
        'intention|1': '@integer(1,3)',
        'status|1': '@integer(1,3)',
        'transactor|1': '@cname',
        'channel|1': '@integer(1,3)',
        'remark|1': '@csentence',
        'create_time|1': '@datetime',
        'last_contact_date|1': '@datetime',
        'next_contact_date|1': '@datetime',
        // 'status|1': ['待处理', '开票中', '已开票', '开票失败', '冲红', '作废'],
      },
    ],
  });
}
export default [
  // mock user login
  {
    url: '/basic-api/investment-management',
    timeout: 1000,
    method: 'get',
    response() {
      // 没有异常
      return resultSuccess({
        ...investmentManagement(),
      });
      // 存在异常
      // return resultError('出现了错误');
    },
  },
] as MockMethod[];

// fack 伪造
// create 创造
