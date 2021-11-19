
const errorMsg = document.querySelector('h3.error')
const articleTitle = document.querySelector('.edit-post__input')
const articleContent = document.querySelector('.edit-post__content')
const submitBtn = document.querySelector('.edit-post__btn')

submitBtn.addEventListener('click', (e) => {
  if (articleTitle.value === '' && articleContent.value === '') {
    e.preventDefault()
    errorMsg.innerText = '資料不齊：文章標題/內容皆不可為空'
    errorMsg.classList.remove('hide')
  } else if (articleTitle.value === '') {
    e.preventDefault()
    errorMsg.innerText = '資料不齊：文章標題不可為空'
    errorMsg.classList.remove('hide')
  } else if (articleContent.value === '') {
    e.preventDefault()
    errorMsg.innerText = '資料不齊：文章內容不可為空'
    errorMsg.classList.remove('hide')
  }
})
