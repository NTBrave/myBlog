const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser');//解析,用req.body获取post参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Access-Token");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
  // console.log("test");
});
// 登录
app.post('/api/admin/signin', (req, res) => {
  // console.log(req.body);
  new db.User(req.body.userInfo).save(function (err) {
    if (err) {
      res.status(500).send("failed");
      console.log("signin F" + err);

      return
    }
    console.log("signinSuccess");
    res.send("success")
  })
});

// 根据用户名获取用户
app.get('/api/admin/getUser/:name', function (req, res) {
  console.log(req.params.name);
  db.User.findOne({ name: req.params.name }, function (err, docs) {
    if (err) {
      console.error("get User faile" + err)
      res.send("err")

      return
    }
    // console.log("get User Success" + docs);
    res.send(docs)
  })
});

//新建用户
app.post('/api/admin/signup', function (req, res) {
  // console.log(req.body);
  new db.User(req.body.userInfo).save(function (err) {
    if (err) {
      console.log("signup ailed" + err);
      res.status(500).send("failed")
      return
    }
    console.log("signup Success");

    res.send("success")
  })

})
// 获取所有文章
app.get('/api/essayList', function (req, res) {
  db.Article.find({}, function (err, docs) {
    // console.log(" essayList " + docs);
    // console.log(" essayList failed " + err);

    if (err) {
      console.error(err)
      return
    }
    res.json(docs)
  })
})

// 文章详情页
app.get('/api/essayDetail/:id', function (req, res) {
  console.log(req.params.id);
  // checkLogin(req,res);
  db.Article.findOne({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
})

// 文章保存
app.post('/api/admin/saveessay', function (req, res) {
  // console.log(JSON.stringify(req.body.essayInformation));
  new db.Article(req.body.essayInformation).save(function (err) {
    console.log(err);
    if (err) {
      res.status(500).send()
      return
    }
    console.log("save");
    res.send("success")
  })
})

// 文章更新
app.post('/api/admin/updateessay', function (req, res) {
  // console.log("+++"+JSON.stringify(req.body.essayInformation));
  let info = req.body.essayInformation
  db.Article.find({ _id: info._id }, function (err, docs) {
    if (err) {
      return
    }
    docs[0].title = info.title
    docs[0].date = info.date
    docs[0].content = info.content
    docs[0].gist = info.gist
    docs[0].labels = info.labels
    db.Article(docs[0]).save(function (err) {
      if (err) {
        res.status(500).send()
        return
      }
      res.send()
    })
  })
})

// 文章删除
app.post('/api/admin/deleteessay', function (req, res) {
  db.Article.deleteOne({ _id: req.body._id }, function (err) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
})

app.listen(3000, () => console.log('blog listening on port 3000!'))