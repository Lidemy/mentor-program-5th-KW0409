
/*
最開始嘗試的程式碼，是先在 HTML 上做好預設的 <a> 標籤和內容，
再用 innerText 去改的方式

const nav1 = document.querySelector('.nav1')
const nav2 = document.querySelector('.nav2')
const nav3 = document.querySelector('.nav3')
const nav4 = document.querySelector('.nav4')
const nav5 = document.querySelector('.nav5')

const request = new XMLHttpRequest()
request.open('GET',`https://api.twitch.tv/kraken/games/top?client_id=3dfybgs56qioien34vdnpoktpkim0x&limit=5`,true)
request.setRequestHeader('Accept','application/vnd.twitchtv.v5+json')
request.send()
request.onload = function() {
  if(request.status >=200 && request.status < 400){
    const obj = JSON.parse(request.responseText)
    const data = obj.top
    const str1 = data[0].game.name
    nav1.innerText = `${str1}`

    const str2 = data[1].game.name
    nav2.innerText = `${str2}`

    const str3 = data[2].game.name
    nav3.innerText = `${str3}`

    const str4 = data[3].game.name
    nav4.innerText = `${str4}`

    const str5 = data[4].game.name
    nav5.innerText = `${str5}`
  }
}
*/

// 宣告 Twitch API & Client-ID
const TWITCH_API = 'https://api.twitch.tv/kraken'
const CLIENT_ID = '3dfybgs56qioien34vdnpoktpkim0x'

// 串接 Twitch API 抓取 TOP5 遊戲名稱的 function
function getGameName(callback) {
  const request = new XMLHttpRequest()
  request.open('GET', `${TWITCH_API}/games/top?&limit=5`, true)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.send()
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data
      try {
        data = JSON.parse(request.responseText).top
      } catch (e) {
        alert('response 的格式有誤')
        console.log(e)
        return
      }

      const gameNameArr = []
      for (let i = 0; i < data.length; i++) {
        gameNameArr.push(data[i].game.name)
      }
      callback(gameNameArr)
    }
  }
  request.onerror = function() {
    alert('connect error!')
  }
}

// 動態寫入 navbarList 上 TOP5 遊戲名稱的 function
function navName(gameNameArr) {
  const navbarList = document.querySelector('.navbar__area-right')

  for (let i = 0; i < gameNameArr.length; i++) {
    const element = document.createElement('a')
    element.classList.add('nav', `nav${i + 1}`)
    element.innerText = gameNameArr[i]
    navbarList.appendChild(element)
  }
}

// 動態寫入 navbarList 上 TOP5 遊戲名稱
getGameName(navName)

// 宣告 streamCard 的 HTML 的樣板
const streamCardTemplate = `
<a href="#link" target="_blank">
  <div class="game-view">
    <img src="#preview" width="100%" height="100%">
  </div>
  <div class="game-info">
    <div class="hoster-photo">
      <img src="#logo" width="100%" height="100%">
    </div>
    <div class="hoster-info">
      <div class="vid-name">#status</div>
      <div class="hoster-name">#name</div>
    </div>
  </div>
</a>
`

const streamCardArea = document.querySelector('.stream__card-area')

// 用來動態寫入 top20 stream cards 並產生隱形卡牌的 function
function appendStreamCard(data) {
  for (let i = 0; i < data.length; i++) {
    const channelURL = data[i].channel.url
    const viewUrl = data[i].preview.large
    const hosterAvatar = data[i].channel.logo
    const streamName = data[i].channel.status
    const hosterName = data[i].channel.display_name
    const streamCard = document.createElement('div')
    streamCard.classList.add('game-link')
    streamCard.innerHTML = streamCardTemplate
      .replace('#link', channelURL)
      .replace('#preview', viewUrl)
      .replace('#logo', hosterAvatar)
      .replace('#status', streamName)
      .replace('#name', hosterName)
    streamCardArea.appendChild(streamCard)
  }
  // 在 stream__card-area 的最後插入兩個隱形的卡牌，讓最後一行顯示的 live stream cards 永遠都會是靠左排列
  const noneCard = document.createElement('div')
  noneCard.classList.add('game-link', 'none')
  for (let i = 1; i <= 2; i++) {
    const cloneCard = noneCard.cloneNode(true)
    streamCardArea.appendChild(cloneCard)
  }
}

// 抓取 top20 live streams 資料的 function
function getStreamsData(gameName, callback) {
  const encodeStr = encodeURIComponent(gameName)
  const request = new XMLHttpRequest()
  request.open('GET', `${TWITCH_API}/streams/?game=${encodeStr}&limit=20`, true)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.send()
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data
      try {
        data = JSON.parse(request.responseText).streams
      } catch (e) {
        alert('response 的格式不正確')
        console.log(e)
        return
      }

      callback(data)
    }
  }
}

// 顯示選擇的 live streams 的遊戲名稱和 top20 stream cards 的 function
function showLiveStreams(gameName) {
  const category = document.querySelector('.live__stream-category > h2')
  category.innerText = gameName
  streamCardArea.innerHTML = ''
  /* 也可以用刪除所有子節點的寫法，如下
  while(streamCardArea.firstChild){
    streamCardArea.removeChild(streamCardArea.firstChild)
  }
  */
  getStreamsData(gameName, appendStreamCard)
}

// 讓每次刷新網頁時會顯示隨機 TOP1~5 遊戲的 live streams
getGameName((gameNameArr) => {
  const randomNum = Math.ceil(Math.random() * 5)
  const gameName = gameNameArr[randomNum]
  showLiveStreams(gameName)
})

// 當點擊 navbar 上的遊戲名稱時會顯示相對應的 top20 live streams
const navbar = document.querySelector('nav.wrapper')

navbar.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav')) {
    const gameName = e.target.innerText
    showLiveStreams(gameName)
  }
})
