<template>
  <QrCode :value="qrCodeUrl" />
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { QrCode, QrCodeActionType } from '/@/components/Qrcode/index';
  import LogoImg from '/@/assets/images/logo.png';
  const qrCodeUrl = 'https://www.vvbin.cn';
  export default defineComponent({
    components: { QrCode },
    setup() {
      const qrRef = ref<Nullable<QrCodeActionType>>(null);
      function download() {
        const qrEl = unref(qrRef);
        if (!qrEl) return;
        qrEl.download('文件名');
      }
      return {
        qrCodeUrl,
        LogoImg,
        download,
        qrRef,
      };
    },
  });
</script>
<style scoped>
  .qrcode-demo-item {
    width: 30%;
    margin-right: 1%;
  }
</style>
