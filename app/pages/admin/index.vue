<template>
  <section>
    <el-card shadow="never">
      admin index
    </el-card>

    <el-card shadow="never">
      <button @click="counter++">+</button>
      <button @click="counter++">-</button>
    </el-card>
  </section>
</template>

<script setup>
definePageMeta({
  title: '首页',
  middleware: ['auth', 'role']
})
</script>