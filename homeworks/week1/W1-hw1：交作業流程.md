### hw1:交作業流程

1. 先從 github classroom 得到自己 mtr05 的倉庫
2. 複製自己 mtr05 的倉庫的網址後，到自己本地選擇一個資料夾使用指令 `git clone <剛剛複製的網址>` **初始化環境**
3. 使用指令 `git branch w1hw` **新增一個 branch**
4. 新增 hw1~5 的檔案開始寫作業
5. 寫完將新增的檔案用指令 `git add .` 一次全部**加入版本控制**(但只限於當前位置及其所有後代目錄中未加入版控的檔案)
6. 再用指令 `git commit -am 'xxxxx'` **完成作業的版本建立**
7. 使用指令 `git push origin w1hw` **將作業 push 到遠端的 github 上**
8. 到自己的 repository，**發起 pull request**
9. 老師或助教改完並且在 github 上已經 merge pull request 之後在本地使用指令 `git checkout master` **切換回 master 分支**
10. 使用指令 `git pull origin master` **將 github 上最新的 master branch 拉下來更新本地的 master branch**
11. 使用指令 `git branch -d w1h1` **刪除掉舊的分支**

P.S.

1. 如果有需要再次 pull request 請老師或助教批改的話，就重複步驟 3 ~ 11
2. 如果是自己想更新 github 上的 repository 的話，就重複步驟 5 ~ 7
