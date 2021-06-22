
/*

輸入為一個數字 N，請按照規律輸出正確圖形

N=1
*

N=2
*
**

N=3
*
**
***

....

N=10
*
**
***
****
*****
******
*******
********
*********
**********

Input
輸入為一個正整數 N，1<=N<=30

Output
請依照規律輸出正確圖形

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
  const N = Number(lines[0])
  let stars = ''
  for (let i = 1; i <= N; i++) {
    stars += '*'
    console.log(stars)
  }
}

solve(['5'])
