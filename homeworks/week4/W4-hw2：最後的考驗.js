
/*

原本以為上次就已經是最後一次幫忙，沒想到秋秋鞋還是又跑來找你了。
他說他想要更多功能，他想把這整個書籍資料庫當作自己的來用，必須能夠顯示前 20 本書的資料、刪除、新增以及修改書本，這樣他就可以管理自己的書籍了。（跟 hw1 不同，之前是 10 本，這次要顯示 20 本）

雖然你很想問他說為什麼不用 Excel 就好，但你問不出口，再加上你最近剛學程式需要練習的機會，於是你就答應了。
請閱讀開頭給的 API 文件並串接，用 node.js 寫出一個程式並接受參數，輸出相對應的結果

Base URL: https://lidemy-book-store.herokuapp.com

   說明           Method     path               參數                    範例
獲取所有書籍        GET     /books       _limit:限制回傳資料數量      /books?_limit=5
獲取單一書籍        GET    /books/:id             無                   /books/10
新增書籍           POST     /books            name: 書名                 無
刪除書籍          DELETE  /books/:id             無                      無
更改書籍資訊       PATCH     /books/:id        name: 書名                 無

範例如下：

node hw2.js list // 印出前二十本書的 id 與書名
node hw2.js read 1 // 輸出 id 為 1 的書籍
node hw2.js delete 1 // 刪除 id 為 1 的書籍
node hw2.js create "I love coding" // 新增一本名為 I love coding 的書
node hw2.js update 1 "new name" // 更新 id 為 1 的書名為 new name

*/

const request = require('request')
const process = require('process')

if (process.argv[2] === 'list') {
  request('https://lidemy-book-store.herokuapp.com/books?_limit=20', (error, response, body) => {
    const json = JSON.parse(body)
    for (let i = 0; i <= 19; i++) {
      console.log(json[i].id, json[i].name)
    }
  })
}

if (process.argv[2] === 'read') {
  /* eslint-disable-next-line */
  request('https://lidemy-book-store.herokuapp.com/books/' + process.argv[3], (error, response, body) => {
    const json = JSON.parse(body)
    console.log('id:', json.id)
    console.log('name:', json.name)
  })
}

if (process.argv[2] === 'delete') {
  /* eslint-disable-next-line */
  request.delete('https://lidemy-book-store.herokuapp.com/books/' + process.argv[3], (error, response, body) => {
    console.log(response.statusCode)
  })
}

if (process.argv[2] === 'create') {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books/',
      form: {
        name: process.argv[3]
      }
    },
    (error, response, body) => {
      console.log('statusCode:', response.statusCode)
      const json = JSON.parse(body)
      console.log('id:', json.id)
      console.log('name:', json.name)
    }
  )
}

if (process.argv[2] === 'update') {
  request.patch(
    { /* eslint-disable-next-line */
      url: 'https://lidemy-book-store.herokuapp.com/books/'+ process.argv[3],
      form: {
        name: process.argv[4]
      }
    },
    (error, response, body) => {
      console.log('statusCode:', response.statusCode)
      const json = JSON.parse(body)
      console.log('id:', json.id)
      console.log('name:', json.name)
    }
  )
}
