
const boardUserArea = document.querySelector('.board__comment-area')

// 設定權限選單的預設選項
function optionAddSelected(str, elementDOM) {
  if (str === '一般之使用者') {
    const target = elementDOM.querySelector('option.normal')
    target.setAttribute('selected', true)
  } else if (str === '遭停權使用者') {
    const target = elementDOM.querySelector('option.banned')
    target.setAttribute('selected', true)
  } else if (str === '管理員') {
    const target = elementDOM.querySelector('option.admin')
    target.setAttribute('selected', true)
  } else if (str === '最高管理員') {
    const target = elementDOM.querySelector('option.topAdmin')
    target.setAttribute('selected', true)
  }
}

boardUserArea.addEventListener('click', (e) => {
  if (e.target.classList.contains('update__user-auth')) {
    // 當介面在 width:660px 以下時，變更權限的按鈕是超連結，因此要停止預設行為
    e.preventDefault()
    if (e.target.innerText === '變更權限') {
      e.target.innerText = '儲存變更'
    } else {
      e.target.innerText = '變更權限'
    }

    const closest = e.target.closest('.board__comment.board__user')
    const userAuthText = closest.querySelector('.user__auth-text')
    const userAuthForm = closest.querySelector('.user__auth-form')
    userAuthText.classList.toggle('hide')
    userAuthForm.classList.toggle('hide')

    // 讓權限選單的預設選項會跟使用者當前的權限身份一樣
    const userAuthStr = userAuthText.innerText
    optionAddSelected(userAuthStr, userAuthForm)

    closest.addEventListener('click', (e) => {
      if (e.target.innerText === '儲存變更') {
        userAuthForm.submit()
      // 這邊如果單用 console.log(n) 看，不知道為什麼印出的次數很詭異(好像被呼叫了不止一次)
      }
    })
  }
})
