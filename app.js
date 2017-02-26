const express = require('express');
const app = express();
const ejs = require('ejs');
const logger = require('morgan');

app.use(express.static('./dist'));
app.set('views', './example');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// 路由
app.get('/', function(req, res) {
  res.send('启动成功！！')

});
app.get('/slide', function(req, res) {
  res.render('jslide')
});

if ('development' === app.get('env')){
  app.set('showStackErr', true)                     // 打印错误信息
  app.use(logger(':method:url:status'))             // 请求相关信息
  app.locals.pretty = true                          // 不压缩源码
}

// 最后启动程序
const server = app.listen(4001, function() {
  console.log('网站程序已启动，端口： ' + server.address().port);
});
