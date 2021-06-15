
/*

給定一字串，把第一個字轉成大寫之後「回傳」，若第一個字不是英文字母則忽略。

capitalize('nick')
正確回傳值：Nick

capitalize('Nick')
正確回傳值：Nick

capitalize(',hello')
正確回傳值：,hello

*/

function capitalize(str) {
  if (str[0] >= 'a' && str[0] <= 'z') {
    let ans = str[0].toUpperCase()
    for (let i = 1; i < str.length; i++) {
      ans += str[i]
    }
    return ans
  } else {
    return str
  }
}

// console.log(capitalize('nick')) //Nick
// console.log(capitalize('Nick')) //Nick
console.log(capitalize(',hello')) // ,hello
