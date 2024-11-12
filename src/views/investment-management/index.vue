<template>
  <PageWrapper>
    <div class="bg-[#fff] p-[10px]">
      <BasicTitle helpMessage="招商管理" class="!text-[13px]">招商管理</BasicTitle>
      <div class="flex justify-between items-centers mt-[5px]">
        <Select ref="select" v-model:value="value1" style="width: 180px" :options="options" />

        <Button type="primary" @click="showDrawer">添加招商信息</Button>
      </div>
      <!-- 操作栏 -->
      <div class="flex justify-between items-centers">
        <Tabs v-model:activeKey="activeKey" class="w-[100%]">
          <TabPane key="1" tab="私客">
            <!-- 表格 -->
            <div>
              <Table :dataSource="dataSource" :columns="config.columns">
                <template #status="{ record }">
                  <Button>{{ Status[record.status.toString()] }}</Button>
                </template>
                <template #channel="{ record }">
                  <Button>{{ Channel[record.status.toString()] }}</Button>
                </template>
                <template #itention="{ record }">
                  <Button>{{ Itention[record.status.toString()] }}</Button>
                </template>
                <template #action="{ record }">
                  <Button danger @click="deleteItem(record)">删除</Button>
                </template>
              </Table>
            </div>
          </TabPane>
          <TabPane key="2" tab="公客"><div></div></TabPane>
        </Tabs>
        <div class="absolute flex items-center right-3 top-18">
          <Input placeholder="客户姓名/客户电话" class="!w-[20vw] !h-[30px]" />
          <Icon icon="lucide:download" class="mx-[10px] size-[30px] text-[blue]" />
        </div>
      </div>
    </div>
    <Drawer title="添加招商信息" :open="open" @close="closeDrawer">
      <input type="text" />
      <input type="password" />
    </Drawer>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Icon } from '/@/components/Icon';
  import { TabPane, Tabs, Select, Button, Table, Input, Drawer } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTitle } from '/@/components/Basic';
  import { ref } from 'vue';
  import config from './config';
  // import { clientListApi } from '/@/api/investment-management';
  import { getInvestmentManagementdata } from '/@/api/investment-management/index';
  import type { clientListResult } from '/@/api/investment-management/model/investmentManagementModel';
  import {
    Status,
    Channel,
    Itention,
  } from '/@/api/investment-management/model/investmentManagementModel';
  const activeKey = ref('1');
  const value1 = ref('不限');
  const dataSource = ref<clientListResult>([]);
  const open = ref(false);
  // clientListApi({ type: 'private', baseId: '1' })
  //   .then(function (res) {
  //     dataSource.value = res;
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   });
  getInvestmentManagementdata()
    .then(function (res) {
      dataSource.value = res.clientList;
    })
    .catch(function (err) {
      console.log(err);
    });
  function deleteItem(e) {
    const index = dataSource.value.findIndex((item) => item.id === e.id);
    if (index !== -1) {
      dataSource.value.splice(index, 1);
    }
  }
  const options = ref([
    {
      value: '不限',
      label: '不限',
    },
    {
      value: '测试栋楼',
      label: '测试栋楼',
    },
    {
      value: '东西湖新创基地',
      label: '东西湖新创基地',
    },
  ]);
  const showDrawer = () => {
    open.value = true;
    console.log(open.value);
  };
  const closeDrawer = () => {
    open.value = false; // 关闭抽屉
  };
</script>
