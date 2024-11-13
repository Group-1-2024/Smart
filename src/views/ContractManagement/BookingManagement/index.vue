<template>
  <div class="bg-[#fff] rounded-[12px]">
    <Space size="small" direction="vertical" class="w-[100%]">
      <Row class="p-[10px]">
        <Col :offset="22">
          <Button @click="openModal" style="background: #1989f1; color: #fff; border-radius: 6px"
            >添加预定</Button
          >
        </Col>
      </Row>
      <Row>
        <Col class="p-[10px]">
          <Tabs v-model:activeKey="activeKey">
            <TabPane key="1" :tab="`全部(${rowCount})`">
              <Table
                :columns="columns"
                :data-source="data"
                bordered
                row-key="id"
                :pagination="{
                  total: rowCount, // 数据总条数
                  showSizeChanger: true, // 显示每页条数切换器
                  pageSizeOptions: ['10', '20', '30', '40'], // 每页条数选项
                  showTotal: (total) => `共 ${total} 条`,
                }"
              >
                <template #operation="{ record }">
                  <DropdownMenu :record="record" @delete="deleteRecord" />
                </template>
              </Table>
            </TabPane>
            <TabPane key="2" :tab="`待生效(${statusCount('待生效')})`">
              <Table
                :columns="columns"
                :data-source="filteredData('待生效')"
                bordered
                row-key="id"
                :pagination="{
                  total: rowCount, // 数据总条数
                  showSizeChanger: true, // 显示每页条数切换器
                  pageSizeOptions: ['10', '20', '30', '40'], // 每页条数选项
                  showTotal: (total) => `共 ${statusCount('待生效')} 条`,
                }"
              >
                <template #operation="{ record }">
                  <DropdownMenu :record="record" @delete="deleteRecord" />
                </template>
              </Table>
            </TabPane>
            <TabPane key="3" :tab="`待入住(${statusCount('待入住')})`">
              <Table
                :columns="columns"
                :data-source="filteredData('待入住')"
                bordered
                row-key="id"
                :pagination="{
                  total: rowCount, // 数据总条数
                  showSizeChanger: true, // 显示每页条数切换器
                  pageSizeOptions: ['10', '20', '30', '40'], // 每页条数选项
                  showTotal: (total) => `共 ${statusCount('待入住')} 条`,
                }"
              >
                <template #operation="{ record }">
                  <DropdownMenu :record="record" @delete="deleteRecord" />
                </template>
              </Table>
            </TabPane>
            <TabPane key="4" :tab="`已入住(${statusCount('已入住')})`">
              <Table
                :columns="columns"
                :data-source="filteredData('已入住')"
                bordered
                row-key="id"
                :pagination="{
                  total: rowCount, // 数据总条数
                  showSizeChanger: true, // 显示每页条数切换器
                  pageSizeOptions: ['10', '20', '30', '40'], // 每页条数选项
                  showTotal: (total) => `共 ${statusCount('已入住')} 条`,
                }"
              >
                <template #operation="{ record }">
                  <DropdownMenu :record="record" @delete="deleteRecord" />
                </template>
              </Table>
            </TabPane>
            <TabPane key="5" :tab="`已退定(${statusCount('已退定')})`">
              <Table
                :columns="columns"
                :data-source="filteredData('已退定')"
                bordered
                row-key="id"
                :pagination="{
                  total: rowCount, // 数据总条数
                  showSizeChanger: true, // 显示每页条数切换器
                  pageSizeOptions: ['10', '20', '30', '40'], // 每页条数选项
                  showTotal: (total) => `共 ${statusCount('已退定')} 条`,
                }"
                s
              >
                <template #operation="{ record }">
                  <DropdownMenu :record="record" @delete="deleteRecord" />
                </template>
              </Table>
            </TabPane>
            <TabPane key="6" :tab="`无效(${statusCount('无效')})`">
              <Table
                :columns="columns"
                :data-source="filteredData('无效')"
                bordered
                row-key="id"
                :pagination="{
                  total: rowCount, // 数据总条数
                  showSizeChanger: true, // 显示每页条数切换器
                  pageSizeOptions: ['10', '20', '30', '40'], // 每页条数选项
                  showTotal: (total) => `共 ${statusCount('无效')} 条`,
                }"
              >
                <template #operation="{ record }">
                  <DropdownMenu :record="record" @delete="deleteRecord" />
                </template>
              </Table>
            </TabPane>
            <template #tabBarExtraContent>
              <div class="flex items-center">
                <Input
                  placeholder="房源编号/房源地址/房间号/项目名称/预定人姓名/电话/编号"
                  v-model="roomData"
                  style="flex: 1; width: 25vw; border-radius: 15px"
                >
                  <template #suffix>
                    <Icon icon="material-symbols-light:search" />
                  </template>
                </Input>
                <Icon
                  icon="hugeicons:download-01"
                  class="ml-2"
                  style="color: #1989f1; font-size: 23px"
                />
                <Icon
                  icon="ph:line-vertical"
                  class="ml-2 relative right-[50vw] top-[9px]"
                  style="color: gray; font-size: 30px"
                />
              </div>
            </template>
          </Tabs>
        </Col>
      </Row>
      <Modal @register="register" />
    </Space>
  </div>
</template>

<script setup>
  import { onMounted, ref, computed } from 'vue';
  import { Row, Col, Button, Tabs, TabPane, Input, Space, Table } from 'ant-design-vue';
  import { getcontractManagementData } from '/@/api/ContractManagement';
  import { columns } from './config';
  import Icon from '/@/components/Icon';
  import { useModal } from '/@/components/Modal';
  import Modal from './components/Modal.vue';
  import DropdownMenu from './components/DropdownMenu.vue';
  // 使用 useModal
  const [register, { openModal }] = useModal();
  const activeKey = ref('1');
  const roomData = ref('');

  const data = ref([]);
  const getcontractManagement = async () => {
    const res = await getcontractManagementData();
    data.value = res.tableData;
  };
  onMounted(() => {
    getcontractManagement();
  });
  const rowCount = computed(() => data.value.length);
  // 筛选数据函数，根据状态过滤
  const filteredData = (status) => {
    return data.value.filter((record) => record.status === status);
  };

  // 获取不同状态的数量
  const statusCount = (status) => {
    return data.value.filter((record) => record.status === status).length;
  };
  // 删除记录的函数
  const deleteRecord = (recordId) => {
    data.value = data.value.filter((record) => record.id !== recordId);
  };
</script>

<style scoped>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
