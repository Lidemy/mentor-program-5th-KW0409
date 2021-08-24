
<?php
  session_start();
  require_once('W11_hw1_board_conn.php');
  require_once('W11_hw1_board_utils(ver_session).php');
  
  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUsersFromUsername($username);
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $num_per_page = 5;
  $offset = ($page - 1) * $num_per_page;

  $sql = 
  'SELECT ' . 
    'C.id as id, C.created_at as created_at, C.content as content, ' .
    'U.nickname as nickname, U.username as username, U.user_auth as user_auth ' .
  'FROM KWang_board_comments as C ' . 
  'LEFT JOIN KWang_board_users as U on C.username = U.username ' . 
  'WHERE C.is_deleted IS NULL ' .
  'ORDER BY id ASC ' . 
  'LIMIT ? OFFSET ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $num_per_page, $offset);
  $result = $stmt->execute();
  if (empty($result)) {
    exit('Error:' . $conn->error);
  }

  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板 - 首頁</title>
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
      <h1 class="board__title">Comments</h1>

      <?php if (!$username) { ?>
        <div class="user__btn-area">
          <a class="login" href="./W11_hw1_board_login.php">登入</a>
          <a class="register" href="./W11_hw1_board_register.php">註冊</a>
        </div>
      <?php } else if ($username) { ?>
        <?php if (!isAdmin($user)) { ?>
          <div class="user__btn-area">
            <a class="logout" href="./W11_hw1_board_handle_logout(ver_session).php">登出</a>
          </div>    
        <?php } else { ?>
          <div class="user__btn-area">
            <a class="admin" href="./W11_hw1_board_admin(ver_session).php">進入後台</a>
            <a class="logout" href="./W11_hw1_board_handle_logout(ver_session).php">登出</a>
          </div>
        <?php } ?>
      <?php } ?>
    </div>
    
    <?php if (!$username) { ?>
      <span class="nickname">有什麼想說的嗎？<br>請在註冊/登入後一起來參與討論吧～</span>
    <?php } else if ($username) { ?>
      <?php
        if (!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          if ($code === '1') {
            $msg = '內容不可為空，除非你腦袋空空！';
            echo "<h2 class='error'>錯誤：" . $msg . "</h2>";
          } else if ($code === '2') {
            $msg = '新的暱稱不可為空，除非你腦袋空空！';
            echo "<h2 class='error'>錯誤：" . $msg . "</h2>";
          }
        }
      ?> 

      <span class="nickname">你好！<?php echo escape($user['nickname']);?></span>
      <span class="nickname" style="color: #2b73b7ba">(@<?php echo escape($username);?>)</span>
      <span class="update__nickname-btn">編輯暱稱</span>
    
      <form class="hide board__nickname-form" method="POST" action="W11_hw1_board_handle_update_nickname(ver_session).php?page=<?php echo $page;?>">
        <div class="register__input-area">
          <label>新的暱稱：<input type="text" name="nickname" placeholder="請輸入新的暱稱..."></label>
        </div>
        <div class="form__btn-area nickname__btn-area">
          <input class="form__submit-btn" type="submit" value="提交">
        </div>
      </form>
      
      <?php if (!actionPermission($user, 'create', null)) { ?>
        <br><br>
        <span style="color: #8b8181">>您已被管理員停權，因此無法發言，但您仍可編輯/刪除您過去的發言</span>
      <?php } else { ?>
        <form class="board__comment-form" method="POST" action="W11_hw1_board_handle_add_comments(ver_session).php">
          <span class="nickname">有什麼想說的嗎？</span>
          <div class="form__input-area">
            <textarea class="board__input" name="content" rows="4" placeholder="請輸入你的留言..."></textarea>
          </div>
          <div class="form__btn-area">
            <input class="form__submit-btn" type="submit" value="送出">
          </div>
        </form>
      <?php } ?>
    <?php } ?>
    
    <div class="board__hr">
      <hr>
    </div>

    <div class="board__comment-area">
      <?php while ($data_arr = $result->fetch_assoc()) { ?>
        <div class="board__comment">
          <div class="comment__avatar">
            <img src="">
          </div>
          <div class="comment__content">
            <div class="content__info">
              <span class="content__info-nickname">
                <?php echo escape($data_arr['nickname']);?> 
                (@<?php echo escape($data_arr['username']);?>)
              </span>
              <span class="content__info-dot">·</span>
              <span class="content__info-time">
                <?php echo escape($data_arr['created_at']);?>
              </span>
            </div>
            
            <div class="content__text"><!--
            --><?php echo escape($data_arr['content']);?>
            </div>
            
            <?php if ($username && actionPermission($user, 'update', $data_arr)) { ?>
              <!-- width:660px 以下的編輯/刪除介面 -->
              <div class="comment__tool-alt">
                <a href="W11_hw1_board_update_comment(ver_session).php?id=<?php echo $data_arr['id'];?>&page=<?php echo $page;?>">編輯</a>
                <a href="W11_hw1_board_handle_delete_comment(ver_session).php?id=<?php echo $data_arr['id'];?>&page=<?php echo $page;?>">刪除</a>
              </div>              
            <?php } ?>
          </div>

          <?php if ($username && actionPermission($user, 'update', $data_arr)) { ?>
            <div class="comment__tool">
              <a class="pencil" href="W11_hw1_board_update_comment(ver_session).php?id=<?php echo $data_arr['id'];?>&page=<?php echo $page;?>">
                <i class="fas fa-fw fa-pencil-alt pencil-btn"></i>
              </a>
              <a class="trash" href="W11_hw1_board_handle_delete_comment(ver_session).php?id=<?php echo $data_arr['id'];?>&page=<?php echo $page;?>">
                <i class="fas fa-fw fa-trash-alt trash-btn"></i>
              </a>
            </div>
          <?php } ?>
        </div>           
      <?php } ?>     
    </div>
  
    <div class="board__hr">
      <hr>
    </div>

    <div class="board__bottom">
      <div class="board__data-num">
        <?php 
          $sql = 'SELECT count(id) as total FROM KWang_board_comments WHERE is_deleted IS NULL';
          $stmt = $conn->prepare($sql);
          $result = $stmt->execute();
          if (empty($result)) {
            exit('Error:' . $conn->error);
          }
          $result = $stmt->get_result();
          $data_arr = $result->fetch_assoc();
          $total = $data_arr['total'];
          $total_page = intval(ceil($total/$num_per_page));
        ?>
        共 <?php echo $total ?> 筆留言 - 目前在第 <?php echo $page ?> 頁 - 共 <?php echo $total_page ?> 頁
      </div>

      <div class="board__page-btn">
        <?php if ($page !== 1) { ?>
          <a class="top__page-btn style1-btn" href="W11_hw1_board_index(ver_session).php?page=1">首頁</a>
          <a class="style1-btn style2-btn" href="W11_hw1_board_index(ver_session).php?page=<?php echo $page - 1 ?>">
            &larr; 上一頁
          </a>
        <?php } ?>
        
        <?php if ($page < $total_page) { ?>
          <a class="style1-btn style2-btn" href="W11_hw1_board_index(ver_session).php?page=<?php echo $page + 1 ?>">
            下一頁 &rarr;
          </a>
          <a class="end__page-btn style1-btn" href="W11_hw1_board_index(ver_session).php?page=<?php echo $total_page ?>">末頁</a>
        <?php } ?>
      </div>
    </div>
  </main>

  <script src="W11_hw1_board_index(ver_session).js"></script>
</body>

</html>