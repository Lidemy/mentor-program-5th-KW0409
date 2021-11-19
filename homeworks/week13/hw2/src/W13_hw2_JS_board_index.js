
import { getCommentsAPI, addCommentAPI } from './W13_hw2_JS_board_api_func'
import { getComments, appendComments, getCurrentDateTime } from './W13_hw2_JS_board_utils'
import { getFormTemplate } from './W13_hw2_JS_board_templates'

// 初始化留言板 plugin 的 function
// eslint-disable-next-line import/prefer-default-export
export function init(options) {
  // 當整個檔案只有一個導出時，eslint 會要求必須用 export default 來導出
  // 且匯入 default export 時，不可用解構的語法來 import(把 {} 拿掉即可)
  // 詳情可見 https://www.lowerfish.com/2018/08/28/what-is-the-benefit-of-prefer-default-export/

  // 這三個變數宣告必須要放 function 裡面，避免同時 init 兩個留言板時，會有只抓到後呼叫的留言板的情況
  const { webKey, apiURL } = options
  const containerElement = $(options.containerSelector)
  containerElement.append(getFormTemplate(webKey))

  // 取得 comments
  getCommentsAPI(apiURL, webKey, null, getComments)

  // 載入更多 comments 的功能
  $(`.${webKey}-read__more-btn`).click(() => {
    const cursor = $(`.${webKey}-read__more-btn`).attr('comment__id')
    getCommentsAPI(apiURL, webKey, cursor, getComments)
  })

  // 新增 comment
  $(`form.${webKey}-form`).submit((e) => {
    e.preventDefault()
    const nicknameValue = $(`form.${webKey}-form input.${webKey}`).val()
    const contentValue = $(`form.${webKey}-form textarea.${webKey}`).val()
    const currentDateTime = getCurrentDateTime()
    const commentData = {
      web_key: webKey,
      nickname: nicknameValue,
      content: contentValue,
      created_at: currentDateTime
    }

    addCommentAPI(apiURL, commentData, appendComments)
  })
}
