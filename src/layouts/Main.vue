<template>
  <div class="container">
    <ul>
      <li>
        <v-link href="/">Home</v-link>
        <v-link href="/about">About</v-link>
      </li>
    </ul>

    <slot></slot>
  </div>
</template>

<script>
  import VLink from '../component/VLink.vue'

  export default {
    components: {
      VLink
    }
  }
</script>

<style scoped>
  .container {
    background: url(../assets/images/bg.png);
    max-width: 600px;
    margin: 0 auto;
    padding: 15px 30px;
    
  }
</style>
