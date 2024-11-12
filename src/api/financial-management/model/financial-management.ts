//使用enum关键字定义枚举类型
export enum Status {
  '待处理' = 1,
  '开票中' = 2,
  '已开票' = 3,
  '已作废' = 4,
  '已冲红' = 5,
  '开票失败' = 6,
}
export type invoicingRecordsResult = Array<{
  id: number;
  status: Status;
  application_portal: string;
  buyer_type: string;
  buyer_name: string;
  buyer_tax_num: number;
  main_goods_name: string;
  main_goods_tax_rate: number;
  invoice_amount: number;
  invoice_tax: number;
  tax_total: number;
  invoice_num: number;
  applicant: string;
  apply_time: string;
  related_bill: number;
  apply_phone: number;
}>;
export type OutputSettingsResult = Array<{
  id: number;
  output_status: string;
  seller_name: string;
  taxpayer_code: number;
  use_range: string;
  separate_num: number;
  remaining_invoice_num: number;
  account_set: string;
}>;
