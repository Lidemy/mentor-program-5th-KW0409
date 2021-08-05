
const body = document.querySelector('.lottery__info-wrapper')
const apiURL = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const errorMessage1 = '回傳格式不正確，請再試一次'
const errorMessage2 = '系統不穩定，請再試一次'

function lottery(callback) {
  const request = new XMLHttpRequest()
  request.open('GET', apiURL, true)
  request.send()
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let dataObj
      try {
        dataObj = JSON.parse(request.responseText)
      } catch (e) {
        callback(errorMessage1)
        console.log(e)
        return
      }

      const { prize } = dataObj
      if (!prize) {
        callback(errorMessage2)
        return
      }

      callback(null, prize)
    } else {
      callback(errorMessage2)
    }
  }
  request.onerror = function() {
    callback(errorMessage2)
  }
}

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('lottery__info-btn')) {
    lottery((errMsg, prize) => {
      if (errMsg) {
        alert(errMsg)
        return
      }

      switch (prize) {
        case 'First': {
          const className = 'prize-1'
          const prizeText = prizeMsg.First
          showPrizeMsg(className, prizeText)
          break
        }
        case 'SECOND': {
          const className = 'prize-2'
          const prizeText = prizeMsg.Second
          showPrizeMsg(className, prizeText)
          break
        }
        case 'THIRD': {
          const className = 'prize-3'
          const prizeText = prizeMsg.Third
          const h1Class = 'white'
          showPrizeMsg(className, prizeText, h1Class)
          break
        }
        case 'NONE': {
          const className = 'prize-4'
          const prizeText = prizeMsg.None
          const h1Class = 'white'
          showPrizeMsg(className, prizeText, h1Class)
          break
        }
        default: {
          alert(errorMessage2)
        }
      }
    })
  }
})

const prizeMsg = {
  First: '恭喜你中頭獎了！日本東京來回雙人遊！',
  Second: '恭喜你抽中二獎！<br>90 吋電視一台！',
  Third: '恭喜你抽中三獎：<br>知名 YouTuber 簽名握手會入場券一張，bang！',
  None: '恭喜你抽中超級大獎了：<br>香蕉君也許會遲到但是...絕不會缺席！！'
}

function showPrizeMsg(className, prizeText, h1Class) {
  body.classList.add(className)
  body.innerHTML = `
  <div class="prize-area">
    <h1 class=${h1Class}>
      ${prizeText}
    </h1>
    <div class="lottery__info-btn" onclick="javascript:window.location.reload()">回抽獎頁面</div>
  </div>
  `
}
