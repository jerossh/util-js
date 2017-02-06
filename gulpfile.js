'use strict'
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create('zhongyu');

// 系统判定，用于win 不能正确 chrome 的 bug
let openBrowser = (process.platform === 'win32')?false:true;

// 应用自动重启
gulp.task('serve', function () {
  nodemon({
    script: 'app',
    ext: 'js',
    ignore: [
      './dist/',
    ],
    env: { 'NODE_ENV': 'development' }
  })
})

// 前端页面自动刷新
gulp.task('start', function() {
  browserSync.init({      // null 干什么用？
      proxy: 'http://localhost:4001' ,   // 监控代理地址
      files: ['./dist', './example'],             // 监控的文件
      open: openBrowser,                          // 是否打开浏览器
      browser: 'google chrome',                   // 打开的浏览器名称
      notify: false,                              // 浏览器不现实通知，不知道什么意思
      port: 5000                                  // 映射到的地址
  });
})

gulp.task('default', ['serve', 'start'])
