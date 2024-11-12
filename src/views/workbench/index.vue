<template>
  <div class="mx-[5px]">
    <div class="float-left w-[100%] lg:w-[75%]">
      <div class="md:h-[160px] flex flex-col md:flex-row">
        <div class="bgWhite md:w-[50%]">
          <div class="fontStyle">常用功能</div>
          <div class="flex justify-around content w-[100%]">
            <div
              v-for="item in oftenUseFun"
              :key="item.title"
              class="flex flex-col items-center justify-center size-[80px]"
            >
              <div
                style="
                  background: linear-gradient(
                    90deg,
                    rgb(194, 233, 251) 0%,
                    rgb(167, 203, 253) 0%,
                    rgb(91, 151, 248) 100%
                  );
                  width: 50px;
                  height: 50px;
                  border-radius: 8.5px;
                  color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-bottom: 5px;
                "
              >
                <Icon :icon="item.icon" size="30px" />
              </div>
              <div class="text-[12px]">{{ item.title }}</div>
            </div>
          </div>
        </div>
        <div class="bgWhite md:w-[50%]">
          <div class="fontStyle">审批管理</div>
          <div class="content flex flex-wrap justify-between mt-[15px] w-[100%]">
            <div class="flex flex-col items-center justify-center size-[70px]">
              <div class="font-bold">{{ WorkbenchData.auditManagement.pendingApproval }}</div>
              <div>待我审批</div>
            </div>
            <div class="flex flex-col items-center justify-center size-[70px]">
              <div class="font-bold">{{ WorkbenchData.auditManagement.initiatedByMe }}</div>
              <div>我发起的</div>
            </div>
            <div class="flex flex-col items-center justify-center size-[70px]">
              <div class="font-bold">{{ WorkbenchData.auditManagement.copyMe }}</div>
              <div>抄送我的</div>
            </div>
          </div>
        </div>
      </div>
      <div class="md:h-[240px] flex flex-col md:flex-row">
        <div class="bgWhite md:w-[50%]">
          <div class="fontStyle">合约管理</div>
          <div class="content w-[100%]">
            <div class="flex items-center my-[30px]">
              <span class="font-bold pr-[5px]">租借合同</span>
              <span class="text-[20px] text-[#1989fa] font-bold px-[10px]">{{
                WorkbenchData.contractManagement.tobeSigned +
                WorkbenchData.contractManagement.inRent +
                WorkbenchData.contractManagement.movingOutSoon +
                WorkbenchData.contractManagement.expired
              }}</span>
              (份)
            </div>
            <div
              class="flex justify-around items-center flex-wrap h-[40px] leading-[40px] mt-[20px]"
            >
              <div
                >待签字<span>({{ WorkbenchData.contractManagement.tobeSigned }})</span></div
              >
              <div
                >在租中<span>({{ WorkbenchData.contractManagement.inRent }})</span></div
              >
              <div
                >即将搬出<span>({{ WorkbenchData.contractManagement.movingOutSoon }})</span></div
              >
              <div
                >已到期<span>({{ WorkbenchData.contractManagement.expired }})</span></div
              >
            </div>
          </div>
        </div>
        <div class="bgWhite md:w-[50%]">
          <div class="fontStyle">租前</div>
          <div class="content flex justify-around flex-wrap h-[180px] w-[100%]">
            <div
              class="flex md:flex-col flex-row-reverse items-center justify-around w-[40%] h-[40px]"
            >
              <div class="font-bold">{{ WorkbenchData.preRental.tobecheckedin }}</div>
              <div>待入住</div>
            </div>
            <div
              class="flex md:flex-col flex-row-reverse items-center justify-around w-[40%] h-[40px]"
            >
              <div class="font-bold">{{ WorkbenchData.preRental.bookToday }}</div>
              <div>今日预定</div>
            </div>
            <div
              class="flex md:flex-col flex-row-reverse items-center justify-around w-[40%] h-[40px]"
            >
              <div class="font-bold">{{ WorkbenchData.preRental.bookWeek }}</div>
              <div>本周预定</div>
            </div>
            <div
              class="flex md:flex-col flex-row-reverse items-center justify-around w-[40%] h-[40px]"
            >
              <div class="font-bold">{{ WorkbenchData.preRental.bookMonth }}</div>
              <div>本月预定</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bgWhite">
        <div class="fontStyle">房源管理</div>
        <div class="w-[100%] justify-center content">
          <div class="flex flex-wrap justify-between">
            <div
              v-for="(item, index) in WorkbenchData.listingManagement"
              :key="index"
              class="md:w-[50%] 2xl:w-[32%] px-[10px] mt-[12px] w-[100%]"
            >
              <div class="w-[100%] text-[13px] font-bold flex items-center">
                <span class="pr-[10px]"
                  >{{ item.name }}({{ item.suit + '套' }}, {{ item.room + '间' }})</span
                >
                <span>
                  出租率：{{
                    (
                      ((item.rented + item.expirationInSoon + item.movingInSoon) / item.suit) *
                      100
                    ).toFixed(2)
                  }}%
                </span>
                <span>
                  <Icon icon="iconamoon:attention-circle" />
                </span>
              </div>
              <div
                class="flex content-around justify-around flex-wrap h-[200px] bg-[#f5f5f5] mt-[15px] rounded-[5px]"
              >
                <div class="listingManagement">
                  <div class="listFontStyle">{{ item.vacant }}</div>
                  <div>空置</div>
                </div>
                <div class="listingManagement">
                  <div class="listFontStyle">{{ item.config }}</div>
                  <div>配置</div>
                </div>
                <div class="listingManagement">
                  <div class="listFontStyle">{{ item.rented }}</div>
                  <div>已租</div>
                </div>
                <div class="listingManagement">
                  <div class="font-bold">{{ item.movingInSoon }}</div>
                  <div>即将搬入(30天内)</div>
                </div>
                <div class="listingManagement">
                  <div class="listFontStyle">{{ item.expirationInSoon }}</div>
                  <div>即将到期(30天内)</div>
                </div>
                <div class="listingManagement">
                  <div class="listFontStyle">{{ item.expired }}</div>
                  <div>已到期</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:w-[100%] md:flex lg:block lg:w-[25%] float-left w-[100%] pr-[10px]">
      <div class="bgWhite sidebar lg:w-[100%] md:w-[33%] w-[100%]">
        <div class="flex justify-between fontStyle w-[100%]">
          <div>待办事项</div>
          <div class="flex items-center text-[#1989fa] text-[12px] font-thin">
            <span>更多</span>
            <span><Icon icon="icon-park-outline:right" /></span>
            <span class="border-l-[1px] border-[gray]"><Icon icon="material-symbols:add" /></span>
          </div>
        </div>
        <div class="content">
          <Empty :image="simpleImage" />
        </div>
      </div>
      <div class="bgWhite sidebar lg:w-[100%] md:w-[33%] w-[100%]">
        <div class="flex justify-between fontStyle w-[100%]">
          <div>最新公告</div>
          <div class="flex items-center text-[#1989fa] text-[12px] font-thin">
            <span>更多</span>
            <span><Icon icon="icon-park-outline:right" /></span>
            <span class="border-l-[1px] border-[gray]"><Icon icon="material-symbols:add" /></span>
          </div>
        </div>
        <div class="content">
          <Empty :image="simpleImage" />
        </div>
      </div>
      <div class="bgWhite sidebar lg:w-[100%] md:w-[33%] w-[100%]">
        <div class="fontStyle w-[100%]">
          <div>资产出租率</div>
          <div class="mt-[10px] px-[5px] flex justify-center">
            <div ref="chartRef" :style="{ width, height }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  // import { PageWrapper } from '/@/components/Page';
  import { getWorkbenchData } from '/@/api/workbench';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { Ref, ref, watch } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { Empty } from 'ant-design-vue';
  const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  const WorkbenchData = ref({
    auditManagement: {
      pendingApproval: 0,
      initiatedByMe: 0,
      copyMe: 0,
      avatar: '',
      location: '',
      companyName: '',
    },
    contractManagement: {
      tobeSigned: 0,
      inRent: 0,
      movingOutSoon: 0,
      expired: 0,
    },
    preRental: {
      tobecheckedin: 0,
      bookToday: 0,
      bookWeek: 0,
      bookMonth: 0,
    },
    listingManagement: [
      {
        name: '',
        suit: 0,
        room: 0,
        vacant: 0,
        config: 0,
        rented: 0,
        total: 0,
        movingInSoon: 0,
        expirationInSoon: 0,
        expired: 0,
      },
    ],
  });
  getWorkbenchData()
    .then((res) => {
      WorkbenchData.value.auditManagement = res.auditManagement;
      WorkbenchData.value.contractManagement = res.contractManagement;
      WorkbenchData.value.preRental = res.preRental;
      WorkbenchData.value.listingManagement = res.listingManagement;
      console.log(WorkbenchData.value);
    })
    .catch((err) => {
      console.log(err);
    });
  const oftenUseFun = ref([
    {
      title: '招商管理',
      icon: 'streamline:information-desk-customer',
    },
    {
      title: '资产管理',
      icon: 'hugeicons:gold',
    },
    {
      title: '财务管理',
      icon: 'icon-park-outline:finance',
    },
    {
      title: '审批管理',
      icon: 'material-symbols:approval',
    },
  ]);
  const chartRef = ref<HTMLDivElement | null>(null);
  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  });
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      setOptions({
        legend: {
          bottom: 0,
          left: 'center',
          data: ['公寓', '商办', '商铺', '厂房', '车位', '广告牌', '会议室'],
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            radius: '60%',
            center: ['50%', '40%'],
            selectedMode: 'single',
            label: {
              formatter: '{d}%',
            },
            data: [
              { value: 1100, name: '公寓' },
              { value: 735, name: '商办' },
              { value: 510, name: '商铺' },
              { value: 200, name: '厂房' },
              { value: 335, name: '车位' },
              { value: 200, name: '广告牌' },
              { value: 500, name: '会议室' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
<style scoped>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  .bgWhite {
    background: #fff;
    border-radius: 5px;
    margin: 0 5px;
    margin-top: 10px;
    padding: 5px 10px;
  }
  .fontStyle {
    padding: 10px;
    font-weight: bold;
  }
  .content {
    padding-left: 18px;
    padding-right: 18px;
    padding-top: 10px;
  }
  .sidebar {
    height: 390px;
  }
  .listingManagement {
    display: flex;
    flex-direction: column;
    justify-content: end;
    text-align: center;
    width: 30%;
    height: 50px;
    font-size: 12px;
  }
  .listFontStyle {
    font-size: 14px;
    font-weight: bold !important;
  }
  @media screen and (max-width: 768px) {
  }
</style>
