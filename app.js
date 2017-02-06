const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');

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


// 最后启动程序
const server = app.listen(4001, function() {
  console.log('网站程序已启动，端口： ' + server.address().port);
});
