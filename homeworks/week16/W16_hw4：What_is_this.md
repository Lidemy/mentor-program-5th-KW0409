<h3>hw4：What is this?</h3>

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```js
const obj = {
  value: 1,
  hello: function () {
    console.log(this.value);
  },
  inner: {
    value: 2,
    hello: function () {
      console.log(this.value);
    },
  },
};

const obj2 = obj.inner;
const hello = obj.inner.hello;

obj.inner.hello();
obj2.hello();
hello();
```

#### 答：

首先要知道 `this` 通常只會在物件導向裡面使用，是用來存取『目前對應到的 instance』，也就是『目前在呼叫 function 的這個 instance』，例如：

```js
class test {
  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

var a = new test();
a.setName("AA");
console.log("a:", a.getName());

var b = new test();
b.setName("BB");
console.log("b:", b.getName());

// 輸出結果
// a: AA
// b: BB
```

至於如果只是單純在呼叫一個物件裡的 `this` 時，首先要知道另外一種呼叫 function 的方式 `call()`，`call()` 的第一個參數，就會是 this 的值，而後面的參數則可以放要傳入 function 的參數值，例如：

```js
function example(a, b) {
  console.log("this:", this);
  console.log("a:", a);
  console.log("b:", b);
}

example.call("good", 1, 2);

// 輸出結果
// this: [String: 'good']
// a: 1
// b: 2
```

因此在呼叫一個物件裡的 `this` 時，可以把 function call 用 `call()` 的形式來呼叫，`call()` 的第一個參數就會是呼叫的 function() 前面的值，而第一個參數是什麼，this 的值就會是什麼，例如：

```js
"use strict"; // 開啟嚴格模式

const obj = {
  example: {
    a: 123,
    test: function () {
      console.log(this);
    },
  },
};

const func = obj.example.test;
func();
obj.example.test();

// 輸出結果
// func() => undefined
// 用 call() 來呼叫的話，因為 func() 前面沒有東西，因此會轉換成 func.call()
// 所以輸出就會是 undefined

// obj.example.test() => { a: 123, test: [Function: test] }
// 用 call() 來呼叫的話，因為 test() 前面的值為 obj.example，因此會轉換成 obj.example.test.call(obj.example)
// 所以輸出就會是 obj.example，也就是 { a: 123, test: [Function: test] }
```

<br>

有了這些知識後，可知道**題目的程式碼可以看成如下**

```js
const obj = {
  value: 1,
  hello: function () {
    console.log(this.value);
  },
  inner: {
    value: 2,
    hello: function () {
      console.log(this.value);
    },
  },
};

const obj2 = obj.inner;
const hello = obj.inner.hello;
obj.inner.hello(); // => obj.inner.hello.call(obj.inner)，因此 this = obj.inner
obj2.hello(); // => obj2.hello.call(obj2) => obj.inner.hello.call(obj.inner)，因此 this = obj.inner
hello(); // => hello.call()，因此 this = undefined
```

因此**最後的輸出會是如下**

```js

2
2
undefined

=================================================
(如果是在 "use strict" 模式下)

TypeError: Cannot read property 'value' of undefined

// 因為執行到 hello() 時，其中 this 的值是 undefined，因此在執行 console.log(this.value) 時
// 會因為無法存取 undefined.value，而出現這樣的錯誤提示

```
