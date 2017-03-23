<template>
  <main-layout>
    <p>Welcome to home</p>
    <img src="../assets/images/logo.png">
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'

  export default {
    components: {
      MainLayout
    }
  }
</script>
<style lang="less" scoped>
  @color:#fff;
  p{
    font-size: 16px;
    .dialog{
      background: #000;
    }
  }
</style>