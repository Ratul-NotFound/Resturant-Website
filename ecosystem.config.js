module.exports = {
  apps: [
    {
      name: 'aura-luxury-restaurant',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: './',
      instances: 'max',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      max_memory_restart: '600M',
      autorestart: true,
      watch: false,
    },
  ],
};
