## 簡答題

#### 1. 請以自己的話解釋 API 是什麼？

#### 答：

其實 API 就好像是插座一樣，我們透過使用跟插座的規格相同的插頭，就可以獲得想要的資料，而插座的限制最大安培就像是限制能輸出什麼樣的資料一樣

#### 2. 請找出三個課程沒教的 HTTP status code 並簡單介紹

#### 答：

1. **`StatusCode：304`** **(Not Modified)**：response 的東西跟之前長一樣，直接從快取拿就好

2. **`StatusCode：401`** **(Unauthorized)**：未認證，可能需要登入或 Token

3. **`StatusCode：403`** **(Forbidden)**：沒有權限

#### 3. 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

#### 答：

**1. API 文件：**
**_Base URL_**: https://all-best-restaurant.pandaEatapp.com

| 說明         | Method | path             | 參數                     | 範例                   |
| :----------- | :----- | ---------------- | ------------------------ | ---------------------- |
| 獲取所有餐廳 | GET    | /restaurants     | \_limit:限制回傳資料數量 | /restaurants?\_limit=5 |
| 獲取單一餐廳 | GET    | /restaurants/:id | 無                       | /restaurants/10        |
| 新增餐廳     | POST   | /restaurants     | name: 餐廳名             | 無                     |
| 刪除餐廳     | DELETE | /restaurants/:id | 無                       | 無                     |
| 更改餐廳資訊 | PATCH  | /restaurants/:id | name: 餐廳名             | 無                     |

**2. API 的使用範例：**

`node hw5.js list` => **印出前二十家餐廳的 id 與名稱**

```js
const request = require("request");
const process = require("process");

if (process.argv[2] === "list") {
  request(
    "https://all-best-restaurant.pandaEatapp.com/restaurants?_limit=20",
    function (error, response, body) {
      const json = JSON.parse(body);
      for (let i = 0; i <= 19; i++) {
        console.log(json[i].id, json[i].name);
      }
    }
  );
}
```

<br><br>

`node hw5.js read 1` => **輸出 id 為 1 的餐廳**

```js
const request = require("request");
const process = require("process");

if (process.argv[2] === "read") {
  request(
    "https://all-best-restaurant.pandaEatapp.com/restaurants/" +
      process.argv[3],
    function (error, response, body) {
      const json = JSON.parse(body);
      console.log("id:", json.id);
      console.log("name:", json.name);
    }
  );
}
```

<br><br>

`node hw5.js delete 1` => **刪除 id 為 1 的餐廳**

```js
const request = require("request");
const process = require("process");

if (process.argv[2] === "delete") {
  request.delete(
    "https://all-best-restaurant.pandaEatapp.com/restaurants/" +
      process.argv[3],
    function (error, response, body) {
      console.log(response.statusCode);
    }
  );
}
```

<br><br>

`node hw5.js create "I love cooking"` => **新增一家名為 I love cooking 的餐廳**

```js
const request = require("request");
const process = require("process");

if (process.argv[2] === "create") {
  request.post(
    {
      url: "https://all-best-restaurant.pandaEatapp.com/restaurants/",
      form: {
        name: process.argv[3],
      },
    },
    function (error, response, body) {
      console.log("statusCode:", response.statusCode);
      const json = JSON.parse(body);
      console.log("id:", json.id);
      console.log("name:", json.name);
    }
  );
}
```

<br><br>

`node hw5.js update 1 "new panda"` => **更新 id 為 1 的餐廳為 new panda**

```js
const request = require("request");
const process = require("process");

if (process.argv[2] === "update") {
  request.patch(
    {
      url:
        "https://all-best-restaurant.pandaEatapp.com/restaurants/" +
        process.argv[3],
      form: {
        name: process.argv[4],
      },
    },
    function (error, response, body) {
      console.log("statusCode:", response.statusCode);
      const json = JSON.parse(body);
      console.log("id:", json.id);
      console.log("name:", json.name);
    }
  );
}
```
