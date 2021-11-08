module.exports = {
  apps: [
    {
      script: 'dist/server.js',
      watch: './src',
      ignore_watch: ['node_modules', 'public', 'logs', '__tests__'],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
