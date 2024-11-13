<!-- DropdownMenu.vue -->
<template>
  <Dropdown :trigger="['click']" placement="bottomCenter">
    <a class="ant-dropdown-link" @click.prevent>
      <Icon icon="mingcute:more-2-fill" style="color: #1989f1" />
    </a>
    <template #overlay>
      <Menu>
        <!-- 详情: 所有状态都显示 -->
        <menu-item key="0">
          <a href="javascript:;">详情</a>
        </menu-item>

        <!-- 根据不同状态显示特定操作 -->
        <menu-item
          v-if="
            record.status === '已入住' || record.status === '待入住' || record.status === '待生效'
          "
          key="1"
        >
          <a href="javascript:;">邀请签字</a>
        </menu-item>

        <menu-item v-if="record.status === '已入住' || record.status === '待入住'" key="2">
          <a href="javascript:;">提醒签字</a>
        </menu-item>

        <menu-item v-if="record.status === '待入住'" key="3">
          <a href="javascript:;">变更预定房源</a>
        </menu-item>

        <menu-item v-if="record.status === '待入住'" key="4">
          <a href="javascript:;">签约</a>
        </menu-item>

        <menu-item v-if="record.status === '待入住'" key="5">
          <a href="javascript:;">退定</a>
        </menu-item>

        <menu-item
          v-if="
            record.status === '待入住' || record.status === '待生效' || record.status === '已退定'
          "
          key="6"
        >
          <a href="javascript:;">编辑预定信息</a>
        </menu-item>

        <menu-item
          v-if="
            record.status === '待入住' || record.status === '待生效' || record.status === '已退定'
          "
          key="7"
        >
          <a href="javascript:;">置为无效</a>
        </menu-item>

        <menu-item v-if="record.status === '待生效'" key="8">
          <a href="javascript:;">邀请租客支付</a>
        </menu-item>

        <menu-item v-if="record.status === '待生效'" key="9">
          <a href="javascript:;">线下收款</a>
        </menu-item>

        <menu-item v-if="record.status === '无效'" key="10" @click="handleDelete">
          <a href="javascript:;">删除</a>
        </menu-item>
      </Menu>
    </template>
  </Dropdown>
</template>

<script setup>
  import Icon from '/@/components/Icon/src/Icon.vue';
  import { Dropdown, Menu, MenuItem } from 'ant-design-vue';

  const props = defineProps({
    record: Object,
  });

  // 定义事件 emit
  const emit = defineEmits(['delete']);

  // 删除操作处理
  const handleDelete = () => {
    // 向父组件触发删除事件，传递记录的 id
    emit('delete', props.record.id);
  };
</script>

<style scoped></style>
