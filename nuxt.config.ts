// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  runtimeConfig: {
    wxAppId: process.env.NUXT_WX_APP_ID,
    wxAppSecret: process.env.NUXT_WX_APP_SECRET,
    jwtSecert: process.env.NUXT_JWT_SECERT,
  },
  imports: {
    dirs: ['constant', 'api']
  },
  css: ['~/assets/styles/main.scss'],
  nitro: {
    imports: {
      dirs: ['lib', 'constant', 'api']
    }
  },
  // routeRules: {
  //   "/admin/*": {
  //     ssr: false,
  //   }
  // },
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    },
  },
  modules: ["@prisma/nuxt", 'nuxt-auth-utils', '@vant/nuxt'],
})