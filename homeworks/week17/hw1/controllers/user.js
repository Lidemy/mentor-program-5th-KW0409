const bcrypt = require('bcrypt')
const db = require('../models')

const Users = db.KWang_blog_users

const saltRounds = 10

const userController = {
  register: (req, res) => {
    res.render('users/register')
  },

  handleRegister: (req, res, next) => {
    const { nickname, username, password } = req.body
    if (!nickname || !username || !password) {
      req.flash('errorMsg', '註冊資料有缺，請重新填寫！')
      return next()
    }

    bcrypt.hash(password, saltRounds,
      async(err, hash) => {
        if (err) {
          req.flash('errorMsg', '使用者資料處理失敗，請再重試一次！')
          console.log('handleRegister-bcrypt_Error:', err.toString())
          return next()
        }

        try {
          const userData = await Users.create({
            nickname,
            username,
            password: hash
          })

          req.session.userId = userData.id
          req.session.nickname = userData.nickname
          req.session.username = userData.username
          res.redirect('/')
        } catch (err) {
          if (err.parent.errno === 1062) {
            req.flash('errorMsg', '此帳號/密碼已被使用')
            return next()
          }

          req.flash('errorMsg', '使用者資料處理失敗，請再重試一次！')
          console.log('handleRegister_Error:', err.toString())
          return next()
        }
      }
    )
  },

  login: (req, res) => {
    res.render('users/login')
  },

  handleLogin: async(req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMsg', '登入資料有缺，請重新填寫！')
      return next()
    }

    try {
      const userData = await Users.findOne({
        where: {
          username
        }
      })

      if (!userData) {
        // 因為是 findOne，所以不需要用 .length 來判斷，如果找不到資料就會是回傳 null
        req.flash('errorMsg', '帳號/密碼輸入錯誤！')
        return next()
      }

      bcrypt.compare(password, userData.password,
        (err, isPass) => {
          if (err) {
            req.flash('errorMsg', '使用者資料處理失敗，請再重試一次！')
            console.log('handleLogin-bcrypt_Error:', err.toString())
            return next()
          }

          if (!isPass) {
            req.flash('errorMsg', '帳號/密碼輸入有誤！')
            return next()
          }

          // 登入狀態下，除了登入, 註冊頁面外，其他頁面幾乎都會用到 user.nickname
          /* FIXME: 這邊想問一下助教
          因為大部分的頁面都會需要用到此資訊，因此在考慮要用 req.session 還是 req.flash 去設置再讓 res.locals 去接
          這樣其他頁面有需要用到登入者的 user 資訊時，就不需要再去資料庫撈
          因為 req.flash 在課程中似乎提到過有一閃即逝的特性(個人理解是被存取一次之後就會消失，不知道這樣理解是否正確)
          感覺可能比較省記憶體，所以本來想選擇 req.flash，但是後來想想這樣的話 userId 幹嘛要放在 session 裏面
          想說是不是因為 req.session 的安全性比較高，這種比較敏感的認證資訊不容易被改到，所以才放這的
          因此最後還是用 req.session 來存資訊了
          */
          req.session.userId = userData.id
          req.session.nickname = userData.nickname
          req.session.username = userData.username
          res.redirect('/')
        }
      )
    } catch (err) {
      req.flash('errorMsg', '使用者資料處理失敗，請再重試一次！')
      console.log('handleLogin_Error:', err.toString())
      return next()
    }
  },

  logout: (req, res) => {
    req.session.userId = null
    req.session.nickname = null
    req.session.username = null
    res.redirect('/')
  }
}

module.exports = userController
