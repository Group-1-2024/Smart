<!-- <template>
  <Table
    :columns="columns"
    :data-source="data"
    bordered
    row-key="id"
    :pagination="paginationConfig"
  >
    <template #operation="{ record }">
      <DropdownMenu :record="record" @delete="deleteRecord" />
    </template>
  </Table>
</template>

<script setup>
  import { computed } from 'vue';
  import { Table } from 'ant-design-vue';
  import DropdownMenu from './DropdownMenu.vue';
  import { columns } from '../config';

  const props = defineProps({
    status: String,
    data: Array,
  });

  const paginationConfig = computed(() => ({
    total: props.data.length,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '40'],
    showTotal: (total) => `共 ${total} 条`,
  }));

  const deleteRecord = (recordId) => {
    props.data = props.data.filter((record) => record.id !== recordId);
  };
</script> -->
