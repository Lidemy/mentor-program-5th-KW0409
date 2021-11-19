
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/W13_hw2_JS_board_index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'commentPlugin'
    // 加上 library 這個設定，就可以讓打包出來的東西變成一個 global 變數
  }
}
