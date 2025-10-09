export default defineNuxtPlugin((nuxtApp) => {
  const { session } = useUserSession();

  const api = $fetch.create({
    baseURL: '/api',
    onRequest({request, options, error}){
      if(session.value?.token){
        options.headers.set('Authorization', `Bearer ${session.value?.token}`)
      }
    },

    async onResponseError({response}){
      if(response.status === 401){
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    },

    onResponse({response}){
      if(response._data.code == 0){
        response._data = response._data.data
      } else {
        return Promise.reject(response._data)
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})