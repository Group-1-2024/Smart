export default {
  columns: [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '客户姓名',
      dataIndex: 'name',
    },
    {
      title: '客户电话',
      dataIndex: 'phone',
    },
    {
      title: '意向类别',
      dataIndex: 'itention',
      slots: { customRender: 'itention' },
    },
    {
      title: '客户状态',
      dataIndex: 'status',
      slots: { customRender: 'status' },
    },
    {
      title: '招商人员',
      dataIndex: 'transactor',
    },
    {
      title: '创建日期',
      dataIndex: 'create_time',
    },
    {
      title: '最近联系日期',
      dataIndex: 'last_contact_date',
    },
    {
      title: '下次跟进日期',
      dataIndex: 'next_contact_date',
    },
    {
      title: '客户认知途径',
      dataIndex: '',
      slots: { customRender: 'channel' },
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  ],
};
