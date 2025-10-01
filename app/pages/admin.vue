<template>
<NuxtLayout :name="layout">
  <NuxtPage/>
</NuxtLayout>
</template>

<script setup>
const route = useRoute();

const layout = computed(() => {
  if(['admin-login'].includes(route.name)){
    return false
  }
  return 'admin'
})

definePageMeta({
  layout: false
})
</script>