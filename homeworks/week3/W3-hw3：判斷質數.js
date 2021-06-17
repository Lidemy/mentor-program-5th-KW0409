
/*

如果一個大於 1 的正整數的因數除了 1 和自己以外就沒有其他的了，那就是質數，以下是前 10 個數字的因數：

1: 1
2: 1, 2
3: 1, 3
4: 1, 2, 4
5: 1, 5
6: 1, 2, 3, 6
7: 1, 7
8: 1, 2, 4, 8
9: 1, 3, 9
10: 1, 2, 5, 10

根據因數可得知，1~10 的質數為：2, 3, 5, 7
現在給你一些數字，請輸出每一個數字是否為質數

Input
第一行為一個正整數 N，1<=N<=100，代表一共有幾個數字

接下來 N 行每一行都包含了一個正整數 P，1<=P<=100000

Output
針對每一筆輸入，如果 P 是質數，輸出：Prime，否之則輸出 Composite
（附註：Composite 是合數的意思，不過有一點要注意的是 1 不是質數也不是合數，但在這一題裡面一樣要輸出Composite）

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
  for (let i = 1; i <= N; i++) {
    const n = Number(lines[i])
    console.log(findPrime(n))
  }
}

function findPrime(n) {
  if (n === 1) {
    return 'Composite'
  } else if (n === 2) {
    return 'Prime'
  } else {
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        return 'Composite'
      }
    }
    return 'Prime'
  }
}

solve(['5', '1', '2', '3', '4', '5'])
