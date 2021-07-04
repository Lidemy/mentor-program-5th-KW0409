
/*

有一天，住你隔壁的鄰居秋秋鞋跑來按門鈴，說有事想要找你討論，他最近在做一個知識型的 YouTube 頻道，可是快要沒有靈感了。
這時，他想到一個好主意！他只要能夠看到書店提供的書籍相關資訊，就可以從中汲取靈感，之後就可以發想相關題材，頻道就不會一直不更新了。

身為秋秋鞋的好朋友，這個重責大任當然就交給你了！
請閱讀開頭給的 API 文件並串接，用 node.js 寫出一個程式，執行後會在 console 列出前十本書籍的 id 以及書名。
順帶一提，叫做秋秋鞋是因為他很喜歡秋天。

Base URL: https://lidemy-book-store.herokuapp.com

   說明           Method     path               參數                    範例
獲取所有書籍        GET     /books       _limit:限制回傳資料數量      /books?_limit=5
獲取單一書籍        GET    /books/:id             無                   /books/10
新增書籍           POST     /books            name: 書名                 無
刪除書籍          DELETE  /books/:id             無                      無
更改書籍資訊       PATCH     /books/:id        name: 書名                 無

範例：
node hw1.js

1 克雷的橋
2 當我想你時，全世界都救不了我
3 我殺的人與殺我的人
....

*/

const request = require('request')

/*
錯誤寫法

request('https://lidemy-book-store.herokuapp.com/books?_limit=10', (error, response, body) => {
  // 不應該直接對拿到的 response 做 JSON.parse，因為若是 response 不是合法的 JSON 字串就會回傳錯誤(因此也要做錯誤處理)
  const data = JSON.parse(body)
  // 迴圈的次數，應該要用 data.length，因為沒辦法確保 API 一定會回傳 10 筆資料又或者若 API 出問題，資料多傳/少傳的話就會出錯
  // 未做錯誤處理的步驟
  for (let i = 0; i <= 9; i++) {
    // 參數改成 template literal 的形式會比較好維護
    console.log(data[i].id, data[i].name)
  }
})

*/
// 正確寫法

request('https://lidemy-book-store.herokuapp.com/books?_limit=10', (error, response, body) => {
  if (error) {
    console.log('error:', error)
    return
  }

  let data
  try {
    data = JSON.parse(body)
  } catch (error) {
    console.log(error)
    return
  }

  for (let i = 0; i < data.length; i++) {
    console.log(`${data[i].id} ${data[i].name}`)
  }
})
