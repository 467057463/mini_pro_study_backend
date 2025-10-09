<template>
  <div class="layout-wrapper">
    <div class="header">
      sss
      <span v-if="loggedIn" @click="clear">退出</span>
    </div>
    <slot/>
    <div class="footer">footer</div>
  </div>
</template>
<script setup>
const { loggedIn, clear } = useUserSession()
</script>