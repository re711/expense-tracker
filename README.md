# expense-tracker
使用 Node.js + Express + Mongodb 的練習作品，簡單的支出消費紀錄。

# 安裝流程
```
 1. 終端機輸入 git clone https://github.com/re711/expense-tracker.git
 ```
 ```
 2. 安裝套件 npm install
 ```
 ```
 3. 執行腳本 npm run seed
 ```
 ```
 4. 執行 npm run dev
 ```

# 功能
1. 首頁可以看到所有支出紀錄、總金額。
2. 新增一筆支出紀錄。
3. 編輯修改支出紀錄。
4. 刪除任意一筆支出紀錄。
5. 篩選支出"類別"、總金額的計算只會包括被篩選出來的支出總和。
* 2020/6/14 更新
6. 新增使用"月份"篩選功能"、新增商家欄位
7. 新增使用Email或Facebook註冊帳號、登入驗證功能

# 測試帳號
發布於 Heroku 平台 https://serene-stream-75250.herokuapp.com/users/login
```
email: root@example.com
password: 12345678
```
# 工具
* Node.js
* Express
* Express-handlebars
* Bootstrap
* Mongodb
* express-session
* passport