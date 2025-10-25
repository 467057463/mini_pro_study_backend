import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'admin',
    configKey: 'admin-key',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  async setup(options, nuxt){
    nuxt.hook('pages:extend', async(pages) => {
      console.log('================')
      console.log(pages)
      console.log('>>>>>>>>>>>>>>>>')
    })
  }
})