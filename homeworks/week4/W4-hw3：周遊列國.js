
/*

你的好麻吉小立是一個很愛到處旅遊的人，在前一陣子才靠著便宜的 bug 機票以及特價的商務艙玩遍了許多地方。不過小立一直有個困擾，那就是他希望了解更多跟國家有關的知識，因此他來請你幫忙寫一個搜尋國家資訊的小程式。

這個程式很簡單，只要輸入國家的英文名字，就能夠查詢符合的國家的資訊，會輸出以下幾項：
國家名稱
首都
使用的貨幣名稱
電話國碼

相關的資訊都可以在這個佛心的 API 找到：https://restcountries.eu/#api-endpoints-name

請參考以下範例：
node hw3.js tai

============
國家：Taiwan
首都：Taipei
貨幣：TWD
國碼：886
============
國家：United Kingdom of Great Britain and Northern Ireland
首都：London
貨幣：GBP
國碼：44
============
國家：Lao People's Democratic Republic
首都：Vientiane
貨幣：LAK
國碼：856

*/

const request = require('request')
const process = require('process')
/* eslint-disable-next-line */
request('https://restcountries.eu/rest/v2/name/' + process.argv[2], (error, response, body) => {
  if (response.statusCode === 404) {
    console.log('找不到國家資訊')
  } else {
    const json = JSON.parse(body)
    for (let i = 0; i < json.length; i++) {
      console.log('============')
      console.log('國家：', json[i].name)
      console.log('首都：', json[i].capital)
      console.log('貨幣：', json[i].currencies[0].code)
      console.log('國碼：', json[i].callingCodes[0])
    }
  }
})
