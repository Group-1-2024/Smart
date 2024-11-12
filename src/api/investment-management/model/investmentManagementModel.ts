//使用enum关键字定义枚举类型
export enum Status {
  '问询' = 1,
  '看房' = 2,
  '关闭' = 3,
}
export enum Channel {
  '广告' = 1,
  '朋友推荐' = 2,
  '行业协会' = 3,
}
export enum Itention {
  'A' = 1,
  'B' = 2,
  'C' = 3,
}
export type clientListResult = Array<{
  id: number;
  name: string;
  phone: string;
  intention: string;
  status: Status;
  transactor: string;
  channel: Channel;
  remark: string;
  create_tiem: string;
  last_contact_time: string;
  next_contact_time: string;
}>;
