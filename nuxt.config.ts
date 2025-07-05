// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    wxAppId: process.env.NUXT_WX_APP_ID,
    wxAppSecret: process.env.NUXT_WX_APP_secret,
    jwtSecert: process.env.NUXT_JWT_SECERT,
  },
  imports: {
    dirs: ['constant', 'api']
  },
  nitro: {
    imports: {
      dirs: ['lib', 'constant', 'api']
    }
  },
  modules: ["@prisma/nuxt"],
})
