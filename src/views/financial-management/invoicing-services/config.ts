export default {
  InvoiceRecordsTable: [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '状态',
      dataIndex: 'status',
      slots: { customRender: 'status' },
    },
    {
      title: '申请入口',
      dataIndex: 'application_portal',
    },
    {
      title: '购买方类型',
      dataIndex: 'buyer_type',
    },
    {
      title: '购买方名称',
      dataIndex: 'buyer_name',
    },
    {
      title: '购买方税号',
      dataIndex: 'buyer_tax_num',
    },
    {
      title: '主商品名称',
      dataIndex: 'main_goods_name',
    },
    {
      title: '主商品税率',
      dataIndex: 'main_goods_tax_rate',
    },
    {
      title: '开票金额(不含税)',
      dataIndex: 'invoice_amount',
    },
    {
      title: '开票税额',
      dataIndex: 'invoice_tax',
    },
    {
      title: '价税合计',
      dataIndex: 'tax_total',
    },
    {
      title: '开票张数',
      dataIndex: 'invoice_num',
    },
    {
      title: '申请方',
      dataIndex: 'applicant',
    },
    {
      title: '申请时间',
      dataIndex: 'apply_time',
    },
    {
      title: '关联账单',
      dataIndex: 'related_bill',
    },
    {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  ],
  InvoiceProductInformationTbale: [
    {
      title: '费用科目/商品名称',
    },
    {
      title: '规格型号',
    },
    {
      title: '单位',
    },
    {
      title: '数量',
    },
    {
      title: '单价(含税)',
    },
    {
      title: '商品税率',
    },
    {
      title: '金额(不含税)',
    },
    {
      title: '税额',
    },
    {
      title: '价税合计',
    },
    {
      title: '关联流水',
    },
  ],
  InvoiceInfoTable: [
    {
      title: '序号',
    },
    {
      title: '开票日期',
    },
    {
      title: '发票类型',
    },
    {
      title: '发票代码',
    },
    {
      title: '发票号码',
    },
    {
      title: '开票人',
    },
    {
      title: '价税合计(元)',
    },
    {
      title: '查看/下载',
    },
  ],
  OutputSettingsInfoTable: [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '状态',
      dataIndex: ' output_status',
    },
    {
      title: '开票主题/销方名称',
      dataIndex: 'seller_name',
    },
    {
      title: '纳税人识别号',
      dataIndex: 'taxpayer_code',
    },
    {
      title: '适用范围',
      dataIndex: 'use_range',
    },
    {
      title: '分别号',
      dataIndex: 'separate_num',
    },
    {
      title: '剩余发票张数',
      dataIndex: 'remaining_invoice_num',
    },
    {
      title: '开票账号设置',
      dataIndex: 'account_set',
    },
    {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  ],
};
