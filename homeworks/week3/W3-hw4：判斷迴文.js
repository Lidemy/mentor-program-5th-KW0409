
/*

迴文的定義很簡單，就是你把一個字串倒過來以後還是長的跟原字串一樣

舉例來說，aba 倒過來還是 aba，我們就稱 aba 為迴文
abab 倒過來變成 baba，跟原本的字串不一樣，就不是迴文

現在給你一個字串 S，請輸出 S 是否為迴文

Input
一個字串 S，1<=length(S)<=100

Output
若是迴文請輸出 True，否之則輸出 False

*/

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line)
})

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines)
})

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
  const input = lines[0]
  let opposite = ''
  for (let i = input.length - 1; i >= 0; i--) {
    opposite += input[i]
  }
  if (opposite === input) {
    console.log('True')
  } else {
    console.log('False')
  }
}

solve(['abbbba'])
