
/*

為了決定自我介紹的順序，班長決定來玩比大小
A 跟 B 兩個人會各自挑好一個數字，挑好以後就不能更改了，接著班長會說要比大還是比小
說完之後兩個人同時講出自己挑好的數字，根據比大或是比小來決定勝負
班長把每一組挑的數字以及比大比小寫在一張紙上，現在請你根據紙上面的輸入，輸出最後比賽的結果

Input
輸入第一行會是一個數字 M，1<=M<=50，代表一共有幾組比賽的結果

接著每一行會有三個用空白分隔的數字 A, B, K
A 代表 A 選擇的數字，
B 代表 B 選擇的數字，兩者皆保證為正整數
要特別注意的是 A 與 B 可能是很大的數字，但保證長度為 512 個位數以內

K 只會有兩種情況：1 或是 -1，
K 若是 1 代表數字大的獲勝，
K 若是 -1 代表數字小的獲勝

Output
針對每一筆輸入，請輸出贏家是誰。
 A 贏請輸出 A，
 B 贏請輸出 B，
平手則輸出 DRAW

*/

// 解法1
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line)
})

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
  for (let i = 1; i < lines.length; i++) {
    console.log(judge(lines[i].split(' ')))
  }
}

function judge(arr) {
  const a = arr[0]
  const b = arr[1]
  const K = Number(arr[2])
  if (a === b) {
    return 'DRAW'
  } else if (K === 1) {
    if (a.length === b.length) {
      return a > b ? 'A' : 'B'
    } else {
      return a.length > b.length ? 'A' : 'B'
    }
  } else {
    if (a.length === b.length) {
      return a < b ? 'A' : 'B'
    } else {
      return a.length < b.length ? 'A' : 'B'
    }
  }
}

solve(['3', '1 2 1', '11 12 -1', '99 99 1'])

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines)
})

/*
解法2

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
  for(let i=1; i<lines.length; i++){
    console.log(judge(lines[i].split(' ')))
  }
}

function judge(arr){
  let a = arr[0]
  let b = arr[1]
  let K = Number(arr[2])
  if(a === b){
    return 'DRAW'
  }else if(K === 1){
    if(a.length === b.length){
      for(let i=0; i<a.length; i++){
        if(a[i] === b[i]){
          continue
        }else if(a[i] > b[i]){
          return 'A'
        }else{
          return 'B'
        }
      }
    }else{
      return a.length > b.length ? 'A' : 'B'
    }
  }else{
    if(a.length === b.length){
      for(let i=0; i<a.length; i++){
        if(a[i] === b[i]){
         continue
        }else if(a[i] < b[i]){
          return 'A'
        }else{
          return 'B'
        }
      }
    }else{
      return a.length < b.length ? 'A' : 'B'
    }
  }
}

solve(['3','1 2 1','11 12 -1','99 99 1'])

*/
