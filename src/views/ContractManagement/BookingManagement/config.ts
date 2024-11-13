export const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    customHeaderCell: () => ({
      style: { backgroundColor: '#8ed5f5', color: '#fff' },
    }),
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    customHeaderCell: () => ({
      style: { backgroundColor: '#8ed5f5', color: '#fff' },
    }),
  },
  {
    title: '预定人信息',
    dataIndex: 'reservationInfo',
    key: 'reservationInfo',
    customHeaderCell: () => ({
      style: { backgroundColor: '#8ed5f5', color: '#fff' },
    }),
  },
  {
    title: '房源信息',
    dataIndex: 'propertyInfo',
    key: 'propertyInfo',
    customHeaderCell: () => ({
      style: { backgroundColor: '#8ed5f5', color: '#fff' },
    }),
  },
  {
    title: '预定类型',
    dataIndex: 'reservationType',
    key: 'reservationType',
    customHeaderCell: () => ({
      style: { backgroundColor: '#8ed5f5', color: '#fff' },
    }),
  },
  {
    title: '预计入住日期',
    dataIndex: 'checkInDate',
    key: 'checkInDate',
    customHeaderCell: () => ({
      style: { backgroundColor: '#8ed5f5', color: '#fff' },
    }),
  },
  {
    title: '预计入住时长',
    dataIndex: 'stayDuration',
    key: 'stayDuration',
    customHeaderCell: () => ({
      style: { backgroundColor: '#8ed5f5', color: '#fff' },
    }),
  },
  {
    title: '定金（元）',
    dataIndex: 'deposit',
    key: 'deposit',
    customHeaderCell: () => ({
      style: { backgroundColor: '#8ed5f5', color: '#fff' },
    }),
  },
  {
    title: '编号',
    dataIndex: 'number',
    key: 'number',
    customHeaderCell: () => ({
      style: { backgroundColor: '#8ed5f5', color: '#fff' },
    }),
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    slots: { customRender: 'operation' },
    className: 'text-center',
    customHeaderCell: () => ({
      style: { backgroundColor: '#8ed5f5', color: '#fff' },
    }),
  },
];
