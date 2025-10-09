export default defineNuxtRouteMiddleware((to, form) => {
  const { user } = useUserSession();

  if(to.path.includes('admin') && user.value?.role === 'customer'){
    return navigateTo('/')
  }
})