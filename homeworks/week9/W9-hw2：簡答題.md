<h3>hw2：簡答題</h3>

<h4>1. 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼？</h4>

參考自 [此文章](https://saffranblog.coderbridge.io/2021/02/25/php-mysql-basics/) 中資料型別的資料。
最大的三個差別為：

1. `VARCHAR` 可以自己設定長度，但是 `TEXT` 不行(也就是如果本來就知道大概需要多少字元，就用 `VARCHAR`，這樣可以節省空間)
2. `VARCHAR` 會受到 MySQL 的 row limit 所限制(最大就是 65535 bytes)，`TEXT` 則不會
3. `VARCHAR` 的 default value 可以是任何的值(包括 null 或是其他任何的值)，`TEXT` 的 default value 只能是 null

<br>
<h4>2. Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？</h4>

1. Cookie 是一個瀏覽器儲存資料的地方，但是是一種比較老舊的儲存方式。
2. Server 可以透過在 Response header 帶著 **`Set-cookie`** 來設定 Client 端每次訪問時要帶的 Cookie，而瀏覽器看到 **`Set-cookie`** 的 Header 就會把它儲存在 Cookie，並且在每次的 request 中都會攜帶 Cookie，一旦訪問的伺服器符合 Cookie 裡攜帶的某個資料所設定的 Domain 和 Path ，該 Cookie 資料就可以被此伺服器取得。

<br>
<h4>3. 我們本週實作的留言板，你能夠想到什麼潛在的問題嗎？</h4>

其實也不太能想到什麼問題，可能就是覺得如果駭客能夠看到竊取到我們在登入的時候的 SeseionID 的話，大概就能夠偽造身份甚至去做更多的事情了，但是也不知道是不是有方法能辦到這點，還有就是如果駭客直接入侵資料庫的話，好像也是直接 Bad End 的感覺，但是也不知道這是不是我們能防範的範疇，其他的好像也想不太到了哈哈。
