
// 設常數 q1~6Title 來選取 q1~q6的標題區
const q1Title = document.querySelector('.web__body-q1-title')
const q2Title = document.querySelector('.web__body-q2-title')
const q3Title = document.querySelector('.web__body-q3-title')
const q4Title = document.querySelector('.web__body-q4-title')
const q5Title = document.querySelector('.web__body-q5-title')
const q6Title = document.querySelector('.web__body-q6-title')

// 此為利用 classList.toggle 的方式作出展開收合內容的功能
q1Title.addEventListener('click', () => {
  const q1Ans = document.querySelector('.web__body-q1-text')
  q1Ans.classList.toggle('hide')
})

q2Title.addEventListener('click', () => {
  const q2Ans = document.querySelector('.web__body-q2-text')
  q2Ans.classList.toggle('hide')
})

q3Title.addEventListener('click', () => {
  const q3Ans = document.querySelector('.web__body-q3-text')
  q3Ans.classList.toggle('hide')
})

q4Title.addEventListener('click', () => {
  const q4Ans = document.querySelector('.web__body-q4-text')
  q4Ans.classList.toggle('hide')
})

q5Title.addEventListener('click', () => {
  const q5Ans = document.querySelector('.web__body-q5-text')
  q5Ans.classList.toggle('hide')
})

q6Title.addEventListener('click', () => {
  const q6Ans = document.querySelector('.web__body-q6-text')
  q6Ans.classList.toggle('hide')
})

/*
此為用 appendChild 的方式做出展開收合內容的功能

q1_btn.addEventListener('click',function(){
  const q1 = document.querySelector('.web__body-q1-area')
  if(q1.classList.contains('close')){
    let q1_ans = document.createElement('div')
    q1_ans.classList.add('web__body-q1-text')
    q1_ans.innerHTML =
    `收到商品後如果有瑕疵或是缺件寄錯商品請於七天內提出，超過七天一律不受理。<br>
    很抱歉讓您收到有問題的商品，如您的商品有問題，為加速處理流程，您可以拍照上傳至信箱，並留下您的問題說明，客服人員將會盡力幫您幫處理。`
    q1.appendChild(q1_ans);
    q1.classList.remove('close')
    q1.classList.add('open')
  }else if(q1.classList.contains('open')){
    let q1_ans = document.querySelector('.web__body-q1-text')
    q1.removeChild(q1_ans);
    q1.classList.remove('open')
    q1.classList.add('close')
  }
})

*/
