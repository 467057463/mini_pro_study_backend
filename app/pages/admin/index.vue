<template>
  <section>
    <el-card shadow="never">
      admin index
    </el-card>

    <el-card shadow="never">
      test
    </el-card>
  </section>
</template>

<script setup>
definePageMeta({
  title: '首页',
  middleware: ['auth', 'role']
})
const { loggedIn, user, session } = useUserSession();
console.log({
  loggedIn, 
  user,
  session
})
watch(loggedIn, (val) => {
  console.log(val)
})
</script>

<style lang="scss" scoped>

</style>