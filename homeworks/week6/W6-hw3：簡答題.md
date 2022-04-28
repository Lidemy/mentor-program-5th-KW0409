## HW3：簡答題

### 1. 請找出三個課程裡面沒有提到的 HTML 標籤並一一說明作用

### 答：

1. **`<sup></sup>`** _(superscript)_：上標，通常用來表示日期字尾或次方數（例：May 12&lt;sup&gt;th&lt;/sup&gt; => May 12<sup>th</sup>）
2. **`<sub></sub>`** _(subscript)_：下標，通常用在註解或化學式上（例：H&lt;sub&gt;2&lt;/sub&gt;0 => H<sub>2</sub>O）
3. **`<hr/>`** _(horizon)_：水平線，大小寫都可以，斜線可加可不加（例：&lt;hr/&gt; or &lt;hr&gt; ，效果顯示如下)

<hr>

### 2. 請問什麼是盒模型（box model）？

### 答：

所謂的盒模型，就是指在 CSS 中，所有的 HTML 元素都會被視為一個盒子模樣的區塊，而我們則可以透過 CSS 去設定每個盒子的外觀及位置。

盒模型的組成由外而內可分為：<br>
・**margin**（外邊距）<br>
・**border**（邊框）<br>
・**padding**（內邊距）<br>
・**content**（內容）<br>
(如下圖所示)<br>
<img width="50%" src="https://user-images.githubusercontent.com/80152099/125187233-1d86a300-e261-11eb-8d6d-ccd6b6e798a8.png">

<br>

可以看到每一個 HTML 的元素都是由這四個區塊所組成的
而為了讓我們在設定 HTML 的 width, height 時，不需要再去特別計算要扣掉或加上 padding 或 margin
我們可以使用 **`box-sizing`** 這個屬性來設定盒模型的長寬計算方式

1. **`box-sizing: content-box`** (此為預設模式) => 此模式下，我們設定的長寬會是單指 content 的長寬，不包括其他三個區塊
2. **`box-sizing: border-box`** => 此模式下，我們設定的長寬會是泛指直到 border 的長寬，但不包括 margin，因此 content 的長寬，就會是我們所設定的長寬剪掉 padding, margin 的長寬後的值

<br>

### 3. 請問 display:inline,block 跟 inline-block 的差別是什麼？什麼時機點會用到？

### 答：

1. **`display:inline`**：<br>
   **特性：**<br>
   ・圖片和文字都可以在同一行內呈現<br>
   ・沒辦法設定寬高，元素的寬高是由內容撐開<br>
   ・可以設定左右的 margin（調整上下的 margin 沒用）<br>
   ・可以設定上下 / 左右的 padding<br>
   ・常見在行內元素：`<a>`,`<span>`...等等<br>
   <br>
   **使用時機：**<br>
   可以用在排版上需要在同一列並排多個元素的時候
   <br><br>
2. **`display:block`**：<br>
   **特性：**<br>
   ・元素會自己佔滿一整行<br>
   ・可以設定寬高 / margin / paddin（但元素仍會佔滿一整行）<br>
   ・常見在區塊元素：`<div>`,`<h1>`...等等<br>
   <br>
   **使用時機：**<br>
   可以用在某個元素在排版上需要獨佔一列的時候
   <br><br>

3. **`display:inline-block`**：<br>
   **特性：**<br>
   ・在呈現上具備 **`display:inline`** 的特性（圖片和文字都可以在同一行內呈現）<br>
   ・在設定上具備 **`display:block`** 的特性（可以設定寬高 / margin / paddin）<br>
   ・常見在行內區塊元素：`<buttom>`,`<input>`...等等<br>
   <br>
   **使用時機：**<br>
   在排版上需要並排多個元素在同一列，且又需要調整個元素的寬高 / margin / paddin 時。
   <br>

### 4. 請問 position:static,relative,absolute 跟 fixed 的差別是什麼？分別各舉一個會用到的場合？

### 答：

1. **`position:static`**：<br>
   **特性：**<br>
   ・每個元素預設的排版方式<br>
   ・使用 `position:static` 的元素會按照預設的排版流程<br>
   <br>
   **使用時機：**<br>
   不需要特別排版的時候
   <br><br>

2. **`position:relative`**：<br>
   **特性：**<br>
   ・使用 `position:relative` 的元素會按照預設的排版流程<br>
   ・會以相對元素原本在 `position:static` 時的位置，進行相對位移<br>
   ・可以用 top / bottom / right / left 來調整元素的位置<br>
   ・只會改變自己的位置，不會影響到其他元素的位置<br>
   <br>
   **使用時機：**<br>
   要做出彈跳視窗右上角的叉叉按鈕時，彈跳視窗就需要設定為 `position:relative`，這樣才可以作為叉叉按鈕的參考點
   <br><br>

3. **`position:fixed`**：<br>
   **特性：**<br>
   ・使用 `position:fixed` 的元素會脫離預設的排版流程的輪次<br>
   ・會以瀏覽器視窗為參考點，進行絕對位移<br>
   ・同樣用 top / bottom / right / left 來調整元素的位置<br>
   ・移動後的位置，就會是元素固定在瀏覽器視窗的位置<br>
   <br>
   **使用時機：**<br>
   網頁上的小廣告視窗，就可以用 `position:fixed` 固定在想要的位置
   <br><br>

4. **`position:absolute`**：<br>
   **特性：**<br>
   ・使用 `position:absolute` 的元素會脫離預設的排版流程的輪次<br>
   ・會以基準元素為參考點，進行絕對位移（基準元素是往上層找的第一個不是用 `position:static` 的元素）<br>
   ・若找不到基準元素，則會以瀏覽器視窗為參考點，進行絕對位移<br>
   ・同樣用 top / bottom / right / left 來調整元素的位置<br>
   <br>
   **使用時機：**<br>
   要做出彈跳視窗右上角的叉叉按鈕時，彈跳視窗就需要設定為 `position:relative`，並將叉叉按鈕設定為 `position:absolute`，這樣叉叉按鈕就可以以彈跳視窗為基準元素去做定位
