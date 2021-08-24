
<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css"/>
  <link rel="stylesheet" href="W11_hw2_blog_style.css"/>
  <title>部落格 - 註冊頁面</title>
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='W11_hw2_blog_index(ver_session).php'>Blog</a>
      </div>

      <ul class="navbar__list">
        <div>
          <li><a href="W11_hw2_blog_article_list(ver_session).php">文章列表</a></li>
          <li><a href="#">分類專區(暫未開放)</a></li>
        </div>

        <div>
          <li><a href="W11_hw2_blog_login(ver_session).php">登入</a></li>
        </div>
      </ul>
    </div>
  </nav>

  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>

  <div class="login-wrapper">
    <?php
      if (!empty($_GET['errCode'])) {
        $errCode = $_GET['errCode'];
        if ($errCode === '1') {
          $msg = '暱稱未填寫！';
          echo ('<h3 class="error" >資料有缺：' . $msg . '</h3>');
        } else if ($errCode === '2') {
          $msg = '帳號未填寫！';
          echo ('<h3 class="error" >資料有缺：' . $msg . '</h3>');
        } else if ($errCode === '3') {
          $msg = '密碼未填寫！';
          echo ('<h3 class="error" >資料有缺：' . $msg . '</h3>');
        } else if ($errCode === '4') {
          $msg = '此帳號已被註冊！';
          echo ('<h3 class="error" >錯誤：' . $msg . '</h3>');
        }
      }
    ?>

    <h2>Register</h2>
    <form action="W11_hw2_blog_handle_register(ver_session).php" method="POST">
      <div class="input__wrapper">
        <div class="input__label">NICKNAME</div>
        <input class="input__field" type="text" name="nickname" />
      </div>

      <div class="input__wrapper">
        <div class="input__label">USERNAME</div>
        <input class="input__field" type="text" name="username" />
      </div>
      
      <div class="input__wrapper">
        <div class="input__label">PASSWORD</div>
        <input class="input__field" type="password" name="password" />
      </div>
      <input type='submit' value="註冊" />
    </form>
  </div>
</body>
</html>