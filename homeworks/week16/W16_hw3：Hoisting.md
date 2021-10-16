<h3>hw3：Hoisting</h3>

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```js
var a = 1;

function fn() {
  console.log(a);

  var a = 5;
  console.log(a);

  a++;
  var a;
  fn2();
  console.log(a);

  function fn2() {
    console.log(a);
    a = 20;
    b = 100;
  }
}

fn();
console.log(a);

a = 10;
console.log(a);
console.log(b);
```

#### 答：

首先要知道變數會有 Hoisting(提升) 的特性，但這個特性，只會提升宣告，而不會提升賦值，例如：

```js
console.log(a);

//輸出結果
//ReferenceError: a is not defined

=================================================

console.log(a);
var a = 10;

// 輸出結果
// undefined
```

在第一個例子中，因為變數 a 根本不存在所在最後會因為找不到變數而出現錯誤的提示
而在第二個例子中，雖然 `console.log(a)` 的執行順序在 `var a = 10` 之前，但因為變數 a 的宣告被提升(賦值沒有)，因此不會出現錯誤的提示，而是會出現預設的變數值 undefined，因此第二個例子也可以看成如下，

```js
console.log(a);
var a = 10;

// 輸出結果
// undefined

=======  上下兩個是相同的  =======

var a;
console.log(a);
a = 10;

// 輸出結果
// undefined
```

而 Hoisting 的特性也是有著優先度的概念，順序為 function > argument > 一般的變數宣告(ex: var)
並且因為 hoisting 是跟變數有關的，因此 hoisting 只會發生在 『變數自己的 scope 中』，但如果在 function 中對一個完全不存在的變數賦值時(ex: b = 10)，就會直接在 global 的環境宣告一個全域變數(同樣只會提升宣告，不會提升賦值)。
**(更確切的過程是，JS 引擎會先順著 scope chain 一層層上去找，如果都沒找到就會幫我們在最外層 global 宣告)**

- **注意**： 『如果在 function 中對一個完全不存在的變數賦值時(ex: b = 10)，就會直接在 global 的環境宣告一個全域變數(同樣只會提升宣告，不會提升賦值)』，這一情況的前提是在非 `use strict` 的模式下
  如果是在 `use strict` 的模式下，則會變成出現 `RefernceError: b is not defined` 的錯誤

而 let 與 const 的 hoisting 的表現方式也比較不一樣，雖然也會有 hoisting 的現象，但是這兩者在被賦值之前，都是不能存取的，如果存取的話就會出現錯誤，因此如果有 `console.log(a)` 出現在 `let a = 10` 或 `const a = 10` 之前的話，因為 hoisting 只會提升宣告而不會提升賦值，所以會出現錯誤提示而不會是 undefined，`let`, `const` 這樣的特性被稱為 TDZ(Temporal Dead Zone，暫時死區)

- **注意**： `const` 跟 `var`, `let` 的不一樣，在用 `const` 宣告的同時就必須要賦值，否則即使沒有去存取 `const` 的值，整個程式碼也會出錯

<br>

有了這些知識後，可知道**題目的程式碼可以看成如下**

```js
// 原本的樣子
var a = 1;

function fn() {
  console.log(a);

  var a = 5;
  console.log(a);

  a++;
  var a;
  fn2();
  console.log(a);

  function fn2() {
    console.log(a);
    a = 20;
    b = 100;
  }
}

fn();
console.log(a);

a = 10;
console.log(a);
console.log(b);

=================================================

// Hoisting 之後可看成這樣

var a = 1;
var b

function fn() {
  var a
  console.log(a);

  a = 5;
  console.log(a);

  a++;
  fn2();
  console.log(a);

  function fn2() {
    console.log(a);
    a = 20;
    b = 100;
  }
}

fn();
console.log(a);

a = 10;
console.log(a);
console.log(b);

```

可知道**執行步驟如下：**

1. 因為進入 `global` 的執行環境，因此 call stack 出現 `main()`
2. 開始執行 `global` 環境(也就是 main())中的程式碼
3. 宣告一個 `global` 的全域變數 `var a = 1`
4. 宣告一個 `global` 的全域變數 `var b`
5. call stack 出現 `fn()`
6. 開始執行 `fn()` 中的程式碼
7. 宣告一個 `fn()` 中的全域變數 `var a`
8. call stack 出現 `console.log(a)`
9. 執行 `console.log(a)`(會找到 `fn()` 中的全域變數 a，此時 `a = undefined`)
10. 移除 call stack 中的 `console.log(a)`
11. 讓 `fn()` 中的全域變數 `a = 5`
12. call stack 出現 `console.log(a)`
13. 執行 `console.log(a)`(會找到 `fn()` 中的全域變數 a，此時 `a = 5`)
14. 移除 call stack 中的 `console.log(a)`
15. 讓 `fn()` 中的全域變數 `a++`，也就是 `a = 6`
16. call stack 出現 `fn2()`
17. 開始執行 `fn2()` 中的程式碼
18. call stack 出現 `console.log(a)`
19. 執行 `console.log(a)`(因為在 `fn2()` 沒有變數 a，因此會找到上一層的 `fn()` 中的全域變數 a，此時 `a = 6`)
20. 移除 call stack 中的 `console.log(a)`
21. 讓 `fn()` 中的全域變數 `a = 20`(因為在 `fn2()` 沒有變數 a，因此會找到上一層的 `fn()` 中的全域變數 a)
22. 讓 `global` 中的全域變數 `b = 100`(因為在 `fn2()` 沒有變數 b，因此會找到上一層的 `fn()`，但 `fn()` 也沒有變數 b，因此會再找到上一層的 `global` 中的全域變數 b)
23. 移除 call stack 中的 `fn2()`
24. 移除 call stack 中的 `fn()`
25. call stack 出現 `console.log(a)`
26. 執行 `console.log(a)`(會找到 `global` 中的全域變數 a，此時 `a = 1`)
27. 移除 call stack 中的 `console.log(a)`
28. 讓 `global` 中的全域變數 `a = 10`
29. call stack 出現 `console.log(a)`
30. 執行 `console.log(a)`(會找到 `global` 中的全域變數 a，此時 `a = 10`)
31. 移除 call stack 中的 `console.log(a)`
32. call stack 出現 `console.log(b)`
33. 執行 `console.log(b)`(會找到 `global` 中的全域變數 b，此時 `b = 100`)
34. 移除 call stack 中的 `console.log(b)`
35. 因為 `global` 環境(也就是 `main()`)中的程式碼都執行完了，因此移除 call stack 中的 `main()`
36. 執行完畢(執行結果如下)

```
undefined
5
6
20
1
10
100
```
