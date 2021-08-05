
<?php

  session_start();
  require_once('W9_hw1_board_conn.php');
  
  $username = NULL;
  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
  }

  $sql = sprintf('SELECT * FROM KWang_board_comments ORDER BY id ASC');
  $result = $conn->query($sql);
  if(empty($result)){
    exit('Error:' . $conn->error);
  }

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link rel='stylesheet' href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
    integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
  <link rel='stylesheet' href="./W9_hw1_board_style.css">
</head>

<body>
  <header>
    注意！本站為練習用網站，因教學用途刻意忽略資安實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>
  <main class="board">
    <div class="board__top">
      <h1 class="board__title">Comments</h1>
      <?php if(!$username){ ?>
        <div class="user__btn-area">
          <a class="login" href="./W9_hw1_board_login.php">登入</a>
          <a class="logout" href="./W9_hw1_board_register.php">註冊</a>
        </div>
      <?php } ?>
      
      <?php if($username){ ?>
        <div class="user__btn-area">
          <a class="login" href="./W9_hw1_board_handle_logout(ver_session).php">登出</a>
        </div>
      <?php } ?>
      
    </div>
    <form class="board__comment-form" method="POST" action="W9_hw1_board_handle_add_comments(ver_session).php">
      <?php if(!$username){ ?>
        <span class="nickname">有什麼想說的嗎？<br>請在註冊/登入後一起來參與討論吧～</span>
      <?php } ?>

      <?php if($username){ ?>

         <?php
          if(!empty($_GET['errCode'])) {
            $code = $_GET['errCode'];
            if($code === '1'){
              $msg = '發布的內容不可為空，除非你腦袋空空！';
              echo "<h2 class='error'>錯誤：" . $msg . "</h2>";
            }
          }
         ?> 
      
        <div class="form__input-area">
          <span class="nickname">有什麼想說的嗎？ <?php echo $username;?></span>
          <textarea class="board__input" name="content" rows="4" placeholder="請輸入你的留言..."></textarea>
        </div>
        <div class="form__btn-area">
          <input class="form__submit-btn" type="submit" value="送出">
        </div>
      <?php } ?>
    </form>

    <div class="board__hr">
      <hr>
    </div>

    <div class="board__comment-area">
      
      <?php
        while($data_arr = $result->fetch_assoc()){
          $nickname = $data_arr['nickname'];
          $time = $data_arr['created_at'];
          $content = $data_arr['content'];

          $ans = sprintf('
            <div class="board__comment">
              <div class="comment__avatar">
                <img src="">
              </div>
              <div class="comment__content">
                <div class="content__info">
                  <span class="content__info-nickname">%s</span>
                  <span class="content__info-dot">·</span>
                  <span class="content__info-time">%s</span>
                </div>
                <div class="content__text">%s</div>
                <div class="comment__tool-alt">
                  <a href="#">編輯</a>
                  <a href="#">刪除</a>
                </div>
              </div>
              <div class="comment__tool">
                <a class="pencil" href="#">
                  <i class="fas fa-fw fa-pencil-alt pencil-btn"></i>
                </a>
                <a class="trash" href="#">
                  <i class="fas fa-fw fa-trash-alt trash-btn"></i>
                </a>
              </div>
            </div>',$nickname,$time,$content);
          echo $ans;
        }
      ?>

    </div>
   
    <div class="board__hr">
      <hr>
    </div>

    <div class="board__bottom">
      <div class="board__data-num">
        共 n 筆 - 目前在第 1 頁 - 共 n 頁
      </div>
      <div class="board__page-btn">
        <a class="top__page-btn" href="#">
          <input class="style1-btn" type="button" value="&larr;首頁">
        </a>

        <div>
          第
          <a class="num__page-btn" href="#">
            <input class="style2-btn" type="button" value="1">
          </a>
          
          <a class="num__page-btn" href="#">
            <input class="style2-btn" type="button" value="2">
          </a>
          
          <a class="num__page-btn" href="#">
            <input class="style2-btn" type="button" value="3">
          </a>

          頁
        </div>
        
        <a class="end__page-btn" href="#">
          <input class="style1-btn" type="button" value="末頁&rarr;">
        </a>
      </div>
    </div>
  </main>
</body>

</html>