<h3>hw2：Event Loop + Scope</h3>

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```js
for (var i = 0; i < 5; i++) {
  console.log("i: " + i);

  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
```

#### 答：

首先要知道 Scope 就是變數的生存範圍，在 ES6 以前，只有 `var` 這一個宣告變數的方式，因此變數的 scope 是以 function 為單位，但是在 ES6 之後，多出了 `let`, `const` 這兩種宣告變數的方式，而這兩種變數的 scope 則是以 Block( {} )為單位。

Scope 還有一個特性，那就是如果在當前的範圍找不到變數的話，只能往『上一層』找，但是不能往下一層找，例如：

```js
var a = 10;

function example() {
  console.log(a);
}

example();

//輸出結果
//10

=================================================

function example() {
  var b = 2;
}

console.log(b);

// 輸出結果
// ReferenceError: b is not defined
```

在第一個例子中，因為變數 a 所在的位置就是 `console.log(a)` 的上一層，因此即使在 `example()` 中找不到變數 a，還是能在上一層的地方找到變數 `a = 10`，而印出 10<br>而在第二個例子中，因為變數 b 所在的位置是 `console.log(b)` 的下一層，因此在同一層中找不到變數 b 時，也沒有更上一層的地方能去找，最後會因為找不到變數而出現錯誤的提示

<br>

有了這些知識後，可知道**題目的程式碼可以看成如下**

```js
// 原本的樣子
for (var i = 0; i < 5; i++) {
  console.log("i: " + i);
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}

=================================================

// 執行 for loop 之後可看成這樣

// 此時 var i = 0，可知 i < 5 為 true，執行迴圈
console.log("i: " + 0);
setTimeout(() => {
  console.log(i);
}, 0);

// 此時 i = 1，可知 i < 5 為 true，執行迴圈
console.log("i: " + 1);
setTimeout(() => {
  console.log(i);
}, 1000);

// 此時 i = 2，可知 i < 5 為 true，執行迴圈
console.log("i: " + 2);
setTimeout(() => {
  console.log(i);
}, 2000);

// 此時 i = 3，可知 i < 5 為 true，執行迴圈
console.log("i: " + 3);
setTimeout(() => {
  console.log(i);
}, 3000);

// 此時 i = 4，可知 i < 5 為 true，執行迴圈
console.log("i: " + 4);
setTimeout(() => {
  console.log(i);
}, 4000);

// 此時 i = 5，可知 i < 5 為 false，迴圈結束
```

可知道**執行步驟如下：**

1. 因為進入 `global` 的執行環境，因此 call stack 出現 `main()`
2. 開始執行 `global` 環境(也就是 `main()`)中的程式碼
3. (進入第一圈迴圈，此時 i = 0)
4. call stack 出現 `console.log("i: " + 0);`
5. 執行 `console.log("i: " + 0);`
6. 移除 call stack 中的 `console.log("i: " + 0);`
7. call stack 出現 `setTimeout(() => { console.log(i); }, 0);`
8. 因為是非同步函式，因此 Node.js 會呼叫另外一個 thread 去執行 `setTimeout(() => { console.log(i); }, 0);`
9. 移除 call stack 中的 `setTimeout(() => { console.log(i); }, 0);`
   (在另外一個 thread 中，`setTimeout(() => { console.log(i); }, 0);` 會在 0 毫秒後到期並將 **`() => { console.log(i) }`** 丟到 callback queue 中開始等待)
10. (進入第二圈迴圈，此時 i = 1)
11. call stack 出現 `console.log("i: " + 1);`
12. 執行 `console.log("i: " + 1);`
13. 移除 call stack 中的 `console.log("i: " + 1);`
14. call stack 出現 `setTimeout(() => { console.log(i); }, 1000);`
15. 因為是非同步函式，因此 Node.js 會呼叫另外一個 thread 去執行 `setTimeout(() => { console.log(i); }, 1000);`
16. 移除 call stack 中的 `setTimeout(() => { console.log(i); }, 1000);`
    (在另外一個 thread 中，`setTimeout(() => { console.log(i); }, 1000);` 會在 1000 毫秒後到期並將 **`() => { console.log(i) }`** 丟到 callback queue 中開始等待)
17. (進入第三圈迴圈，此時 i = 2)
18. call stack 出現 `console.log("i: " + 2);`
19. 執行 `console.log("i: " + 2);`
20. 移除 call stack 中的 `console.log("i: " + 2);`
21. call stack 出現 `setTimeout(() => { console.log(i); }, 2000);`
22. 因為是非同步函式，因此 Node.js 會呼叫另外一個 thread 去執行 `setTimeout(() => { console.log(i); }, 2000);`
23. 移除 call stack 中的 `setTimeout(() => { console.log(i); }, 2000);`
    (在另外一個 thread 中，`setTimeout(() => { console.log(i); }, 2000);` 會在 2000 毫秒後到期並將 **`() => { console.log(i) }`** 丟到 callback queue 中開始等待)
24. (進入第四圈迴圈，此時 i = 3)
25. call stack 出現 `console.log("i: " + 3);`
26. 執行 `console.log("i: " + 3);`
27. 移除 call stack 中的 `console.log("i: " + 3);`
28. call stack 出現 `setTimeout(() => { console.log(i); }, 3000);`
29. 因為是非同步函式，因此 Node.js 會呼叫另外一個 thread 去執行 `setTimeout(() => { console.log(i); }, 3000);`
30. 移除 call stack 中的 `setTimeout(() => { console.log(i); }, 3000);`
    (在另外一個 thread 中，`setTimeout(() => { console.log(i); }, 3000);` 會在 3000 毫秒後到期並將 **`() => { console.log(i) }`** 丟到 callback queue 中開始等待)
31. (進入第五圈迴圈，此時 i = 4)
32. call stack 出現 `console.log("i: " + 4);`
33. 執行 `console.log("i: " + 4);`
34. 移除 call stack 中的 `console.log("i: " + 4);`
35. call stack 出現 `setTimeout(() => { console.log(i); }, 4000);`
36. 因為是非同步函式，因此 Node.js 會呼叫另外一個 thread 去執行 `setTimeout(() => { console.log(i); }, 4000);`
37. 移除 call stack 中的 `setTimeout(() => { console.log(i); }, 4000);`
    (在另外一個 thread 中，`setTimeout(() => { console.log(i); }, 4000);` 會在 4000 毫秒後到期並將 **`() => { console.log(i) }`** 丟到 callback queue 中開始等待)
38. (因為此時 i = 5，可知 i < 5 為 false，因此迴圈結束)
39. 因為 `global` 環境(也就是 `main()`)中的程式碼都執行完了，因此移除 call stack 中的 `main()`
40. 此時 Event Loop 偵測到 call stack 是空的狀態，因此開始將 callback queue 的 cb 一個一個丟回 call stack 中執行
41. Event Loop 將 callback queue 中的第一個 cb (也就是 `() => { console.log(i)`) 丟回 call stack
42. call stack 出現第一個 cb `() => { console.log(i) }`
43. 執行 `() => { console.log(i) }`
44. call stack 出現 `console.log(i)`
45. 因為閉包的關係，因此可以根據 scopeChain 在 `globalVO` 找到變數 i = 5

- **注意：** 此題 JS 建立 EC 及找到變數的過程，可參考 [Huli 老師與第三期學長的討論](https://github.com/Lidemy/mentor-program-3rd-ClayGao/pull/24)

40. 執行 `console.log(5)`
41. 移除 call stack 中的 `console.log(5)`
42. 第一個 cb 執行完畢，因此移除 call stack 中的第一個 cb `() => { console.log(i) }`
43. Event Loop 將 callback queue 中的第二個 cb (也就是 `() => { console.log(i)`) 丟回 call stack
44. call stack 出現第二個 cb `() => { console.log(i) }`
45. 執行 `() => { console.log(i) }`
46. call stack 出現 `console.log(i)`
47. 因為閉包的關係，因此可以根據 scopeChain 在 `globalVO` 找到變數 i = 5
48. 執行 `console.log(5)`
49. 移除 call stack 中的 `console.log(5)`
50. 第二個 cb 執行完畢，因此移除 call stack 中的第二個 cb `() => { console.log(i) }`
51. Event Loop 將 callback queue 中的第三個 cb (也就是 `() => { console.log(i)`) 丟回 call stack
52. call stack 出現第三個 cb `() => { console.log(i) }`
53. 執行 `() => { console.log(i) }`
54. call stack 出現 `console.log(i)`
55. 因為閉包的關係，因此可以根據 scopeChain 在 `globalVO` 找到變數 i = 5
56. 執行 `console.log(5)`
57. 移除 call stack 中的 `console.log(5)`
58. 第三個 cb 執行完畢，因此移除 call stack 中的第三個 cb `() => { console.log(i) }`
59. Event Loop 將 callback queue 中的第四個 cb (也就是 `() => { console.log(i)`) 丟回 call stack
60. call stack 出現第四個 cb `() => { console.log(i) }`
61. 執行 `() => { console.log(i) }`
62. call stack 出現 `console.log(i)`
63. 因為閉包的關係，因此可以根據 scopeChain 在 `globalVO` 找到變數 i = 5
64. 執行 `console.log(5)`
65. 移除 call stack 中的 `console.log(5)`
66. 第四個 cb 執行完畢，因此移除 call stack 中的第四個 cb `() => { console.log(i) }`
67. Event Loop 將 callback queue 中的第五個 cb (也就是 `() => { console.log(i)`) 丟回 call stack
68. call stack 出現第五個 cb `() => { console.log(i) }`
69. 執行 `() => { console.log(i) }`
70. call stack 出現 `console.log(i)`
71. 因為閉包的關係，因此可以根據 scopeChain 在 `globalVO` 找到變數 i = 5
72. 執行 `console.log(5)`
73. 移除 call stack 中的 `console.log(5)`
74. 第五個 cb 執行完畢，因此移除 call stack 中的第五個 cb `() => { console.log(i) }`
75. 執行完畢(執行結果如下)

```
i: 0
i: 1
i: 2
i: 3
i: 4
5 //(且至少 0 毫秒之後才會出現)
5 //(且至少 1000 毫秒之後才會出現)
5 //(且至少 2000 毫秒之後才會出現)
5 //(且至少 3000 毫秒之後才會出現)
5 //(且至少 4000 毫秒之後才會出現)
```
