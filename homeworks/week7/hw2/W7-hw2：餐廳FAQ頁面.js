
// 選取 Q1~6 的父元素來做事件代理
const webBody = document.querySelector('.web__body')

// 事件代理及展開收合 Q1~6 內容的功能
webBody.addEventListener('click', (e) => {
  if (e.target.parentNode.classList.contains('read-more')) {
    const element = e.target.parentNode.querySelector('.stretch-text')
    element.classList.toggle('hide')
  } else if (e.target.parentNode.parentNode.classList.contains('read-more')) {
    const element = e.target.parentNode.parentNode.querySelector('.stretch-text')
    element.classList.toggle('hide')
  }
})

/*
// 用 appendChild 的方式做出展開收合內容的功能

msg1 = `
收到商品後如果有瑕疵或是缺件寄錯商品請於七天內提出，超過七天一律不受理。<br>
很抱歉讓您收到有問題的商品，如您的商品有問題，為加速處理流程，您可以拍照上傳至信箱，並留下您的問題說明，客服人員將會盡力幫您幫處理。`

msg2 = `目前我們有提供以下付款方式：現金付款、信用卡（限台灣發行之信用卡）`

msg3 = `
Just A Bite! 提供您簡單又安全的購物流程，不需加入會員即可進行訂購，<br>
親切易懂的指引式流程畫面，讓您充分享受便利的購物樂趣。<br>
購物流程：選擇商品品項、口味及數量→加入購物車→結帳→登入會員（也可不登入會員直接購買）→選擇付款方式與填寫收件資料→提交訂單等候商品送達`

msg4 = `
1.請點選右上角的「查詢訂單」，輸入您的訂單編號及電話，即可查詢該訂單的處理狀態。<br>
2.登入「會員」購買，將可以瀏覽歷史訂單紀錄以及訂單填寫的詳細資訊。`

msg5 = `
請點選右上角的「查詢訂單」，輸入您的訂單編號及電話，即可查詢該訂單的處理狀態。<br>
如您目前的訂單狀態為「訂單成功」並發現下錯訂單，可立即搜尋並取消訂單重新訂購。<br>
為避免影響商品庫存及避免帳務錯誤，請恕我們無法為您再將訂單「修改」或「加購」或「合併」訂單商品喔。<br>
若訂單狀態非「訂單成功」狀態且已付款，並發現訂單錯誤需要修改，請聯繫客服處理，將協助您取消訂單及退款。`

msg6 = `
1.配送時間：當訂單狀態顯示為「付款成功」後，天氣狀況如為「晴朗」，則將於七個時辰內送出。<br>
2.到貨時間：到貨時間端看配送外送員當天的心情，當訂單狀態顯示為「外送員不開心中」，表示送達時間最快約在三天後到。<br>
3.配送方式：宅配（台灣11路公車）商品直接配送至您所填寫的取貨地址`

const msg = []
msg.push(msg1, msg2, msg3, msg4, msg5, msg6)

function appendAnsText(i, element) {
  if (element.classList.contains('read-more')) {
    const ansText = document.createElement('div')
    ansText.classList.add(`web__body-q${i}-text`, 'append')
    ansText.innerHTML = msg[i-1]
    element.appendChild(ansText);
    element.classList.remove('read-more')
    element.classList.add('close')
  } else if (element.classList.contains('close')) {
    const ansText = element.querySelector(`.web__body-q${i}-text.append`)
    element.removeChild(ansText);
    element.classList.remove('close')
    element.classList.add('read-more')
  }
}

for (let i = 1; i <= 6; i++) {
  const element = document.querySelector(`.web__body-q${i}-area`)
  element.addEventListener('click',function() {
    appendAnsText(i, element)
  })
}
*/
