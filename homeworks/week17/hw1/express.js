const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const port = process.env.W17_EXPRESS_PORT || 5001
const userController = require('./controllers/user')
const articleController = require('./controllers/article')

app.set('view engine', 'ejs')

// 要引入外部的 css, js...等靜態檔案時，必須在 express.js 加上這行
// __dirname 後面的參數是要『引入的靜態檔案相較此檔案的資料夾位置』
// 設置好後，在需要引入靜態檔案的 ejs 檔案裡面，導入的路徑只需要寫 public 後面的路徑即可
// 但要記得最前面一定要有 "/"，例如: "/js/..", "/css/.."，不然的話有些檔案會出錯(尤其是那些路由有包含 /:id 之類的檔案)
// 詳情可參考 https://cloud.tencent.com/developer/article/1415302
app.use(express.static(`${__dirname}/public`))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 這個之後如果要部署或上傳到 github 的話，要改成一般人看不到的狀態，因為 secret 算是敏感資訊
app.use(session({
  secret: process.env.W17_EXPRESS_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.userId = req.session.userId
  res.locals.nickname = req.session.nickname
  res.locals.username = req.session.username
  res.locals.errorMsg = req.flash('errorMsg')
  next()
})

function redirectBack(req, res) {
  res.redirect('back')
}

function checkIsLogin(req, res, next) {
  if (!req.session.username) {
    return res.redirect('/')
  }
  next()
}

// 首頁路由
app.get('/', articleController.index)

// 註冊路由
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)

// 登入路由
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)

// 登出路由
app.get('/logout', userController.logout)

// 文章列表路由 (跟首頁相比只是畫面的呈現方式有差別而已，因此一樣用 controller.index)
app.get('/article-list', articleController.index)

// 文章頁面路由
app.get('/article-page/:id', articleController.articlePage)

// 文章作者頁面路由
app.get('/author-page', articleController.index)

// 後台頁面路由
app.get('/admin', checkIsLogin, articleController.index)

// 新增文章頁面路由
app.get('/add-article', checkIsLogin, articleController.add)
// 處理新增文章動作的路由
app.post('/add-article', checkIsLogin, articleController.handleAdd)

// 編輯文章頁面路由
app.get('/update-article/:id', checkIsLogin, articleController.update)
// 處理編輯文章動作的路由
app.post('/update-article/:id', checkIsLogin, articleController.handleUpdate)

// 處理刪除文章動作的路由
app.get('/delete-article/:id', checkIsLogin, articleController.handleDelete)

app.listen(port, () => {
  console.log(`W17_blog app listening at http://localhost:${port}`)
})
