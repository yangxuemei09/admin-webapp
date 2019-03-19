<template>
  <div class="dashboard-editor-container">
    <img :src="backgroundImg" width="100%" height="428" alt="Girl has dropped her ice cream.">
  </div>
</template>

<script>
import backgroundImg from '@/assets/img/background.jpg'
export default {
  name: 'DashboardAdmin',
  data() {
    return {
      backgroundImg: backgroundImg
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
