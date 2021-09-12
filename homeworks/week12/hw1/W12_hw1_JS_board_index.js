
/*
// js原生寫法 (尚未優化)
(這邊還沒有寫出載入更多的功能)

// 取得所有的 comments
var request = new XMLHttpRequest()
request.open('GET', 'http://mentor-program.co/mtr04group1/KWang/Week12/W12-hw1/W12_hw1_JS_board_api_get_comments.php?web_key=KWang', 'true')
request.onload = function () {
  // connect 到 server success 時
  if (this.status >= 200 && this.status < 400 ) {
    const resp = this.response
    const data = JSON.parse(resp)
    for (let i = 0; i < data.comments.length; i++) {
      const comment_area = document.querySelector('.comments__area')
      const comments_card = document.createElement('div')
      comments_card.classList.add('shadow', 'p-3', 'mb-3', 'bg-body', 'rounded')
      comments_card.innerHTML = `
      <div class="nickname fs-5 badge bg-secondary text-wrap text-break mb-3">
        ${encodeHTML(data.comments[i].nickname)}
      </div>
      <p class="text-body style="white-space: pre-line">
        ${encodeHTML(data.comments[i].content)}
      </p>
      <div class="time d-flex flex-row-reverse text-black-50">
        ${encodeHTML(data.comments[i].created_at)}
      </div>`
      comment_area.appendChild(comments_card)
    }
  }
}
// connect 到 server error 時
request.onerror = function() {
  alert(`connect error: ${this.error}`)
};
request.send();

// escape function
function encodeHTML(str) {
    return str
    .replace(/\&/g, '&amp;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#39;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\//g, '&#x2F')
}

// 新增 comment
const nicknameInput = document.querySelector('input')
const contentInput = document.querySelector('textarea')
const commentForm = document.querySelector('form')

commentForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const nickname = nicknameInput.value
  const content = contentInput.value
  const request = new XMLHttpRequest()
  request.open('POST', 'http://mentor-program.co/mtr04group1/KWang/Week12/W12-hw1/W12_hw1_JS_board_api_add_comment.php', 'true')
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(`web_key=KWang&nickname=${encodeURIComponent(nickname)}&content=${encodeURIComponent(content)}`);
  request.onload = function () {
    if (this.status >=200 && this.status < 400) {
      const resp = this.response
      const data = JSON.parse(resp)
      if (data.status) {
        location.reload()
      } else {
        alert(data.message)
      }
    }
  }
  request.onerror = function () {
    alert(`connect error: ${this.error}`)
  }
})

*/

// 串接 get_comments API 的 function
function getCommentsAPI(webKey, cursor, cb) {
  let reqURL = `http://mentor-program.co/mtr04group1/KWang/Week12/W12-hw1/W12_hw1_JS_board_api_get_comments.php?web_key=${webKey}`

  if (cursor) {
    reqURL = `http://mentor-program.co/mtr04group1/KWang/Week12/W12-hw1/W12_hw1_JS_board_api_get_comments.php?web_key=${webKey}&cursor=${cursor}`
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
      cb(commentsArr)
    },
    error: (err) => {
      alert('error')
      console.log(err)
    }
  })
}

// escape function
function encodeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\//g, '&#x2F')
}

// 嵌入 comments 的 function
function appendComments(comment, isPrepend) {
  const template = `
    <div class="shadow p-3 mb-3 bg-body rounded">
      <div class="nickname fs-5 badge bg-secondary text-wrap text-break mb-3">
        ${encodeHTML(comment.nickname)}
      </div>
      <p class="text-body" style="white-space: pre-line">
        ${encodeHTML(comment.content)}
      </p>
      <div class="time d-flex flex-row-reverse text-black-50">
        ${encodeHTML(comment.created_at)}
      </div>
    </div>`

  if (isPrepend) {
    $('.comments__area').prepend(template)
  } else {
    $('.comments__area').append(template)
  }
}

// 處理取得的 comments 的 function
function getComments(webKey, cursor) {
  getCommentsAPI(webKey, cursor, (commentsArr) => {
    const { length } = commentsArr
    if (length < 6) {
      for (let i = 0; i < length; i++) {
        const comment = commentsArr[i]
        appendComments(comment, null)
      }
      $('.read__more-btn').addClass('d-none')
    } else {
      for (let i = 0; i < length - 1; i++) {
        const comment = commentsArr[i]
        appendComments(comment, null)
      }
      const newCursor = commentsArr[length - 2].id
      $('.read__more-btn').attr('comment__id', newCursor)
    }
  })
}

// 取得 comments
const webKey = 'KWang'
getComments(webKey, null)

// 載入更多 comments 的功能
$('.read__more-btn').click(() => {
  const cursor = $('.read__more-btn').attr('comment__id')
  getComments(webKey, cursor)
})

// 取得現在時間的 function
function getCurrentDateTime() {
  const today = new Date()
  const Year = today.getFullYear()
  const Month = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : (`0${(today.getMonth() + 1)}`)
  const Day = (today.getDate()) >= 10 ? (today.getDate()) : (`0${today.getDate()}`)
  const Hours = (today.getHours()) >= 10 ? (today.getHours()) : (`0${today.getHours()}`)
  const Minutes = (today.getMinutes()) >= 10 ? (today.getMinutes()) : (`0${today.getMinutes()}`)
  const Seconds = (today.getSeconds()) >= 10 ? (today.getSeconds()) : (`0${today.getSeconds()}`)
  const currentDateTime = `${Year}-${Month}-${Day} ${Hours}:${Minutes}:${Seconds}`

  return currentDateTime
}

// 新增 comment
$('form').submit((e) => {
  e.preventDefault()
  const nicknameValue = $('input').val()
  const contentValue = $('textarea').val()
  const currentDateTime = getCurrentDateTime()

  const comment = {
    nickname: nicknameValue,
    content: contentValue,
    created_at: currentDateTime
  }

  $.ajax({
    method: 'POST',
    url: 'http://mentor-program.co/mtr04group1/KWang/Week12/W12-hw1/W12_hw1_JS_board_api_add_comment.php',
    // jquery 的 data{} 格式會自動做 escape 所以不用另外做，不然 post 的資料反而會變得奇怪
    // 如果 data 中的 key 有包含 -(dash, ex: web-key) 就一定要用字串包起來，不然可以不用字串包起來
    data: {
      web_key: 'KWang',
      nickname: nicknameValue,
      content: contentValue
    },
    dataType: 'text'
    // data參數是用來設定 Server 回傳的資料格式，若是 json 格式，則 jquery 會自動解析成 js 的 obj
  })
    .done((resp) => {
      if (resp[0] === '{') {
        // 若 sql 語法正確時
        const data = JSON.parse(resp)
        if (!data.status) {
          alert(data.message)
          return
        }
        $('input').val('')
        $('textarea').val('')
        appendComments(comment, true)
      } else {
        // 若 sql 語法錯誤時
        console.log('error: ', resp)
      }
    })
    .fail((resp) => {
      console.log('connect error: ', resp)
    })
})
