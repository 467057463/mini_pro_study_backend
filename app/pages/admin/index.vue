<template>
  admin index
</template>

<script setup>
definePageMeta({
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