
/*

給定一個字串，請「印出」反轉之後的樣子（不能使用內建的 reverse 函式）

reverse('yoyoyo')
正確輸出：oyoyoy

reverse('1abc2')
正確輸出：2cba1

reverse('1,2,3,2,1')
正確輸出：1,2,3,2,1

*/

function reverse(str) {
  let newStr = ''
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str[i]
  }
  console.log(newStr)
}

// reverse('yoyoyo') // oyoyoy
// reverse('1abc2')  // 2cba1
reverse('1,2,3,2,1') // 1,2,3,2,1
