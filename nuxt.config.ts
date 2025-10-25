import type { NuxtPage } from '@nuxt/schema'

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
  css: ['element-plus/theme-chalk/dark/css-vars.css', 'element-plus/theme-chalk/index.css', '~/assets/styles/main.scss'],
  app: {
    rootTag: 'body'
  },
  nitro: {
    imports: {
      dirs: ['lib', 'constant', 'api']
    }
  },
  routeRules: {
    "/admin/**": {
      ssr: false,
    }
  },
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    },
  },
  modules: ["@prisma/nuxt", 'nuxt-auth-utils', '@vant/nuxt', '@element-plus/nuxt', '@vueuse/nuxt', '@nuxt/eslint'],
  elementPlus: {
    importStyle: false,
    defaultLocale: 'zh-cn',
  },
  hooks: {
    "pages:extend": function(pages){
      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove: NuxtPage[] = []
        for (const page of pages) {
          if (page.file?.match(pattern)) {
            pagesToRemove.push(page)
          }
          else {
            removePagesMatching(pattern, page.children)
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1)
        }
      }
      // 移除pages中components目录自动生成的路由
      removePagesMatching(/\/components/, pages)
    }
  }
})