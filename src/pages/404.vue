<template>
  <div class="notFound"></div>
</template>

<script>
  import MainLayout from 'layouts/Main.vue'

  export default {
    components: {
      MainLayout
    }
  }
</script>
<style scoped>
.notFound{
	height: 100%;
	background-repeat: no-repeat;
	background-position: center;
	background-image: url(../assets/images/404.jpg);
}
</style>
