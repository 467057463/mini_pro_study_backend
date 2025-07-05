module.exports = {
  apps: [
    {
      name: 'blog_nuxt-stage',
      port: '4001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    }
  ]
}