<template>
  <div class="layout-wrapper">
    <div class="header">
      <span v-if="loggedIn" @click="clear">{{ user.username }}退出</span>
      <span v-else @click="navigateTo('/login')">登录</span>
    </div>
    <slot/>
    <div class="footer">footer</div>
  </div>
</template>
<script setup>
const { user, loggedIn, clear } = useUserSession()
</script>