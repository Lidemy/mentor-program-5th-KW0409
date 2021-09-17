
// 宣告 Twitch API & Client-ID
const TWITCH_API = 'https://api.twitch.tv/kraken'
const CLIENT_ID = '3dfybgs56qioien34vdnpoktpkim0x'

// 串接 Twitch API 抓取 TOP5 遊戲名稱的 function
async function getGameNameAPI() {
  const response = await fetch(`${TWITCH_API}/games/top?limit=5`, {
    method: 'GET',
    headers: new Headers({
      // Client-ID 是因為有 - (減號)，所以才要用字串包起來，不然通常來說是不需要的
      'Client-ID': CLIENT_ID,
      Accept: 'application/vnd.twitchtv.v5+json'
    })
  })

  let obj
  try {
    obj = await response.json()
    const data = obj.top
    const gameNameArr = []
    for (let i = 0; i < data.length; i++) {
      gameNameArr.push(data[i].game.name)
    }

    return gameNameArr
  } catch (err) {
    alert('Name 資料獲取異常，請在稍後重試！')
    console.log('error:', err)
  }
}

// 串接 Twitch API 抓取 top20 live streams 資料的 function
async function getStreamsDataAPI(gameName) {
  const encodeStr = encodeURIComponent(gameName)
  const response = await fetch(`${TWITCH_API}/streams/?game=${encodeStr}&limit=20`, {
    method: 'GET',
    headers: new Headers({
      'Client-ID': CLIENT_ID,
      Accept: 'application/vnd.twitchtv.v5+json'
    })
  })

  let obj
  try {
    obj = await response.json()
    const data = obj.streams

    return data
  } catch (err) {
    alert('Stream 資料獲取異常，請在稍後重試！')
    console.log('error:', err)
  }
}

const streamCardArea = document.querySelector('.stream__card-area')
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

// 顯示選擇的 live streams 的遊戲名稱和 top20 stream cards 的 function
async function showLiveStreams(gameName) {
  const category = document.querySelector('.live__stream-category > h2')
  category.innerText = gameName
  streamCardArea.innerHTML = ''
  /* 也可以用刪除所有子節點的寫法，如下
  while(streamCardArea.firstChild){
    streamCardArea.removeChild(streamCardArea.firstChild)
  }
  */
  const data = await getStreamsDataAPI(gameName)
  appendStreamCard(data)
}

// 讓每次刷新網頁時會顯示隨機 TOP1~5 遊戲的 live streams
function showRandomLiveStreams(gameNameArr) {
  const randomNum = (Math.ceil(Math.random() * 5)) - 1
  const gameName = gameNameArr[randomNum]
  showLiveStreams(gameName)
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

// 每次刷新頁面時要呼叫的 function
async function init(func1, func2) {
  const gameNameArr = await getGameNameAPI()

  func1(gameNameArr)
  func2(gameNameArr)
}

document.addEventListener('DOMContentLoaded', () => {
  // navName => 動態寫入 navbarList 上 TOP5 遊戲名稱
  // showRandomLiveStreams => 讓每次刷新網頁時會顯示隨機 TOP1~5 遊戲的 live streams
  init(navName, showRandomLiveStreams)

  // 當點擊 navbar 上的遊戲名稱時會顯示相對應的 top20 live streams
  const navbar = document.querySelector('nav.wrapper')
  navbar.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav')) {
      const gameName = e.target.innerText
      showLiveStreams(gameName)
    }
  })
})
