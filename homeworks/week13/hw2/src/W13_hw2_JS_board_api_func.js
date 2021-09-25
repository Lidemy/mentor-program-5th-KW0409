
// 串接 get_comments API 的 function
export function getCommentsAPI(apiURL, webKey, cursor, cb) {
  let reqURL = `${apiURL}/W13_hw2_JS_board_api_get_comments.php?web_key=${webKey}`

  if (cursor) {
    reqURL = `${apiURL}/W13_hw2_JS_board_api_get_comments.php?web_key=${webKey}&cursor=${cursor}`
  }

  $.ajax({
    type: 'GET',
    url: reqURL,
    success: (resp) => {
      // 如果沒有設定 dataType(Server 回傳的資料類型)，則 jQuery 會自動判斷
      // 若判斷為 json 格式，則 jQuery 會自動解析成 js 的 obj 格式
      if (!resp.status) {
        alert(resp.message)
        return
      }

      const commentsArr = resp.comments
      cb(commentsArr, webKey)
    },
    error: (err) => {
      alert('error')
      console.log(err)
    }
  })
}

// 新增 comment 的 api_function
export function addCommentAPI(apiURL, commentData, cb) {
  $.ajax({
    method: 'POST',
    url: `${apiURL}/W13_hw2_JS_board_api_add_comment.php`,
    // jquery 的 data{} 格式會自動做 escape 所以不用另外做，不然 post 的資料反而會變得奇怪
    // 如果 data 中的 key 有包含 -(dash, ex: web-key) 就一定要用字串包起來，不然可以不用字串包起來
    data: commentData,
    dataType: 'text'
    // data參數是用來設定 Server 回傳的資料格式，如果 resp 是 json 格式，則 jquery 會自動解析成 js 的 obj 格式
  })
    .done((resp) => {
      let data
      try {
        // 若 sql 語法正確時
        data = JSON.parse(resp)
        if (!data.status) {
          alert(data.message)
          return
        }

        $('input').val('')
        $('textarea').val('')
        cb(commentData, true, commentData.web_key)
      } catch (err) {
        // 若 sql 語法錯誤時
        console.log('error: ', resp)
        console.log('error: ', err)
      }
    })
    .fail((resp) => {
      console.log('connect error: ', resp)
    })
}
