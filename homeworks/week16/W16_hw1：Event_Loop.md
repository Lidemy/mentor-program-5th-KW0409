<h3>hw1：Event Loop</h3>

在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```js
console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

console.log(3);

setTimeout(() => {
  console.log(4);
}, 0);

console.log(5);
```

#### 答：

首先要知道，
在程式的執行中，會有一個叫做 **`call stack`** 的東西，專門紀錄 function 的執行順序和其他需要的東西的地方，
而每執行完一個 stack，就會將其在 **`call stack`** 中移除，然後再繼續往下執行，直到 call stack 被清空。

另外一個重點則是，明明 **javascript 是一個單執行緒的程式語言，也就是只有一個 thread(也就是只有一個 call stack)**，
換句話說，也就是在同一個時間只能執行一件事，但我們在執行 javascript 的時候卻能做到非同步這樣的事情，原因就在於，**『javascript 同一時間只能做一件事沒錯，但不代表我們執行 javascript 的執行環境(runtime)也是如此』**

在執行程式碼的時候，如果碰到類似 `setTimeOut(cb, n)` 這種有 callback function 的非同步函式時，執行環境就會呼叫另外一個 thread(此處簡稱 thread B) 去執行，然後 非同步函式 就會在 call stack 中被清除掉，再繼續執行下一個，而 thread B 在處理完 非同步函式 後也勢必要將 callback function 再丟回 call stack 才會被執行，但是這個 callback function 並不會被 thread B 丟回 call stack 去，而是會被丟到一個叫做 **`callback queue(或叫 task queue)`** 的地方排隊，因為在一整個執行環境中可能會有很多的 callback function 都在等待執行，所以才需要這麼一個機制，讓大家都在這邊排隊，一個一個被丟回去執行。再來就是 Event Loop 負責做的事情了，**Event Loop 會不斷的偵測 call stack 是否完全為空，如果是空的就會把 callback queue 裏面的東西一個一個丟到 call stack 去執行**

- **注意：** 即使 thread B 瞬間執行完 非同步函式 並將 callback function 丟到 callback queue 裡排隊，且此時 call stack 有很多每次都要執行很久的 stack，在 callback queue 中的事情也一樣會是最後才會被執行的，不會在中途就被丟回去 call stack。例如：假設 call stack 中只剩下一個 stack(Ａ()) 執行了很久才結束並且在這段時間內另一個 thread 中的 B(cb1()) 已經被完成並將 `cb1()` 丟進 callback queue 中等待了，這個 cb1() 也不會在 Ａ() 結束後被 Event Loop 丟到 call stack 中執行，因為在 call stack 中從進入 global 環境開始就會有一個 main() 的 stack 存在，會等到 global 環境的程式碼都執行完之後，這個 main() 的 stack 才會被清除掉，在 Event Loop 看來，此時的 call stack 才是空的狀態，Event Loop 才會開始將 callback queue 中的事情一個一個丟回 call stack 中執行，因此像是 setTimeout(cb, n) 這樣的 callback function，其中設定的過 n 毫秒之後執行 cb function，並不是保證一定會在 n 毫秒之後開始執行，而是保證『至少 n 毫秒之後』執行，因為我們沒辦法知道在 call stack 完全清空前，在其中執行的 stack 要花多長的時間。

<img src="https://user-images.githubusercontent.com/80152099/134498075-bc2ccaf3-140e-4746-be4f-ad90edf1e922.png">
<br><br>

有了這些知識後，可知道 **執行步驟如下：**

1. 因為進入 `global` 的執行環境，因此 call stack 出現 `main()`
2. 開始執行 `global` 環境(也就是 `main()`)中的程式碼
3. call stack 出現 `console.log(1)`
4. 執行 `console.log(1)`
5. 移除 call stack 中的 `console.log(1)`
6. call stack 出現 `setTimeout(() => { console.log(2) }, 0)`
7. 因為是非同步函式，因此 Node.js 會呼叫另外一個 thread 去執行 `setTimeout(() => { console.log(2) }, 0)`

- **注意：** 此處重點可參考 [Lidemy-mtr05/Week16/examples](https://github.com/Lidemy/mentor-program-5th/tree/master/examples/week16#錯誤範例)

8. 移除 call stack 中的 `setTimeout(() => { console.log(2) }, 0)`
   (在另外一個 thread 中，`setTimeout(() => { console.log(2) }, 0)` 會在 0 毫秒後到期並將 **`() => { console.log(2) }`** 丟到 callback queue 中開始等待)
9. call stack 出現 `console.log(3)`

- **注意：** 被丟到 callback queue 的不會是整段的 `setTimeOut(...)` 也不是只有 `console.log(2)` 而已，而是 setTimeOut 的第一個參數 `() => { console.log(2) }` 也就是要被執行的 callback function 參數

10. 執行 `console.log(3)`
11. 移除 call stack 中的 `console.log(3)`
12. call stack 出現 `setTimeout(() => { console.log(4) }, 0)`
13. 因為是非同步函式，因此 Node.js 會呼叫另外一個 thread 去執行 `setTimeout(() => { console.log(4) }, 0)`
14. 移除 call stack 中的 `setTimeout(() => { console.log(4) }, 0)`
    (在另外一個 thread 中，`setTimeout(() => { console.log(4) }, 0)` 會在 0 毫秒後到期並將 **`() => { console.log(4) }`** 丟到 callback queue 中開始等待)
15. call stack 出現 `console.log(5)`
16. 執行 `console.log(5)`
17. 移除 call stack 中的 `console.log(5)`
18. 因為 `global` 環境(也就是 `main()`)中的程式碼都執行完了，因此移除 call stack 中的 `main()`
19. 此時 `Event Loop` 會偵測到 call stack 是空的狀態，因此開始將 callback queue 的 cb 一個一個丟回 call stack 中執行
20. `Event Loop` 將 callback queue 中的第一個 cb (也就是 `() => { console.log(2) }`) 丟回 call stack
21. call stack 出現第一個 cb `() => { console.log(2) }`
22. 執行 `() => { console.log(2) }`
23. call stack 出現 `console.log(2)`
24. 執行 `console.log(2)`
25. 移除 call stack 中的 `console.log(2)`
26. 第一個 cb 執行完畢，因此移除 call stack 中的第一個 cb `() => { console.log(2) }`
27. `Event Loop` 將 callback queue 中的第二個 cb (也就是 `() => { console.log(4) }`) 丟回 call stack
28. call stack 出現第二個 cb `() => { console.log(4) }`
29. 執行 `() => { console.log(4) }`
30. call stack 出現 `console.log(4)`
31. 執行 `console.log(4)`
32. 移除 call stack 中的 `console.log(4)`
33. 第二個 cb 執行完畢，因此移除 call stack 中的第二個 cb `() => { console.log(4) }`
34. 執行完畢(執行結果如下)

```
1
3
5
2
4
```
