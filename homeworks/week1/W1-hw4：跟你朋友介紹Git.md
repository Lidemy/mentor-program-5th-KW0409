### 什麼是 Git

相信大家在做報告或者寫履歷的時候，肯定有過隨著奮鬥的時間越來越長，檔案的版本越來越多，最後不得不在堆積如山的檔案 mountain 裡面尋尋覓覓上一次的最新版本，而這樣的現象在開發工程師們的生活中尤其常見，所以為了解救苦難的工程師們，**Git** 這套**專門用來做版本控制的程式**就應運而生了，與此同時，還有一個類似 git 專用的雲端儲存庫 **Github**

在 git 裡面有著 branch(分支)，和版本這兩個主要的概念，在我看來，branch 就好像是一個個不同的平行時空一樣，你可以從最初的 branch 分出去好幾個不同的 branch 去做事情而不會影響到原本的 branch 上面的檔案，而版本控制就好像是在各個平行時空裡面被你創造出來的一顆顆星球

### Git 的基本操作

1. **`git init`**：用來初始化 git 的使用環境，表示我要在這個資料夾做版本控制(會在資料夾新增一個叫做 _.git_ 的隱藏資料夾，包含 git 做版本控制的各種工具，如果將這個隱藏資料夾刪除的話，就會失去 git 的環境了)
2. **`git status`**：可用來查看目前的版本控制狀態，例：有多少個檔案加入/未加入版本控制
3. **`git add`**：指令後面接檔案名稱，用來將 git 環境裡面的檔案加入到版本控制的暫存區行列(_還可以直接用 **git add .** 來將所有的檔案一次全部加入版本控制_)
4. **`git commit -m`** ：加入版本控制的暫存區行列後，就可以使用此指令來將版控資料夾內的所有檔案當前的狀態製作成一個版本，並為這個版本寫上關於此版本的備註，同時每一個版本都會被自動匹配一個亂碼 ID(當要加入版本控制的檔案**不是新建立的檔案，而是修改的檔案**時，可以 **使用 `git commit -am` 一次完成加入版本控制及創立版本的動作**)
5. **`git log`**：可用來查看目前的歷史版本有哪些
6. **`git checkout`**：當我們想要切換不同的 branch 時，即可使用此指令後面接上要去的 branch，或者想要回到某個特定的版本時，也可使用此指令後面接上要去的版本的亂碼 ID
7. **`.gitignore`**：當我們在使用版本控制時，可以新增一個檔案名稱為 **.gitignore** 的資料夾，將不想加入版本控制行列的檔案都放進去，此資料夾會被 git 自動忽略，如此一來我們就可以每次都直接用 **git add .** 來將檔案全部加入版本控制

#### 菜哥的範例小教室

假如說今天菜哥想要對自己的笑話檔案做版本控制，那麼 Git 絕對是一個好選擇！<br>
首先菜哥要先打開自己電腦上的終端機，並 **在終端機上輸入 `cd <笑話檔案資料夾的檔案路徑>` 跳轉到笑話檔案資料夾的位置**，接下來根據上面的指令操作說明，菜哥需要這麼做：

1. **在終端機上輸入 `git init`**：這樣才能在 **笑話檔案資料夾 **裡初始化版本控制的環境，也才能夠使用 Git 來對 **笑話檔案資料夾** 裡的笑話檔案做版本控制
2. **使用 `git status`**：菜哥即可發現原本在 **笑話檔案資料夾** 裡的笑話檔案都會顯示尚未加入版本控制（或是當菜哥有新加入的檔案 or 對原本資料夾裡的檔案做修改時，新檔案和修改後的檔案也會顯示未加入本控制）
3. **使用 `git add <笑話檔案名稱>`**：因為檔案都還沒加入版控，所以這時候菜哥就需要使用這個指令來將檔案加入版本控制的暫存區 (或者也可以使用 **`git add .`** 一次性將 **_當前位置的所有檔案_** 全部加入)
4. **使用 `git commit -m "<笑話的版本名稱>"`**：將檔案都加入版本控制後，菜哥接下來就可以這個指令來將加入版控的所有檔案當前的狀態製作成一個版本，而 **版本名稱最好是詳細列出與前一次版本的差異的內容**，之後每當菜哥有新檔案加入或是修改某個檔案時，就可以重複

5. 使用 `git status` 查看當前未加入版控的檔案
6. 使用 `git add <笑話檔案名稱>` 將檔案加入版控暫存區
7. 使用 `git commit -m "<笑話的版本名稱>"` 建立目前的笑話檔案資料夾的版本

這三個步驟，如果菜哥想要查看當前有哪些笑話的版本時，就可以使用 `git log` 來查看目前所有的版本及其版本名稱...等等資訊，甚至於菜哥想要回到 A 版本時還可以使用 `git checkout <A版本的亂碼 ID>` 來回到 A 版本時的狀態，而如果菜哥在使用 `git add .` 時，有檔案不想要被加入版本控制，但是加入版控的檔案又很多不想要一個個加入時，就可以使用 `vim .gitignore` 來建立一個名稱為 _.gitignore_ 的檔案，並在其中輸入不想被加入版本控制的檔案名稱，之後再使用 `git add .` 時，那些檔案就不會被加入版控了。

### Git branch 的基本操作

從我們用 **`git init`** 來初始化環境的時候，就會有一個最初的 branch，並且被預設名稱為 _master_

1. **`git branch`**：後面接名稱，即可新增一個 _branch_
2. **`git branch -v`**：可查看目前的 _branch_ 有哪些
3. **`git branch -d`**：後面接 _branch 名稱_ ，即可刪除 _branch_
4. **`git checkout`**：後面接 _branch 名稱_ ，及可切換到其分支上
5. **`git merge`**：用來合併兩個不同的分支，當輸入 **`git merge X`** 意思為**將 _branchX_ 合併到當前所在的分支**(當**合併兩個分支出現 _conflict_ 的問題時，我們需要先去問題檔案修改成我們要的樣子，再用 **`git commit -am`** 將檔案加入版本控制及創建版本**)

#### 菜哥的範例小教室

假如說菜哥之前已經對自己的笑話檔案做版本控制了，今天突然想開發新的笑話檔案但又怕影響到原本的版本行列上的笑話檔案時，那麼菜哥可以這麼做：

1. **使用 `git branch "<新支線的名稱>"`**：用來建立一個新的版本控制的支線，
2. **使用 `git branch -v`**：要是開發到一半忘了自己目前有哪些 branch 時，菜哥也可以使用此指令來查看目前有哪些支線
3. **使用 `git branch -d "<要刪掉的支線的名稱>"`**：要是菜哥突然覺得自己現在這個支線上的笑話實在太難笑了，想要砍掉這整個支線時，則可以使用這個指令來刪除支線**（使用時，一定要記得先切換到別的支線上才能刪掉要刪除的支線）**
4. **使用 `git checkout "<想要去的支線的名稱>"`**：又或者是菜哥在開發新笑話的時候突然想要切到另一條支線上開發新笑話時，可以使用此指令來切換到不同的笑話支線上

而如果今天菜哥開發完新笑話之後，**想要將新笑話的 A 支線合併到 master 笑話支線時**，首先要 **先切換到 master 笑話支線上**，再輸入 **`git merge <A>`** 的指令，就可以 **將 A 支線的版本合併進 master 的笑話支線上了**，至於如果合併兩個支線時，出現有衝突的提示，就需要菜哥自己到檔案裡提示的衝突內容，將內容修改為自己想要的樣子，最後再次使用 **`git merge <A>`** 指令就可以順利合併囉！

### 如何使用 Github 及更新 Github

首先到 _Github_ 的網站上點擊頁面右上角的 ‘**+**’，點擊 ‘**New repository**’，之後按照頁面的指示輸入新增的資料庫名稱及描述此資料庫的註解內容後，即可創建資料庫

1. 首先按照提示的內容在本地端電腦的終端機輸入 **`git remote add orgin <X>`** ，讓本地端電腦的 **Git** 設置一個代號為 _origin_ 的遠端資料庫在自己的 **Github** 頁面上
2. **`git push`**：**當本地端的內容比遠端的資料庫內容還新**時，可使用 **`git push origin master`** 將 **_本地的 master branch_** 上的內容更新到自己的 **Github** 上代號為 _origin_ 的資料庫裡面。
3. **`git pull`**：**當遠端的內容比本地端的資料庫內容還新**時，可使用 **`git pull origin master`** 將自己的 **Github** 上代號為 _origin_ 的資料庫裡面的 _master branch_ 內容更新到 **_本地的 master branch_**上。
4. **`git checkout`**：甚至當遠端有一個本地端沒有的 X 分支時，可以直接在終端機上輸入 **`git checkout <X>`**，本地端就會直接新增一個名稱為 X 的分支，並且獲得此分支在遠端資料庫上的內容

#### 菜哥的範例小教室

如果菜哥想要進一步將自己的笑話放到 github 上當作自己的遠端笑話倉庫時，那麼菜哥需要這個做：

1. 首先要到 _Github_ 的網站上點擊頁面右上角的 ‘**+**’，點擊 ‘**New repository**’，之後按照頁面的指示輸入新增的資料庫名稱及描述此資料庫的註解內容，順利創建完成資料庫後
2. 再按照頁面上提示的內容在電腦的終端機上輸入 **`git remote add orgin <X>`** ，讓電腦的 **Git** 設置一個代號為 _origin_ 的遠端資料庫在自己的 **Github** 頁面上
3. 之後就可以使用 `git push origin <master>`，將自己本地端的 master 支線上的內容都同步到遠端的 Github 資料庫上(要記住每次都需要自己使用`git push`指令後才會讓遠端的資料庫的內容與本地端的內容同步)
4. 而當遠端的資料庫上的內容比本地端還要新的時候，就沒辦法使用`git push`指令來更新遠端了，畢竟這時候是遠端的內容比較新，所以此時菜哥要改成使用 `git pull origin <master>` 來將遠端的資料拉下來更新本地端的內容
5. 當菜哥在遠端的資料庫上有一個菜哥的本地端資料庫所沒有的 w 分支時，可以直接在本地的終端機上輸入 `git checkout <w>`，本地端就會直接新增一個名稱為 w 的分支，並且獲得此分支在遠端資料庫上的內容。
