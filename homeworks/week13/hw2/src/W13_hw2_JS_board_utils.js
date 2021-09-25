
import { commentTemplate } from './W13_hw2_JS_board_templates'

// 嵌入 comments 的 function
export function appendComments(commentData, isPrepend, webKey) {
  const commentItem = commentTemplate(commentData)

  if (isPrepend) {
    $(`.${webKey}-comments__area`).prepend(commentItem)
  } else {
    $(`.${webKey}-comments__area`).append(commentItem)
  }
}

// 處理取得的 comments 的 function
export function getComments(commentsArr, webKey) {
  const { length } = commentsArr // 也可寫成 length = commentsArr.length
  if (length < 6) {
    for (let i = 0; i < length; i++) {
      const comment = commentsArr[i]
      appendComments(comment, null, webKey)
    }
    $(`.${webKey}-read__more-btn`).addClass('d-none')
  } else {
    for (let i = 0; i < length - 1; i++) {
      const comment = commentsArr[i]
      appendComments(comment, null, webKey)
    }
    const newCursor = commentsArr[length - 2].id
    $(`.${webKey}-read__more-btn`).attr('comment__id', newCursor)
  }
}

// 取得現在時間的 function
export function getCurrentDateTime() {
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
