<template>
  <div class="layout-wrapper">
    <div class="header">
      <span v-if="loggedIn" @click="clear">{{ user.username }}退出</span>
      <template v-else>
        <span @click="navigateTo('/login')">登录</span>
        <span @click="navigateTo('/regist')">注册</span>
      </template>
    </div>
    <slot/>
    <div class="footer">footer</div>
  </div>
</template>
<script setup>
const { user, loggedIn, clear } = useUserSession()
</script>