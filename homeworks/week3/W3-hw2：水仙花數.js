
/*

水仙花數（Narcissistic number）的定義為：
「一個 n 位數的數字，每一個數字的 n 次方加總等於自身」

例如說 153 是三位數，而
1**3 + 5**3 + 3**3 =153
所以它就是一個水仙花數

而 1634 是四位數，而
1**4 + 6**4 + 3**4 + 4**4 =1634
所以它也是一個水仙花數

而數字 0~9 也都是水仙花數，因為一位數 n 的 1 次方一定會等於自己

現在給你一個範圍 n 到 m，請你求出這範圍之中的水仙花數有哪些

Input
輸入為兩個用空白分割的正整數 N 與 M，
1 <= N <= M <= 10**6

Output
請由小到大輸出從 N 到 M（包含 N 與 M）有哪些水仙花數，每個數字以空行分隔

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
  const [N, M] = lines[0].split(' ').map(Number)
  for (let i = N; i <= M; i++) {
    if (i >= 0 && i <= 9) {
      console.log(i)
    } else {
      let digits = 0
      let temp = i
      while (temp !== 0) {
        temp = Math.floor(temp / 10)
        digits++
      }
      let result = 0
      let temp2 = i
      while (temp2 !== 0) {
        result += (temp2 % 10) ** digits
        temp2 = Math.floor(temp2 / 10)
      }
      if (result === i) {
        console.log(i)
      }
    }
  }
}

solve(['5 200'])
