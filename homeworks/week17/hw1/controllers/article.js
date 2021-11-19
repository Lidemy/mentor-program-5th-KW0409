const db = require('../models')

const Articles = db.KWang_blog_articles
const Users = db.KWang_blog_users

const articleController = {
  // /, /article-list, /author-page, /admin 路由皆用此 function
  index: async(req, res) => {
    let page = 1
    if (req.query.page) {
      page = Number(req.query.page)
    }

    const route = req.url.split('?')[0] // 要做 split 處理，只把 route 抓出來，才不會被 req.params 影響
    let num_per_page
    if (route === '/article-list') {
      num_per_page = 10
    } else {
      num_per_page = 5
    }
    const offset = (page - 1) * num_per_page

    // 取得所有文章的資料
    /*
    如果要取得所有作者的文章資料，當 WHERE username = 0 的話會列出所有的資料
    因為跟 int 型態的條件做比較時，MySQL 似乎會將所選欄位的值轉換成 int 型態
    而當欄位的值不存在有效的 int 型態的值時，都會被轉換成 0(int)
    詳情可見 https://stackoverflow.com/questions/7880936/mysql-returns-all-rows-when-field-0
    */
    let author_nickname
    let author_name
    switch (route) {
      case '/author-page':
        if (req.query.author_nickname && req.query.author_name) {
          author_nickname = req.query.author_nickname
          author_name = req.query.author_name
        } else {
          res.redirect('/')
          return
        }
        break
      case '/admin':
        author_name = req.session.username
        break
      default: // => case '/', '/article-list'
        author_name = 0
    }

    try {
      const articles = await Articles.findAndCountAll({
        where: { is_deleted: null },
        limit: num_per_page,
        offset,
        order: [['id', 'DESC']],
        include: [{
          model: Users,
          where: { username: author_name }
        }]
      })

      if (route !== '/admin' && !articles.rows.length) {
        // 要排除 /admin 是因為剛創立的帳號不會有文章，避免被擋住
        // 因為是 findAll，所以要用 .length 來判斷，如果找不到資料會回傳空陣列 []
        console.log('index-1_Error:', '查無資料！')
        return res.send("<script>alert('Err(index-1)：獲取文章失敗，請在稍後重試！')</script>")
      }

      // total_page 因為是可能會變動的數值，因此不好用 res.locals 先存起來
      const total_page = Math.ceil(articles.count / num_per_page)

      /* FIXME: 這邊想問一下助教
      因為這四個路由要抓的資料基本都是一樣的，只是畫面的呈現方式有差別而已
      因此想說用這樣的方式來做區別就不用重複寫相同的程式碼
      不知道這樣的做法對嗎，還是說應該要拆分成不同的 function
      */
      switch (route) {
        case '/author-page':
          res.render('pages/author_page', {
            author_name,
            author_nickname,
            articles: articles.rows,
            page,
            total_page
          })
          break
        default: { // => case '/', '/admin', '/article-list'
          let viewURL = 'index'
          if (route === '/admin') {
            viewURL = 'users/admin/admin'
          } else if (route === '/article-list') {
            viewURL = 'pages/article_list'
          }
          res.render(`${viewURL}`, {
            articles: articles.rows,
            page,
            total_page
          })
        }
      }
    } catch (err) {
      console.log('index-2_Error:', err.toString())
      return res.send("<script>alert('Err(index-2)：獲取資料失敗，請在稍後重試！')</script>")
    }
  },

  articlePage: async(req, res) => {
    // id 本來就是 URL 的一部分，所以不用特地檢查
    const { id } = req.params

    try {
      const article = await Articles.findOne({
        where: {
          id
        },
        include: Users
      })

      if (!article) {
        console.log('articlePage-1_Error:', '查無資料！')
        return res.send("<script>alert('Err(articlePage-1)：獲取文章失敗，請在稍後重試！')</script>")
      }

      res.render('pages/article_page', {
        article
      })
    } catch (err) {
      console.log('articlePage-2_Error:', err.toString())
      return res.send("<script>alert('Err(articlePage-2)：獲取資料失敗，請在稍後重試！')</script>")
    }
  },

  add: (req, res) => {
    res.render('users/admin/add_article')
  },

  handleAdd: async(req, res) => {
    const session_userId = req.session.userId
    if (!session_userId) {
      return res.send("<script>alert('未傳入正確參數！')</script>")
    }

    const { title, content } = req.body
    try {
      await Articles.create({
        title,
        content,
        KWangBlogUserId: session_userId
      })

      res.redirect('/admin')
    } catch (err) {
      console.log('handleAdd_Error:', err.toString())
      return res.send("<script>alert('Err(handleAdd)：資料新增失敗，請在稍後重試！')</script>")
    }
  },

  update: async(req, res) => {
    const { id } = req.params
    const session_userId = req.session.userId
    if (!session_userId) {
      return res.send("<script>alert('未傳入正確參數！')</script>")
    }

    try {
      const article = await Articles.findOne({
        where: {
          id,
          KWangBlogUserId: session_userId
        }
      })

      if (!article) {
        console.log('update-1_Error:', '查無資料！')
        return res.send("<script>alert('Err(update-1)：文章獲取失敗，請在稍後重試！')</script>")
      }

      res.render('users/admin/update_article', {
        article
      })
    } catch (err) {
      console.log('update-2_Error:', err.toString())
      return res.send("<script>alert('Err(update-2)：資料獲取失敗，請在稍後重試！')</script>")
    }
  },

  handleUpdate: async(req, res) => {
    const { id } = req.params
    const session_userId = req.session.userId
    if (!session_userId) {
      return res.send("<script>alert('未傳入正確參數！')</script>")
    }

    const { title, content } = req.body
    try {
      const article = await Articles.findOne({
        where: {
          id,
          KWangBlogUserId: session_userId
        }
      })

      if (!article) {
        console.log('handleUpdate-find1_Error:', '查無資料！')
        return res.send("<script>alert('Err(handleUpdate-find1)：文章獲取失敗，請在稍後重試！')</script>")
      }

      try {
        await article.update({
          title,
          content
        })

        res.redirect(`/article-page/${id}`)
      } catch (err) {
        console.log('handleUpdate-update_Error:', err.toString())
        return res.send("<script>alert('Err(handleUpdate-update)：資料修改失敗，請在稍後重試！')</script>")
      }
    } catch (err) {
      console.log('handleUpdate-find2_Error:', err.toString())
      return res.send("<script>alert('Err(handleUpdate-find2)：資料修改失敗，請在稍後重試！')</script>")
    }
  },

  handleDelete: async(req, res) => {
    const { id } = req.params
    const session_userId = req.session.userId
    if (!session_userId) {
      return res.send("<script>alert('未傳入正確參數！')</script>")
    }

    try {
      const article = await Articles.findOne({
        where: {
          id,
          KWangBlogUserId: session_userId
        }
      })

      if (!article) {
        console.log('handleDelete-find1_Error:', '查無資料！')
        return res.send("<script>alert('Err(handleDelete-find1)：文章獲取失敗，請在稍後重試！')</script>")
      }

      try {
        await article.update({
          is_deleted: 1
        })

        res.redirect('/admin')
      } catch (err) {
        console.log('handleDelete-update_Error:', err.toString())
        return res.send("<script>alert('Err(handleDelete-update)：資料刪除失敗，請在稍後重試！')</script>")
      }
    } catch (err) {
      console.log('handleDelete-find2_Error:', err.toString())
      return res.send("<script>alert('Err(handleDelete-find2)：文章刪除失敗，請在稍後重試！')</script>")
    }
  }
}

module.exports = articleController
