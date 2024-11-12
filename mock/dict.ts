import { MockMethod } from 'vite-plugin-mock';
// import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util';
import { resultSuccess } from './_util';

// 资产管理字典 以3开头 例如10000
const contractManagementDict = {
  40000: '空房',
  40001: '关闭',
  40002: '定',
  40003: '签',
  40004: '欠',
  40005: '收',
  40006: '退',
  40007: '转',
  40008: '换',
};
// 合约管理字典 以4开头 例如40000
function prepertyManagementDict() {
  const dict = {};
  return dict;
}
export default [
  // mock user login
  {
    url: '/basic-api/dict',
    timeout: 1000,
    method: 'get',
    response() {
      // 没有异常
      return resultSuccess({
        ...contractManagementDict,
        ...prepertyManagementDict(),
      });
      // 存在异常
      // return resultError('出现了错误');
    },
  },
] as MockMethod[];

// fack 伪造
// create 创造
