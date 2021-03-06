<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板 - 登入頁面</title>
  <link rel='stylesheet' href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
    integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
  <link rel='stylesheet' href="./W11_hw1_board_style.css">
</head>

<body>
  <header>
    注意！本站為練習用網站，因教學用途刻意忽略資安實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>
  <main class="board">
    <div class="board__top">
      <h1 class="board__title register">登入</h1>
      <div class="user__btn-area">
        <a class="board" href="./W11_hw1_board_index(ver_session).php">回留言板</a>
        <a class="register" href="./W11_hw1_board_register.php">註冊</a>
      </div>
    </div>

    <?php
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        if ($code === '1') {
          $msg = '帳號未填寫！';
          echo "<h2 class='error'>資料不齊全：" . $msg . "</h2>";
        } else if ($code === '2') {
          $msg = '密碼未填寫！';
          echo "<h2 class='error'>資料不齊全：" . $msg . "</h2>";
        } else if ($code === '4') {
          $msg = '帳號/密碼輸入錯誤！';
          echo "<h2 class='error'>錯誤：" . $msg . "</h2>";
        }
      }
    ?>

    <form class="board__comment-form register__form" method="POST" action="W11_hw1_board_handle_login(ver_session).php">
      <div class="register__input-area">
        <label>帳號：<input type="text" name="username" placeholder="請輸入你的帳號..."></label>
        <label>密碼：<input type="password" name="password" placeholder="請輸入你的密碼..."></label>
      </div>
      <div class="form__btn-area register__btn-area">
        <input class="form__submit-btn" type="submit" value="提交">
      </div>
    </form>
  </main>
</body>

</html>