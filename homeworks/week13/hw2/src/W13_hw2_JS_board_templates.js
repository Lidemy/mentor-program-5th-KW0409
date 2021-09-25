
// 嵌入整個留言板的 form template function
export function getFormTemplate(webKey) {
  return `
  <form class="${webKey}-form shadow p-3 mb-5 bg-body rounded">
    <div class="form-floating mb-3">
      <input type="text" class="${webKey} form-control" id="${webKey}-form__nickname" placeholder="請輸入暱稱">
      <label for="${webKey}-form__nickname" class="text-black-50">暱稱</label>
    </div>
    <div class="form-floating">
      <textarea class="${webKey} form-control" placeholder="請輸入留言內容" id="${webKey}-form__textarea" style="height: 200px"></textarea>
      <label for="${webKey}-form__textarea" class="text-black-50">留言內容</label>
    </div>
    <button type="submit" class="btn btn-primary mt-3">送出</button>
  </form>
  
  <div class="${webKey}-comments__area mt-5">
  </div>
  
  <div class="d-grid gap-2 mx-auto col-10 mt-5 mb-5">
    <button class="${webKey}-read__more-btn btn btn-primary" type="button">載入更多</button>
  </div>`
}

// escape function
export function encodeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\//g, '&#x2F')
}

// 留言內容的 template card
export function commentTemplate(commentData) {
  return `
    <div class="shadow p-3 mb-3 bg-body rounded">
      <div class="nickname fs-5 badge bg-secondary text-wrap text-break mb-3">
        ${encodeHTML(commentData.nickname)}
      </div>
      <p class="text-body" style="white-space: pre-line">
        ${encodeHTML(commentData.content)}
      </p>
      <div class="time d-flex flex-row-reverse text-black-50">
        ${encodeHTML(commentData.created_at)}
      </div>
    </div>`
}
