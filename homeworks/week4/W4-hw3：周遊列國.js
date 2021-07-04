
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
// const process = require('process') (不需要 require 也可以用，因為本來就是 node.js 內建的套件)

request(`https://restcountries.eu/rest/v2/name/${process.argv[2]}`,
  (error, response, body) => {
    if (error) {
      console.log(error)
      return
    }

    if (response.statusCode === 404) {
      console.log('找不到國家資訊')
      return
    }

    let json
    try {
      json = JSON.parse(body)
    } catch (error) {
      console.log(error)
      return
    }

    for (let i = 0; i < json.length; i++) {
      console.log('============')
      console.log('國家：', json[i].name)
      console.log('首都：', json[i].capital)
      console.log('貨幣：', json[i].currencies[0].code)
      console.log('國碼：', json[i].callingCodes[0])
    }
  }
)

/*
Huli 作業 example 寫法

const request = require('request');
const args = process.argv;
const API_ENDPOINT = 'https://restcountries.eu/rest/v2';

const name = args[2];

// 此處是不好的寫法，因為照理來說，只有在 function 裏面可以用 return，這邊可以用是因為在 node.js 的環境下(browser 上就不行)，這一整個程式碼會被 node.js 包成一個 function 來執行，所以才不會出錯(但是有開 eslint 的狀態下， eslint 會認爲是錯誤，因為 eslint 不知道可以這樣寫)，不然就是要自己把程式碼包成一個 function，這樣 eslint 就不會顯示錯誤

if (!name) {
  return console.log('請輸入國家名稱');
}

request(`${API_ENDPOINT}/name/${name}`, (err, res, body) => {
  if (err) {
    return console.log('抓取失敗', err);
  }
  const data = JSON.parse(body);
  if (data.status === 404) {
    return console.log('找不到國家資訊')
  }

  for (let i = 0; i < data.length; i++) {
    console.log('============')
    console.log('國家：' + data[i].name);
    console.log('首都：' + data[i].capital);
    console.log('貨幣：' + data[i].currencies[0].code);
    console.log('國碼：' + data[i].callingCodes[0]);
  }
})

*/
