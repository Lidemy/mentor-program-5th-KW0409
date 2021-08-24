
const nicknameBtn = document.querySelector('.update__nickname-btn')
const nicknameForm = document.querySelector('.board__nickname-form')
const commentForm = document.querySelector('.board__comment-form')

nicknameBtn.addEventListener('click', () => {
  if (nicknameBtn.innerText === '編輯暱稱') {
    nicknameBtn.innerText = '取消編輯'
  } else {
    nicknameBtn.innerText = '編輯暱稱'
  }
  nicknameForm.classList.toggle('hide')
  commentForm.classList.toggle('hide')
})
