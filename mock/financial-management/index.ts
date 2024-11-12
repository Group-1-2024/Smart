import { MockMethod } from 'vite-plugin-mock';
// import { fakerZH_CN } from '@faker-js/faker';
// import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util';
import { resultSuccess } from '../_util';
import Mock from 'mockjs';
function financialManagement() {
  return Mock.mock({
    'invoicingRecords|100': [
      {
        'id|+1': 1,
        'status|1': '@integer(1,6)',
        // 'status|1': ['待处理', '开票中', '已开票', '开票失败', '冲红', '作废'],
        'application_portal|1': '租客端',
        'buyer_type|1': ['个人', '企业'],
        'buyer_name|1': '@cname',
        'buyer_tax_num|1': '@integer(10000000000,99999999999)',
        'main_goods_name|1': '@ctitle',
        'main_goods_tax_rate|1': '@integer(10,50)' + '%',
        'invoice_amount|1': '@integer(100000,1000000)',
        'invoice_tax|1': '@integer(10000,50000)',
        'tax_total|1': '@integer(100000,1000000)',
        'invoice_num|1': '@integer(10,50)',
        'applicant|1': '@cname',
        'apply_time|1': '@datetime',
        'related_bill|1': '@integer(1,10)',
        'apply_phone|1': '@integer(13000000000,19999999999)',
        'delivery_email|1': '@email',
        'delivery_phone|1': '@integer(13000000000,19999999999)',
        'apply_date|1': '@datetime(yyyy-MM-dd)',
        'invoice_code|1': '@integer(0420000000,04299999999)',
        'invoice_number|1': '@integer(00000000,99999999)',
        'invoice-person|1': '@cname',
        'invoice_phone|1': '@integer(13000000000,19999999999)',
        'invoice_date|1': '@datetime(yyyy-MM-dd)',
        'invoice_type|1': ['电子发票', '纸质发票'],
        'invoice_create_person|1': '@cname',
        'invoice_create_time|1': '@datetime',
        'invoice_update_time|1': '@datetime',
        'payer_phone|1': '@integer(13000000000,19999999999)',
        'payer_name|1': '@cname',
        'payer_account|1': '@integer(1000000000,9999999999)',
        'receive_time|1': '@datetime',
        'payment_method|1': ['现金', '微信/支付宝', '平台钱包'],
        'payment_person|1': '@cname',
        'payment_person_type|1': ['员工', '公司财务部', '公司负责人'],
        'transaction_serial_num|1': '@integer(100000000000000000,999999999999999999)',
        'action_time|1': '@datetime',
        'payment_remark|1': ['线上支付', '线下支付'],
        'cost_cycle_first|1': ['2022-01-01', '2022-12-31'],
        'cost_cycle_last|1': ['2023-01-31', '2023-12-31'],
        'serve_charge|1': '@integer(10.00,100.00)',
        'cost_summary|1': '房屋租金/房屋押金/支付手续费',
        'flot_create_time|1': '@datetime',
        'flot_update_time|1': '@datetime',
        'flot_create_person|1': '@cname',
      },
    ],
    'outputSettingsInfo|40': [
      {
        'id|+1': 1,
        'output_status|1': ['已开票', '未开票'],
        'seller_name|1': '@cname',
        'taxpayer_code|1': '@integer(10000000000,99999999999)',
        'use_range|1': ['个人', '企业'],
        'separate_num|1': '@integer(1,10)',
        'remaining_invoice_num|1': '@integer(1,10)',
        'account_set|1': ['已关联', '未关联'],
      },
    ],
  });
}
export default [
  // mock user login
  {
    url: '/basic-api/financial-management/invoicing-services',
    timeout: 1000,
    method: 'get',
    response() {
      // 没有异常
      return resultSuccess({
        ...financialManagement(),
      });
      // 存在异常
      // return resultError('出现了错误');
    },
  },
] as MockMethod[];

// fack 伪造
// create 创造
