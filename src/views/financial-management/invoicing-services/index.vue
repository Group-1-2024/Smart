<template>
  <PageWrapper>
    <div class="bg-[#fff] p-[20px] rounded-lg">
      <div class="flex items-center h-[40px] w-[100%]">
        <div class="w-[4px] h-[16px] bg-[#1989fa] rounded-xl"></div>
        <div class="font-bold pl-[10px] text-[16px]">发票服务</div>
        <Button v-if="activeKey === '1'" type="primary" class="ml-auto">添加账单</Button>
        <Button
          v-if="activeKey === '8'"
          type="primary"
          class="ml-auto"
          @click="showAddInvoiceSubjectModal"
          >添加开票主体</Button
        >
      </div>
      <!--tab标签页-->
      <Tabs type="card" v-model:activeKey="activeKey">
        <!-- 开票记录tab页面 -->
        <TabPane key="1" tab="开票记录">
          <Tabs v-model="activeKey">
            <TabPane key="1" :tab="`全部（${InvoiceRecordsTable.length}）`">
              <div>
                <!--  total money -->
                <div class="flex items-center h-[40px] rounded-md bg-[#f5f5f5] px-[20px]">
                  <div class="font-bold">合计:</div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">金额(不含税)：</span>
                    <span>{{ totalAmount }}</span>
                    <span class="text-[#797979] pl-[20px]">|</span>
                  </div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">税额：</span>
                    <span>{{ totalTax }}</span>
                    <span class="text-[#797979] pl-[20px]">|</span>
                  </div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">价税合计：</span>
                    <span>{{ totalAmount + totalTax }}</span>
                  </div>
                </div>
                <!-- 表格 -->
                <Table
                  :dataSource="filteredInvoiceRecordsTable"
                  :columns="config.InvoiceRecordsTable"
                  class="mt-[15px]"
                >
                  <template #status="{ record }">
                    <div>{{ Status[record.status.toString()] }}</div>
                  </template>
                  <template #action="{ record }">
                    <div class="flex items-center">
                      <Dropdown
                        :trigger="['click']"
                        placement="bottomCenter"
                        class="px-[5px] mt-[2px]"
                      >
                        <Icon
                          :icon="detail"
                          size="20px"
                          color="#1989fa"
                          @click.prevent="InvoiceRecordsAction(record)"
                        />
                        <template #overlay>
                          <Menu>
                            <MenuItem
                              v-if="record.status == 6"
                              key="0"
                              @click="ReInvoicing(record)"
                            >
                              重新开票
                            </MenuItem>
                            <MenuItem
                              v-if="record.status == 6"
                              key="1"
                              @click="settingAside(record)"
                            >
                              作废
                            </MenuItem>
                            <MenuItem v-if="record.status == 3" key="2" @click="record.status = 5">
                              冲红
                            </MenuItem>
                            <MenuItem key="4" @click="showInvoiceDetails(record)">
                              开票详情
                            </MenuItem>
                            <MenuItem key="5" @click="showTransactionDetails(record)">
                              流水详情
                            </MenuItem>
                            <MenuItem key="6" @click="showBillingDetails(record)">
                              账单详情
                            </MenuItem>
                          </Menu>
                          <Menu v-if="record.status == 2">空</Menu>
                        </template>
                      </Dropdown>
                    </div>
                  </template>
                </Table>
              </div>
            </TabPane>
            <TabPane key="2" :tab="`待处理（${filteredData(1).length}）`">
              <div>
                <!--  total money -->
                <div class="flex items-center h-[40px] rounded-md bg-[#f5f5f5] px-[20px]">
                  <div class="font-bold">合计:</div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">金额(不含税)：</span>
                    <span>{{ totalAmount }}</span>
                    <span class="text-[#797979] pl-[20px]">|</span>
                  </div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">税额：</span>
                    <span>{{ totalTax }}</span>
                    <span class="text-[#797979] pl-[20px]">|</span>
                  </div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">价税合计：</span>
                    <span>{{ totalAmount + totalTax }}</span>
                  </div>
                </div>
                <!-- 表格 -->
                <Table
                  :dataSource="filteredData(1)"
                  :columns="config.InvoiceRecordsTable"
                  class="mt-[15px]"
                >
                  <template #status="{ record }">
                    <div>{{ Status[record.status.toString()] }}</div>
                  </template>
                  <template #action="{ record }">
                    <div class="flex items-center">
                      <Dropdown :trigger="['click']" class="px-[5px] mt-[2px]">
                        <Icon
                          :icon="detail"
                          size="20px"
                          color="#1989fa"
                          @click.prevent="InvoiceRecordsAction(record)"
                        />
                        <template #overlay>
                          <Menu>
                            <MenuItem
                              v-if="record.status == 6"
                              key="0"
                              @click="ReInvoicing(record)"
                            >
                              重新开票
                            </MenuItem>
                            <MenuItem
                              v-if="record.status == 6"
                              key="1"
                              @click="settingAside(record)"
                            >
                              作废
                            </MenuItem>
                            <MenuItem v-if="record.status == 3" key="2" @click="record.status = 5">
                              冲红
                            </MenuItem>
                            <MenuItem key="4" @click="showInvoiceDetails(record)">
                              开票详情
                            </MenuItem>
                            <MenuItem key="5" @click="showTransactionDetails(record)">
                              流水详情
                            </MenuItem>
                            <MenuItem key="6" @click="showBillingDetails(record)">
                              账单详情
                            </MenuItem>
                          </Menu>
                          <Menu v-if="record.status == 2">空</Menu>
                        </template>
                      </Dropdown>
                    </div>
                  </template>
                </Table>
              </div>
            </TabPane>
            <TabPane key="3" :tab="`开票中（${filteredData(2).length}）`">
              <div>
                <div>
                  <!--  total money -->
                  <div class="flex items-center h-[40px] rounded-md bg-[#f5f5f5] px-[20px]">
                    <div class="font-bold">合计:</div>
                    <div class="px-[10px]">
                      <span class="text-[#797979]">金额(不含税)：</span>
                      <span>{{ totalAmount }}</span>
                      <span class="text-[#797979] pl-[20px]">|</span>
                    </div>
                    <div class="px-[10px]">
                      <span class="text-[#797979]">税额：</span>
                      <span>{{ totalTax }}</span>
                      <span class="text-[#797979] pl-[20px]">|</span>
                    </div>
                    <div class="px-[10px]">
                      <span class="text-[#797979]">价税合计：</span>
                      <span>{{ totalAmount + totalTax }}</span>
                    </div>
                  </div>
                  <!-- 表格 -->
                  <Table
                    :dataSource="filteredData(2)"
                    :columns="config.InvoiceRecordsTable"
                    class="mt-[15px]"
                  >
                    <template #status="{ record }">
                      <div>{{ Status[record.status.toString()] }}</div>
                    </template>
                    <template #action="{ record }">
                      <div class="flex items-center">
                        <Dropdown :trigger="['click']" class="px-[5px] mt-[2px]">
                          <Icon
                            :icon="detail"
                            size="20px"
                            color="#1989fa"
                            @click.prevent="InvoiceRecordsAction(record)"
                          />
                          <template #overlay>
                            <Menu>
                              <MenuItem
                                v-if="record.status == 6"
                                key="0"
                                @click="ReInvoicing(record)"
                              >
                                重新开票
                              </MenuItem>
                              <MenuItem
                                v-if="record.status == 6"
                                key="1"
                                @click="settingAside(record)"
                              >
                                作废
                              </MenuItem>
                              <MenuItem
                                v-if="record.status == 3"
                                key="2"
                                @click="record.status = 5"
                              >
                                冲红
                              </MenuItem>
                              <MenuItem key="4" @click="showInvoiceDetails(record)">
                                开票详情
                              </MenuItem>
                              <MenuItem key="5" @click="showTransactionDetails(record)">
                                流水详情
                              </MenuItem>
                              <MenuItem key="6" @click="showBillingDetails(record)">
                                账单详情
                              </MenuItem>
                            </Menu>
                            <Menu v-if="record.status == 2">空</Menu>
                          </template>
                        </Dropdown>
                      </div>
                    </template>
                  </Table>
                </div>
              </div>
            </TabPane>
            <TabPane key="4" :tab="`已开票（${filteredData(3).length}）`">
              <div>
                <div>
                  <!--  total money -->
                  <div class="flex items-center h-[40px] rounded-md bg-[#f5f5f5] px-[20px]">
                    <div class="font-bold">合计:</div>
                    <div class="px-[10px]">
                      <span class="text-[#797979]">金额(不含税)：</span>
                      <span>{{ totalAmount }}</span>
                      <span class="text-[#797979] pl-[20px]">|</span>
                    </div>
                    <div class="px-[10px]">
                      <span class="text-[#797979]">税额：</span>
                      <span>{{ totalTax }}</span>
                      <span class="text-[#797979] pl-[20px]">|</span>
                    </div>
                    <div class="px-[10px]">
                      <span class="text-[#797979]">价税合计：</span>
                      <span>{{ totalAmount + totalTax }}</span>
                    </div>
                  </div>
                  <!-- 表格 -->
                  <Table
                    :dataSource="filteredData(3)"
                    :columns="config.InvoiceRecordsTable"
                    class="mt-[15px]"
                  >
                    <template #status="{ record }">
                      <div>{{ Status[record.status.toString()] }}</div>
                    </template>
                    <template #action="{ record }">
                      <div class="flex items-center">
                        <Dropdown :trigger="['click']" class="px-[5px] mt-[2px]">
                          <Icon
                            :icon="detail"
                            size="20px"
                            color="#1989fa"
                            @click.prevent="InvoiceRecordsAction(record)"
                          />
                          <template #overlay>
                            <Menu>
                              <MenuItem
                                v-if="record.status == 6"
                                key="0"
                                @click="ReInvoicing(record)"
                              >
                                重新开票
                              </MenuItem>
                              <MenuItem
                                v-if="record.status == 6"
                                key="1"
                                @click="settingAside(record)"
                              >
                                作废
                              </MenuItem>
                              <MenuItem
                                v-if="record.status == 3"
                                key="2"
                                @click="record.status = 5"
                              >
                                冲红
                              </MenuItem>
                              <MenuItem key="4" @click="showInvoiceDetails(record)">
                                开票详情
                              </MenuItem>
                              <MenuItem key="5" @click="showTransactionDetails(record)">
                                流水详情
                              </MenuItem>
                              <MenuItem key="6" @click="showBillingDetails(record)">
                                账单详情
                              </MenuItem>
                            </Menu>
                            <Menu v-if="record.status == 2">空</Menu>
                          </template>
                        </Dropdown>
                      </div>
                    </template>
                  </Table>
                </div>
              </div>
            </TabPane>
            <TabPane key="5" :tab="`已作废${filteredData(4).length}）`">
              <div>
                <!--  total money -->
                <div class="flex items-center h-[40px] rounded-md bg-[#f5f5f5] px-[20px]">
                  <div class="font-bold">合计:</div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">金额(不含税)：</span>
                    <span>{{ totalAmount }}</span>
                    <span class="text-[#797979] pl-[20px]">|</span>
                  </div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">税额：</span>
                    <span>{{ totalTax }}</span>
                    <span class="text-[#797979] pl-[20px]">|</span>
                  </div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">价税合计：</span>
                    <span>{{ totalAmount + totalTax }}</span>
                  </div>
                </div>
                <!-- 表格 -->
                <Table
                  :dataSource="filteredData(4)"
                  :columns="config.InvoiceRecordsTable"
                  class="mt-[15px]"
                >
                  <template #status="{ record }">
                    <div>{{ Status[record.status.toString()] }}</div>
                  </template>
                  <template #action="{ record }">
                    <div class="flex items-center">
                      <Dropdown :trigger="['click']" class="px-[5px] mt-[2px]">
                        <Icon
                          :icon="detail"
                          size="20px"
                          color="#1989fa"
                          @click.prevent="InvoiceRecordsAction(record)"
                        />
                        <template #overlay>
                          <Menu>
                            <MenuItem
                              v-if="record.status == 6"
                              key="0"
                              @click="ReInvoicing(record)"
                            >
                              重新开票
                            </MenuItem>
                            <MenuItem
                              v-if="record.status == 6"
                              key="1"
                              @click="settingAside(record)"
                            >
                              作废
                            </MenuItem>
                            <MenuItem v-if="record.status == 3" key="2" @click="record.status = 5">
                              冲红
                            </MenuItem>
                            <MenuItem key="4" @click="showInvoiceDetails(record)">
                              开票详情
                            </MenuItem>
                            <MenuItem key="5" @click="showTransactionDetails(record)">
                              流水详情
                            </MenuItem>
                            <MenuItem key="6" @click="showBillingDetails(record)">
                              账单详情
                            </MenuItem>
                          </Menu>
                          <Menu v-if="record.status == 2">空</Menu>
                        </template>
                      </Dropdown>
                    </div>
                  </template>
                </Table>
              </div>
            </TabPane>
            <TabPane key="6" :tab="`已冲红（${filteredData(5).length}）`">
              <div>
                <!--  total money -->
                <div class="flex items-center h-[40px] rounded-md bg-[#f5f5f5] px-[20px]">
                  <div class="font-bold">合计:</div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">金额(不含税)：</span>
                    <span>{{ totalAmount }}</span>
                    <span class="text-[#797979] pl-[20px]">|</span>
                  </div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">税额：</span>
                    <span>{{ totalTax }}</span>
                    <span class="text-[#797979] pl-[20px]">|</span>
                  </div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">价税合计：</span>
                    <span>{{ totalAmount + totalTax }}</span>
                  </div>
                </div>
                <!-- 表格 -->
                <Table
                  :dataSource="filteredData(5)"
                  :columns="config.InvoiceRecordsTable"
                  class="mt-[15px]"
                >
                  <template #status="{ record }">
                    <div>{{ Status[record.status.toString()] }}</div>
                  </template>
                  <template #action="{ record }">
                    <div class="flex items-center">
                      <Dropdown :trigger="['click']" class="px-[5px] mt-[2px]">
                        <Icon
                          :icon="detail"
                          size="20px"
                          color="#1989fa"
                          @click.prevent="InvoiceRecordsAction(record)"
                        />
                        <template #overlay>
                          <Menu>
                            <MenuItem
                              v-if="record.status == 6"
                              key="0"
                              @click="ReInvoicing(record)"
                            >
                              重新开票
                            </MenuItem>
                            <MenuItem
                              v-if="record.status == 6"
                              key="1"
                              @click="settingAside(record)"
                            >
                              作废
                            </MenuItem>
                            <MenuItem v-if="record.status == 3" key="2" @click="record.status = 5">
                              冲红
                            </MenuItem>
                            <MenuItem key="4" @click="showInvoiceDetails(record)">
                              开票详情
                            </MenuItem>
                            <MenuItem key="5" @click="showTransactionDetails(record)">
                              流水详情
                            </MenuItem>
                            <MenuItem key="6" @click="showBillingDetails(record)">
                              账单详情
                            </MenuItem>
                          </Menu>
                          <Menu v-if="record.status == 2">空</Menu>
                        </template>
                      </Dropdown>
                    </div>
                  </template>
                </Table>
              </div>
            </TabPane>
            <TabPane key="7" :tab="`开票失败（${filteredData(6).length}）`">
              <div>
                <!--  total money -->
                <div class="flex items-center h-[40px] rounded-md bg-[#f5f5f5] px-[20px]">
                  <div class="font-bold">合计:</div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">金额(不含税)：</span>
                    <span>{{ totalAmount }}</span>
                    <span class="text-[#797979] pl-[20px]">|</span>
                  </div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">税额：</span>
                    <span>{{ totalTax }}</span>
                    <span class="text-[#797979] pl-[20px]">|</span>
                  </div>
                  <div class="px-[10px]">
                    <span class="text-[#797979]">价税合计：</span>
                    <span>{{ totalAmount + totalTax }}</span>
                  </div>
                </div>
                <!-- 表格 -->
                <Table
                  :dataSource="filteredData(6)"
                  :columns="config.InvoiceRecordsTable"
                  class="mt-[15px]"
                >
                  <template #status="{ record }">
                    <div>{{ Status[record.status.toString()] }}</div>
                  </template>
                  <template #action="{ record }">
                    <div class="flex items-center">
                      <Dropdown :trigger="['click']" class="px-[5px] mt-[2px]">
                        <Icon
                          :icon="detail"
                          size="20px"
                          color="#1989fa"
                          @click.prevent="InvoiceRecordsAction(record)"
                        />
                        <template #overlay>
                          <Menu>
                            <MenuItem
                              v-if="record.status == 6"
                              key="0"
                              @click="ReInvoicing(record)"
                            >
                              重新开票
                            </MenuItem>
                            <MenuItem
                              v-if="record.status == 6"
                              key="1"
                              @click="settingAside(record)"
                            >
                              作废
                            </MenuItem>
                            <MenuItem v-if="record.status == 3" key="2" @click="record.status = 5">
                              冲红
                            </MenuItem>
                            <MenuItem key="4" @click="showInvoiceDetails(record)">
                              开票详情
                            </MenuItem>
                            <MenuItem key="5" @click="showTransactionDetails(record)">
                              流水详情
                            </MenuItem>
                            <MenuItem key="6" @click="showBillingDetails(record)">
                              账单详情
                            </MenuItem>
                          </Menu>
                          <Menu v-if="record.status == 2">空</Menu>
                        </template>
                      </Dropdown>
                    </div>
                  </template>
                </Table>
              </div>
            </TabPane>
            <template #tabBarExtraContent>
              <div class="flex items-center">
                <Input
                  placeholder="房源编号/房源地址/房间号/租客姓名/租客电话/购方名称/购房税号"
                  class="!w-[400px]"
                  v-model:value="searchQuery"
                />
                <Icon icon="material-symbols:download-sharp" size="30px" color="#1989fa" />
              </div>
            </template>
          </Tabs>
        </TabPane>

        <!-- 销项设置tab页面 -->
        <TabPane key="8" tab="销项设置">
          <Table
            :dataSource="OutputSettingsInfoTable"
            :columns="config.OutputSettingsInfoTable"
            class="mt-[15px]"
          >
            <template #action="{ record }">
              <div class="flex items-center">
                <Dropdown :trigger="['click']" placement="bottomCenter" class="px-[5px] mt-[2px]">
                  <Icon
                    :icon="detail"
                    size="20px"
                    color="#1989fa"
                    @click.prevent="OutPutSetAction(record)"
                  />
                  <template #overlay>
                    <Menu>
                      <MenuItem key="0"> 基本信息 </MenuItem>
                      <MenuItem key="1"> 商品信息 </MenuItem>
                      <MenuItem key="2"> 智能决策 </MenuItem>
                      <MenuItem key="4"> 解绑 </MenuItem>
                      <MenuItem key="5"> 关联 </MenuItem>
                      <MenuItem key="6"> 添加商品 </MenuItem>
                      <MenuItem key="7"> 禁用 </MenuItem>
                    </Menu>
                  </template>
                </Dropdown>
              </div>
            </template>
          </Table>
        </TabPane>
      </Tabs>
    </div>

    <!-- 开票记录页面弹窗 -->
    <div>
      <!-- 开票详情弹窗 -->
      <Modal
        :visible="invoiceDetailsModal"
        title="开票详情"
        @cancel="handleCancel"
        width="800px"
        :footer="null"
      >
        <div class="w-[100%] h-[40px] flex items-center bg-[#e6f3fe] px-[10px]">
          <div class="text-[#a3a8ac] px-[10px]">
            房源地址: 武汉市东湖高新软件新城1.1期E区A11栋-715室
          </div>
          <Icon icon="ep:search" color="#1989fa" size="12px" />
        </div>

        <!-- 顶部标题部分 -->
        <div class="w-[100%] p-[20px] flex">
          <!-- 顶部信息 left 部分 -->
          <div
            class="flex items-center w-[25%] h-[50px] border-dashed border-[#e6e6e6] border-r-[1px] mr-[20px]"
          >
            <div class="flex items-center w-[150px]">
              <div
                class="w-[35px] h-[35px] bg-[#f1f1f1] flex items-center justify-center rounded-[50%] mr-[10px]"
              >
                <Icon icon="ri:money-cny-box-fill" size="20px" color="#777777" />
              </div>
              <div class="flex flex-col justify-between h-[35px]">
                <div class="text-[13px] text-[#a3a8ac]">当前状态</div>
                <div class="text-[13px]">{{ Status[InvoiceDetails.status] }}</div>
              </div>
            </div>
          </div>

          <!-- 顶部信息 right 部分 -->
          <div class="flex items-center justify-around w-[75%]">
            <div class="flex items-center w-[32%]">
              <div
                class="w-[30px] h-[30px] bg-[#f1f1f1] flex items-center justify-center rounded-[50%] mr-[10px]"
              >
                <Icon icon="mdi:person-tie" size="16px" color="#1989fa" />
              </div>
              <div class="flex flex-col justify-between h-[35px]">
                <div class="text-[13px] text-[#a3a8ac]">申请方</div>
                <div class="text-[13px]">
                  {{ InvoiceDetails.applicant }}-{{ InvoiceDetails.buyer_tax_num }}
                </div>
              </div>
            </div>
            <div class="flex items-center w-[32%]">
              <div
                class="w-[30px] h-[30px] bg-[#fff5eb] flex items-center justify-center rounded-[50%] mr-[10px]"
              >
                <Icon icon="arcticons:authenticator-pro" size="16px" color="#ffa036" />
              </div>
              <div class="flex flex-col justify-between h-[35px]">
                <div class="text-[13px] text-[#a3a8ac]">申请平台</div>
                <div class="text-[13px]">{{ InvoiceDetails.application_portal }}</div>
              </div>
            </div>
            <div class="flex items-center w-[32%]">
              <div
                class="w-[30px] h-[30px] bg-[#e5f9f2] flex items-center justify-center rounded-[50%] mr-[10px]"
              >
                <Icon icon="subway:calendar-3" size="16px" color="#4ad6a6" />
              </div>
              <div class="flex flex-col justify-between h-[35px]">
                <div class="text-[13px] text-[#a3a8ac]">申请日期</div>
                <div class="text-[13px]">{{ InvoiceDetails.apply_time }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 申请信息部分 -->
        <div class="px-[20px]">
          <Tabs>
            <TabPane key="1">
              <template #tab>
                <span>
                  <Icon icon="tabler:report-money" />
                  申请信息
                </span>
              </template>
              <!-- 开票商品信息 -->
              <div>
                <div class="text-[16px] mb-[10px]">开票商品信息</div>
                <table width="100%" :border="1" cellpadding="5" cellspacing="0" class="tableStyle">
                  <tbody>
                    <tr>
                      <td v-for="item in config.InvoiceProductInformationTbale" :key="item.title"
                        >{{ item.title }}
                      </td>
                    </tr>
                    <tr>
                      <td>房屋租金 / 公寓楼租金</td>
                      <td>-</td><td>-</td><td>-</td><td>-</td>
                      <td
                        >{{
                          (
                            (InvoiceDetails.invoice_tax / InvoiceDetails.invoice_amount) *
                            100
                          ).toFixed(2)
                        }}%</td
                      >
                      <td>{{ InvoiceDetails.invoice_amount }}</td>
                      <td>{{ InvoiceDetails.invoice_tax }}</td>
                      <td>
                        {{
                          Number(InvoiceDetails.invoice_amount) + Number(InvoiceDetails.invoice_tax)
                        }}
                      </td>
                      <td class="text-center"><a>查看</a></td>
                    </tr>
                    <tr class="bg-[#fff9f3] text-[#ffc07b]">
                      <td colspan="6" align="center">合计</td>
                      <td>{{ InvoiceDetails.invoice_amount }}</td>
                      <td>{{ InvoiceDetails.invoice_tax }}</td>
                      <td>{{
                        Number(InvoiceDetails.invoice_amount) + Number(InvoiceDetails.invoice_tax)
                      }}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 购买方/发票抬头信息 -->
              <div>
                <div class="text-[16px] mt-[20px]">购买方/发票抬头信息</div>
                <div class="flex flex-wrap">
                  <div v-for="item in buyerInfo" :key="item.title" class="w-[25%] mt-[15px]">
                    <div class="text-[#a3a8ac] mb-[4px]">{{ item.title }}</div>
                    <div>{{ item.content }}</div>
                  </div>
                </div>
                <div>
                  <div class="text-[#a3a8ac] mt-[10px]">备注</div>
                  <div class="mt-[5px] ml-[5px]">
                    <div>武汉市东湖高新软件新城1.1期E区A11栋-715室</div>
                    <div>2022年10月-2023年四月 {{ InvoiceDetails.applicant }}</div>
                  </div>
                </div>
              </div>
              <!-- 申请方信息 -->
              <div>
                <div class="text-[16px] mt-[20px]">申请方信息</div>
                <div class="flex flex-wrap justify-between">
                  <div v-for="item in applyInfo" :key="item.title" class="w-[25%] mt-[15px]">
                    <div class="text-[#a3a8ac] mb-[4px]">{{ item.title }}</div>
                    <div>{{ item.content }}</div>
                  </div>
                </div>
              </div>
              <!-- 发票信息 -->
              <div>
                <div class="text-[16px] mt-[20px] mb-[10px]">发票信息</div>
                <table width="100%" :border="1" cellpadding="5" cellspacing="0" class="tableStyle">
                  <tbody>
                    <tr>
                      <td
                        v-for="item in config.InvoiceInfoTable"
                        :key="item.title"
                        class="first:text-center"
                      >
                        {{ item.title }}
                      </td>
                    </tr>
                    <tr v-for="(item, index) in invoiceProductInfo" :key="index">
                      <td align="center">{{ index + 1 }}</td>
                      <td>{{ item.invoiceDate }}</td>
                      <td>{{ item.invoiceType }}</td>
                      <td>{{ item.invoiceCode }}</td>
                      <td>{{ item.invoiceNumber }}</td>
                      <td>{{ item.invoicePerson }}</td>
                      <td>{{ item.invoiceTax }}</td>
                      <td align="center"><a>查看PDF</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 所属门店 -->
              <div class="my-[20px]">
                <div class="text-[16px]">所属门店</div>
                <div class="w-[25%] mt-[15px]">
                  <div class="text-[#a3a8ac] mb-[4px]">所属门店</div>
                  <div>软件新城公寓</div>
                </div>
              </div>
            </TabPane>
            <template #tabBarExtraContent>
              <div class="flex items-center">
                <Icon icon="lsicon:view-outline" color="#1989fa" />
                <div class="text-[#1989fa]">查看关联账单</div>
              </div>
            </template>
          </Tabs>
        </div>
        <!-- 底部结尾信息 -->
        <div class="flex items-center h-[40px] border-dashed border-t-[1px] text-[#a3a8ac]">
          <div class="h-[20px] border-dashed border-r-[1px] px-[20px]">
            {{ InvoiceDetails.invoice_create_person }}
            创建于
            {{ InvoiceDetails.invoice_create_time }}
          </div>
          <div class="h-[20px] px-[20px]">
            {{ InvoiceDetails.invoice_create_person }}
            更新于
            {{ InvoiceDetails.invoice_update_time }}
          </div>
        </div>
      </Modal>

      <!-- 流水详情弹窗 -->
      <Modal
        :visible="transactionDetailsModal"
        title="流水详情"
        :footer="null"
        width="900px"
        @cancel="handleCancel"
      >
        <div class="w-[100%] h-[40px] flex items-center bg-[#e6f3fe] px-[10px]">
          <div class="text-[#a3a8ac] px-[10px]">
            房源地址: 武汉市东湖高新软件新城1.1期E区A11栋-715室
          </div>
          <Icon icon="ep:search" color="#1989fa" size="12px" />
        </div>

        <!-- 顶部标题部分 -->
        <div class="w-[100%] p-[20px] flex">
          <!-- 顶部信息 left 部分 -->
          <div
            class="flex items-center w-[25%] h-[50px] border-dashed border-[#e6e6e6] border-r-[1px] mr-[20px]"
          >
            <div class="flex items-center w-[150px]">
              <div
                class="w-[35px] h-[35px] bg-[#f1f1f1] flex items-center justify-center rounded-[50%] mr-[10px]"
              >
                <Icon icon="bx:money-withdraw" size="20px" color="#777777" />
              </div>
              <div class="flex flex-col justify-between h-[35px]">
                <div class="text-[13px] text-[#a3a8ac]">当前状态</div>
                <div class="text-[13px]">{{ Status[InvoiceDetails.status] }}</div>
              </div>
            </div>
          </div>

          <!-- 顶部信息 right 部分 -->
          <div class="flex items-center justify-around w-[75%]">
            <div class="flex items-center w-[25%]">
              <div
                class="w-[30px] h-[30px] bg-[#f1f1f1] flex items-center justify-center rounded-[50%] mr-[10px]"
              >
                <Icon icon="mdi:person-tie" size="16px" color="#1989fa" />
              </div>
              <div class="flex flex-col justify-between h-[35px]">
                <div class="text-[13px] text-[#a3a8ac]">付款人信息</div>
                <div class="text-[13px]">
                  {{ TransactionDetails.payer_name }}-{{ TransactionDetails.payer_phone }}
                </div>
              </div>
            </div>
            <div class="flex items-center w-[25%]">
              <div
                class="w-[30px] h-[30px] bg-[#fff5eb] flex items-center justify-center rounded-[50%] mr-[10px]"
              >
                <Icon icon="healthicons:money-bag-outline" size="16px" color="#ffa036" />
              </div>
              <div class="flex flex-col justify-between h-[35px]">
                <div class="text-[13px] text-[#a3a8ac]">收款金额</div>
                <div class="text-[13px]">
                  {{ TransactionDetails.tax_total - TransactionDetails.serve_charge }}
                </div>
              </div>
            </div>
            <div class="flex items-center w-[25%]">
              <div
                class="w-[30px] h-[30px] bg-[#fff5eb] flex items-center justify-center rounded-[50%] mr-[10px]"
              >
                <Icon icon="arcticons:authenticator-pro" size="16px" color="#ffa036" />
              </div>
              <div class="flex flex-col justify-between h-[35px]">
                <div class="text-[13px] text-[#a3a8ac]">费用摘要</div>
                <div class="text-[13px] w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {{ TransactionDetails.cost_summary }}
                </div>
              </div>
            </div>
            <div class="flex items-center w-[25%]">
              <div
                class="w-[30px] h-[30px] bg-[#e5f9f2] flex items-center justify-center rounded-[50%] mr-[10px]"
              >
                <Icon icon="subway:calendar-3" size="16px" color="#4ad6a6" />
              </div>
              <div class="flex flex-col justify-between h-[35px]">
                <div class="text-[13px] text-[#a3a8ac]">实际收款时间</div>
                <div class="text-[13px]">{{ TransactionDetails.receive_time }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 支付详情部分 -->
        <div class="px-[20px]">
          <Tabs>
            <TabPane key="1">
              <template #tab>
                <span>
                  <Icon icon="iconoir:page-edit" />
                  支付详情
                </span>
              </template>
              <!-- 付款人信息 -->
              <div>
                <div class="flex flex-wrap">
                  <div v-for="item in payerInfo" :key="item.title" class="w-[25%] mt-[10px]">
                    <div class="text-[#a3a8ac] mt-[10px]">{{ item.title }}</div>
                    <div v-html="item.content"></div>
                  </div>
                </div>
                <div>
                  <div class="text-[#a3a8ac] my-[10px]">支付备注</div>
                  <div class="mt-[5px]">
                    <div>{{ TransactionDetails.payment_remark }}</div>
                  </div>
                </div>
                <div>
                  <div class="text-[#a3a8ac] my-[10px]">支付凭证</div>
                  <div class="mt-[5px]">
                    <div>无</div>
                  </div>
                </div>
              </div>
              <!-- 流水明细 -->
              <div class="w-[100%]">
                <div class="my-[10px]">
                  <span class="text-[#1989fa]">|</span>
                  <span class="font-bold px-[10px]">流水明细</span>
                </div>
                <table class="tableStyle" cellpadding="10">
                  <tbody>
                    <tr>
                      <td>费用科目</td>
                      <td>金额</td>
                      <td>费用周期</td>
                    </tr>
                    <tr>
                      <td>房屋租金</td>
                      <td>
                        <span class="text-[green] pr-[10px]">+</span>
                        <span>{{ TransactionDetails.tax_total }}元</span>
                      </td>
                      <td>
                        {{ TransactionDetails.cost_cycle_first }}
                        -
                        {{ TransactionDetails.cost_cycle_last }}
                      </td>
                    </tr>
                    <tr>
                      <td>房屋押金</td>
                      <td>
                        <span>0元</span>
                      </td>
                      <td>
                        {{ TransactionDetails.cost_cycle_first }}
                        -
                        {{ TransactionDetails.cost_cycle_last }}
                      </td>
                    </tr>
                    <tr>
                      <td>支付手续费</td>
                      <td>
                        <span class="text-[red] pr-[10px]">-</span>
                        <span>{{ TransactionDetails.serve_charge }}元</span>
                      </td>
                      <td>
                        {{ TransactionDetails.cost_cycle_first }}
                        -
                        {{ TransactionDetails.cost_cycle_last }}
                      </td>
                    </tr>
                    <tr>
                      <td class="font-bold">费用合计</td>
                      <td colspan="2" class="text-[#1989fa]">
                        {{ TransactionDetails.tax_total - TransactionDetails.serve_charge }}元
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabPane>
            <template #tabBarExtraContent>
              <div class="flex items-center">
                <Icon icon="vaadin:paperplane-o" color="#1989fa" />
                <div class="text-[#1989fa] pr-[20px] pl-[10px]">申请开票</div>
                <Icon icon="ant-design:stop-outlined" color="#1989fa" />
                <div class="text-[#1989fa] pr-[20px] pl-[10px]">作废</div>
                <Icon icon="icon-park-outline:lock" color="#1989fa" />
                <div class="text-[#1989fa] pr-[20px] pl-[10px]">锁票</div>
                <Icon icon="icon-park-outline:more-app" color="#1989fa" />
                <div class="text-[#1989fa] pr-[20px] pl-[10px]">更多</div>
              </div>
            </template>
          </Tabs>
        </div>
        <!-- 底部结尾信息 -->
        <div class="flex items-center h-[40px] border-dashed border-t-[1px] text-[#a3a8ac]">
          <div class="h-[20px] border-dashed border-r-[1px] px-[20px]">
            {{ TransactionDetails.flot_create_person }}
            创建于
            {{ TransactionDetails.flot_create_time }}
          </div>
          <div class="h-[20px] px-[20px]">
            {{ TransactionDetails.flot_create_person }}
            更新于
            {{ TransactionDetails.flot_update_time }}
          </div>
        </div>
      </Modal>

      <!-- 账单详情弹窗 -->
      <Modal :visible="billingDetailsModal" title="账单详情" :footer="null" @cancel="handleCancel">
        <div>111111</div>
      </Modal>

      <!-- 添加开票主体 -->
      <Modal :visible="addInvoiceSubjectModal" width="600px" @cancel="handleCancel" @ok="handleOk">
        <Card title="添加销项/开票主体信息" :bordered="false" style="width: 100%" class="mx-[10px]">
          <Form
            title="企业信息"
            :model="formState"
            name="basic"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <FormItem
              label="企业名称"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
            >
              <Input v-model:value="formState.username" />
            </FormItem>
          </Form>
        </Card>
      </Modal>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import {
    Tabs,
    TabPane,
    Button,
    Input,
    Table,
    Dropdown,
    Menu,
    MenuItem,
    Modal,
    Card,
    Form,
    FormItem,
  } from 'ant-design-vue';
  import { ref, reactive, createVNode, computed, watchEffect } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Icon } from '/@/components/Icon';
  import config from './config';
  import { getFinancialManagementISdata } from '/@/api/financial-management';
  import { Status } from '/@/api/financial-management/model/financial-management';
  import type {
    invoicingRecordsResult,
    OutputSettingsResult,
  } from '/@/api/financial-management/model/financial-management';
  const activeKey = ref('1');
  const searchQuery = ref('');
  // 开票记录表格数据
  const InvoiceRecordsTable = ref<invoicingRecordsResult>([]);
  // 销项设置数据
  const OutputSettingsInfoTable = ref<OutputSettingsResult>([]);
  const detail = ref('system-uicons:menu-vertical');
  // 弹窗显示控制
  const invoiceDetailsModal = ref<boolean>(false);
  const transactionDetailsModal = ref<boolean>(false);
  const billingDetailsModal = ref<boolean>(false);
  const addInvoiceSubjectModal = ref<boolean>(false);

  // 开票记录数据
  const InvoiceDetails = ref({
    id: 1,
    status: 1,
    buyer_type: '',
    buyer_name: '',
    applicant: '',
    buyer_tax_num: 1,
    application_portal: '',
    apply_time: '',
    apply_phone: '',
    invoice_amount: 1,
    invoice_tax: 1,
    delivery_email: '',
    delivery_phone: 1,
    apply_date: '',
    invoice_code: 1,
    invoice_number: 1,
    invoice_person: '',
    invoice_phone: 1,
    invoice_date: '',
    invoice_type: '',
    invoice_create_person: '',
    invoice_create_time: '',
    invoice_update_time: '',
  });
  // 关联流水数据
  const TransactionDetails = ref({
    payer_name: '',
    payer_phone: 1,
    payer_account: 1,
    tax_total: 1,
    receive_time: '',
    payment_method: '',
    cost_summary: '',
    payment_person: '',
    payment_person_type: '',
    transaction_serial_num: 1,
    action_time: '',
    payment_remark: '',
    cost_cycle_first: '',
    cost_cycle_last: '',
    serve_charge: 1,
    flot_create_time: '',
    flot_update_time: '',
    flot_create_person: '',
  });
  // 账单数据
  const BillingDetails = ref([]);
  // 购买方信息
  const buyerInfo = ref();
  // 申请方信息
  const applyInfo = ref();
  // 发票信息
  const invoiceProductInfo = ref();

  // 付款人信息
  const payerInfo = ref();
  watchEffect(() => {
    buyerInfo.value = [
      {
        title: '购房类型',
        content: InvoiceDetails.value.buyer_type,
      },
      {
        title: '购方名称',
        content: InvoiceDetails.value.buyer_name,
      },
      {
        title: '购方税号',
        content: InvoiceDetails.value.buyer_tax_num,
      },
      {
        title: '购方地址',
        content: '-',
      },
      {
        title: '购方电话',
        content: '-',
      },
      {
        title: '购房开户行名称',
        content: '-',
      },
      {
        title: '购方开户行账号',
        content: '-',
      },
    ];
    applyInfo.value = [
      {
        title: '交付邮箱',
        content: InvoiceDetails.value.delivery_email,
      },
      {
        title: '交付手机号',
        content: InvoiceDetails.value.delivery_phone,
      },
      {
        title: '申请日期',
        content: InvoiceDetails.value.apply_time,
      },
    ];
    invoiceProductInfo.value = [
      {
        invoiceDate: InvoiceDetails.value.invoice_date,
        invoiceType: InvoiceDetails.value.invoice_type,
        invoiceCode: InvoiceDetails.value.invoice_code,
        invoiceNumber: InvoiceDetails.value.invoice_number,
        invoicePerson: '-',
        invoiceTax:
          Number(InvoiceDetails.value.invoice_amount) + Number(InvoiceDetails.value.invoice_tax),
      },
      {
        invoiceDate: InvoiceDetails.value.invoice_date,
        invoiceType: InvoiceDetails.value.invoice_type,
        invoiceCode: InvoiceDetails.value.invoice_code,
        invoiceNumber: InvoiceDetails.value.invoice_number,
        invoicePerson: `${InvoiceDetails.value.invoice_person} - ${InvoiceDetails.value.invoice_phone}`,
        invoiceTax:
          Number(InvoiceDetails.value.invoice_amount) + Number(InvoiceDetails.value.invoice_tax),
      },
    ];
    payerInfo.value = [
      {
        title: '付款人姓名',
        content: TransactionDetails.value.payer_name,
      },
      {
        title: '付款人电话',
        content: TransactionDetails.value.payer_phone,
      },
      {
        title: '付款人账号',
        content: TransactionDetails.value.payer_account,
      },
      {
        title: '收款金额',
        content: TransactionDetails.value.tax_total - TransactionDetails.value.serve_charge,
      },
      {
        title: '收款途径',
        content: TransactionDetails.value.payment_method,
      },
      {
        title: '费用摘要',
        content: TransactionDetails.value.cost_summary,
      },
      {
        title: '收款确认人',
        content: `${TransactionDetails.value.payment_person}<span style="color:orange;">(${TransactionDetails.value.payment_person_type})</span>`,
      },
      {
        title: '实际收款时间',
        content: TransactionDetails.value.receive_time,
      },
      {
        title: '交易流水号',
        content: TransactionDetails.value.transaction_serial_num,
      },
      {
        title: '操作时间',
        content: TransactionDetails.value.action_time,
      },
    ];
  });

  // 右上角 × 关闭弹窗
  const handleCancel = () => {
    invoiceDetailsModal.value = false;
    transactionDetailsModal.value = false;
    billingDetailsModal.value = false;
    addInvoiceSubjectModal.value = false;
  };
  // 底部 确认事件
  const handleOk = () => {
    addInvoiceSubjectModal.value = false;
  };
  // 查看详情 弹窗设置及相应的数据
  const showInvoiceDetails = (e) => {
    invoiceDetailsModal.value = true;
    InvoiceDetails.value = e;
  };
  // 查看关联流水 弹窗设置及相应的数据
  const showTransactionDetails = (e) => {
    transactionDetailsModal.value = true;
    TransactionDetails.value = e;
  };
  // 查看关联账单 弹窗设置及相应的数据
  const showBillingDetails = (e) => {
    billingDetailsModal.value = true;
    BillingDetails.value = e;
  };
  // 添加开票主体 弹窗设置及相应的数据
  const showAddInvoiceSubjectModal = () => {
    addInvoiceSubjectModal.value = true;
  };
  interface FormState {
    username: string;
  }

  const formState = reactive<FormState>({
    username: '',
  });
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // 获取数据
  getFinancialManagementISdata().then((res) => {
    InvoiceRecordsTable.value = res.invoicingRecords;
    OutputSettingsInfoTable.value = res.outputSettingsInfo;
  });

  // 开票记录点击操作按钮事件
  const InvoiceRecordsAction = function (e) {
    console.log(e);
  };
  // 销项设置点击操作按钮事件
  const OutPutSetAction = function (e) {
    console.log(e);
  };
  // 作废弹窗
  const settingAside = (e) => {
    console.log(e);
    Modal.confirm({
      title: () => '确定要作废该开票信息吗?',
      icon: () => createVNode(ExclamationCircleOutlined),
      content: () => '作废后,不支持恢复,请确认',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        })
          .then(() => {
            const index = InvoiceRecordsTable.value.findIndex((item) => item.id === e.id);
            if (index !== -1) {
              InvoiceRecordsTable.value.splice(index, 1);
            }
          })
          .catch(() => console.log('Oops errors!'));
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onCancel() {},
    });
  };
  // 重新开票弹窗
  const ReInvoicing = function (e) {
    console.log(e);
    Modal.confirm({
      title: () => '确定要重新提交开票申请吗?',
      icon: () => createVNode(ExclamationCircleOutlined),
      content: () => '重新提交开票暂不支持编辑开票信息，提交后将无需确认，直接进入开票流程，请知晓',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onCancel() {},
    });
  };
  // 计算金额(不含税)
  const totalAmount = computed(() => {
    return InvoiceRecordsTable.value.reduce((sum, record) => {
      return sum + record.invoice_amount;
    }, 0);
  });
  // 计算税额
  const totalTax = computed(() => {
    return InvoiceRecordsTable.value.reduce((sum, record) => {
      return sum + record.invoice_tax;
    }, 0);
  });
  // 分类实现
  const filteredData = (statusNum) => {
    return InvoiceRecordsTable.value.filter((item) => item.status === statusNum);
  };
  // 搜索功能实现
  const filteredInvoiceRecordsTable = computed(() => {
    if (!searchQuery.value) {
      return InvoiceRecordsTable.value;
    }
    return InvoiceRecordsTable.value.filter((record) => {
      const searchStr = searchQuery.value.toLowerCase();
      return (
        record.applicant.toLowerCase().includes(searchStr) ||
        record.buyer_name.toLowerCase().includes(searchStr) ||
        record.buyer_tax_num.toString().toLowerCase().includes(searchStr) ||
        Status[record.status.toString()].toLowerCase().includes(searchStr)
      );
    });
  });
</script>
<style>
  .ant-modal-title,
  .ant-tabs-nav,
  .ant-tabs-tab-active,
  .ant-tabs-ink-bar {
    color: #1989fa !important;
  }
  .tableStyle {
    border: 1px solid #e5e7eb;
    font-size: 14px;
    width: 100%;
  }
  .tableStyle tr:nth-child(1) {
    background: #f5f7ff;
    font-weight: bold;
  }
  .tableStyle tr {
    border-bottom: 1px solid #e5e7eb;
    font-size: 12px;
  }
  .tableStyle td {
    border-right: 1px solid #e5e7eb;
  }
</style>
