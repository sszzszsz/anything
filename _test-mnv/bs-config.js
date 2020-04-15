module.exports = {
  files: './src/**/*.scss, ./dist/**/*.css, ./dist/**/*.js, ./dist/**/*.html',
  server: {
    baseDir: './dist/',
    index: 'index.html'
  },
  online: true,
  open: 'external',
  proxy: false,
  port: 3000
}
