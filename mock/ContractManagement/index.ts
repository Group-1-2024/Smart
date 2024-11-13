import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';
import { resultSuccess } from '../_util';

function createBookingManagement() {
  return Mock.mock({
    'tableData|60': [
      {
        'id|+1': 1,
        'status|1': ['已退定', '待生效', '待入住', '已入住', '无效'],
        'reservationInfo|1': [
          '黄-13511112222',
          '王-13111112222',
          '刘-13233334444',
          '赵-13455556666',
          '钱-13677778888',
          '张-13899990000',
        ],
        'propertyInfo|1': [
          'T005 测试楼栋B1栋1单元-8102室',
          'T005 测试楼栋B1栋1单元-8103室',
          'T005 测试楼栋B1栋1单元-8104室',
          'T005 测试楼栋B1栋1单元-8105室',
          'T005 测试楼栋B1栋1单元-8106室',
        ],
        'reservationType|1': ['-'],
        checkInDate: '@date("yyyy.MM.dd")',
        'stayDuration|1': ['1个月', '2个月', '3个月', '6个月', '1年'],
        'deposit|100-500': 1,
        'number|1': [
          ' 2023021000023',
          '2023021000022',
          '2023021000021',
          '2023021000020',
          '2023021000019',
          '2023021000018',
        ],
      },
    ],
  });
}

export default [
  // mock contractManagement API
  {
    url: '/basic-api/contractManagement',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess({
        ...createBookingManagement(),
      });
    },
  },
] as MockMethod[];
