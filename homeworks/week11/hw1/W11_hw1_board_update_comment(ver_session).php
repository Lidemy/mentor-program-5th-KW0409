
<?php
  session_start();
  require_once('W11_hw1_board_conn.php');
  require_once('W11_hw1_board_utils(ver_session).php');

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }

  if (empty($_SESSION['username'])) {
    header('Location: W11_hw1_board_index(ver_session).php');
    exit();
  }
  $username = $_SESSION['username'];
  $user = getUsersFromUsername($username);
  $id = $_GET['id'];

  if (isAdmin($user)) {
    $sql = 'SELECT * FROM KWang_board_comments WHERE id= ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
  } else {
    $sql = 'SELECT * FROM KWang_board_comments WHERE id= ? AND username= ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
  }
  $result = $stmt->execute();
  if (empty($result)) {
    exit('Error:' . $conn->error);
  }
  
  $result = $stmt->get_result();
  $data_arr = $result->fetch_assoc();
  if (empty($data_arr)) {
    header('Location: W11_hw1_board_handle_logout(ver_token).php');
  }
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板 - 編輯留言頁面</title>
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
      <h1 class="board__title">編輯留言</h1>
      <div class="user__btn-area">
        <a class="board" href="W11_hw1_board_index(ver_session).php?page=<?php echo $page;?>">回留言板</a>
        <a class="logout" href="./W11_hw1_board_handle_logout(ver_session).php">登出</a>
      </div> 
    </div>
    
    <?php
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        if ($code === '1') {
          $msg = '內容不可為空，除非你腦袋空空！';
          echo "<h2 class='error'>錯誤：" . $msg . "</h2>";
        }
      }
    ?> 

    <form class="board__comment-form" method="POST" action="W11_hw1_board_handle_update_comment(ver_session).php?page=<?php echo $page?>">
      <div class="form__input-area">
        <!-- 輸入框內 echo 出來的內容似乎不會被當作指令執行，而是會被當作一般的字串被印出，因此可以不用 escape -->
        <textarea class="board__input" name="content" rows="4" placeholder="請輸入你的留言..."><?php echo $data_arr['content'];?></textarea>
        <input type="hidden" name="id" value="<?php echo $data_arr['id']?>">
      </div>
      <div class="form__btn-area">
        <input class="form__submit-btn" type="submit" value="送出">
      </div>
    </form>
  </main>
</body>

</html>