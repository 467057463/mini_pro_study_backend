module.exports = {
  apps: [
    {
      name: 'mini_pro_study_backend_stage',
      port: '4001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    }
  ]
}