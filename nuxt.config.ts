// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    wxAppId: process.env.NUXT_WX_APP_ID,
    wxAppSecret: process.env.NUXT_WX_APP_SECRET,
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
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    },
  },
  modules: ["@prisma/nuxt"],
}) 
