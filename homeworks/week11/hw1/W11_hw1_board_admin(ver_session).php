
<?php
  session_start();
  require_once('W11_hw1_board_conn.php');
  require_once('W11_hw1_board_utils(ver_session).php');
  
  if (empty($_SESSION['username'])) {
    header('Location: W11_hw1_board_handle_logout(ver_session).php');
    exit();
  }
  $username = $_SESSION['username'];
  $user = getUsersFromUsername($username);
  if (!isAdmin($user)) {
    header('Location: W11_hw1_board_handle_logout(ver_session).php');
    exit();
  }
  
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $num_per_page = 5;
  $offset = ($page - 1) * $num_per_page;
  $sql = 'SELECT * FROM KWang_board_users ORDER BY id ASC LIMIT ? OFFSET ?';
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
  <title>留言板 - 後台頁面</title>
  <link rel='stylesheet' href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel='stylesheet' href="./W11_hw1_board_style.css">
</head>

<body>
  <header>
    注意！本站為練習用網站，因教學用途刻意忽略資安實作，註冊時請勿使用任何真實的帳號或密碼。
  </header>
  <main class="board">
    <div class="board__top">
      <h1 class="board__title">後台管理空間</h1>
      <div class="user__btn-area">
        <a class="board" href="./W11_hw1_board_index(ver_session).php">回留言板</a>
        <a class="logout" href="./W11_hw1_board_handle_logout(ver_session).php">登出</a>
      </div>     
    </div>

    <?php if ($user['user_auth'] === '1') { ?>
      <span class="nickname">管理員 <?php echo escape($user['nickname']);?></span>
    <?php } else if ($user['user_auth'] === '2') { ?>
      <span class="nickname">尊敬的最高管理員 <?php echo '<br>' . escape($user['nickname']);?></span>
    <?php } ?>
    <span class="nickname" style="color: #2b73b7ba">(@<?php echo escape($username);?>)</span>
    <span class="nickname"> 您好</span><br><br>
    <span style="color: #8b8181">>您可於此地管理本留言板使用者的操作權限</span>
    
    <div class="board__hr admin">
      <hr>
    </div>

    <div class="board__comment-area">
      <?php while ($data_arr = $result->fetch_assoc()) { ?>
        <div class="board__comment board__user">
          <div class="comment__avatar">
            <img src="">
          </div>

          <div class="comment__content user__content">
            <div class="content__info user__info">
              <span class="content__info-nickname">
                <?php echo escape($data_arr['nickname']);?> 
                (@<?php echo escape($data_arr['username']);?>)
              </span>
            </div>

            <!-- 當介面在 width:660px 以下的變更權限按鈕 -->
            <?php if (actionPermission($user, 'manage', $data_arr)) { ?>
              <div class="comment__tool-alt">
                  <a class="update__user-auth update__user-auth-href" href="">變更權限</a>
              </div>
            <?php } ?>
          </div>

          <div class="user__auth">
            <?php 
              if (escape($data_arr['user_auth']) === '-1') {
                $str = '遭停權使用者';
              } else if (escape($data_arr['user_auth']) === '0') {
                $str = '一般之使用者';
              } else if (escape($data_arr['user_auth']) === '1') {
                $str = '管理員';
              } else if (escape($data_arr['user_auth']) === '2') {
                $str = '最高管理員';
              }
            ?>
            <span class="user__auth-text"><?php echo $str;?></span>

            <form class="hide user__auth-form" method="POST" action="W11_hw1_board_handle_update_user_auth(ver_session).php">
              <select name="user_auth">
                <option class="normal" value="0">一般之使用者</option>
                <option class="banned" value="-1">遭停權使用者</option>
                <option class="admin" value="1">管理員</option>
                
                <?php if (($user['user_auth']) === '2') { ?>
                  <option class="topAdmin" value="2">最高管理員</option>
                <?php } ?>
              </select>

              <input type="hidden" name="id" value="<?php echo $data_arr['id']?>">
              <input type="hidden" name="page" value="<?php echo $page?>">
            </form> 
          </div>

          <?php if (actionPermission($user, 'manage', $data_arr)) { ?>
            <div class="comment__tool user__auth-tool">
              <span class="update__user-auth update__user-auth-btn">變更權限</span>
            </div>
          <?php } ?>
        </div>      
      <?php  } ?>
      
      <div class="board__comment board__user user__count">
        <?php
          $sql = 'SELECT user_auth FROM KWang_board_users';
          $stmt = $conn->prepare($sql);
          $result = $stmt->execute();
          if (empty($result)) {
            exit('Error:' . $conn->error);
          }

          $result = $stmt->get_result();
          while ($data_arr = $result->fetch_assoc()) {
            static $bad_user = 0;
            static $user = 0;
            static $admin = 0;
            static $top_admin = 0;
            if ($data_arr['user_auth'] === -1) {
              $bad_user++;
            } else if ($data_arr['user_auth'] === 0) {
              $user++;
            } else if ($data_arr['user_auth'] === 1) {
              $admin++;
            } else if ($data_arr['user_auth'] === 2) {
              $top_admin++;
            }
          }
        ?>
        <span>最高管理員：<?php echo $top_admin ?>位</span>
        <span>管理員：<?php echo $admin ?>位</span>
        <span>一般之使用者：<?php echo $user ?>位</span>
        <span>遭停權使用者：<?php echo $bad_user ?>位</span>
      </div>
    </div>
   
    <div class="board__hr">
      <hr>
    </div>

    <div class="board__bottom">
      <div class="board__data-num">
        <?php 
          $sql = 'SELECT count(id) as total FROM KWang_board_users';
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
        共 <?php echo $total ?> 位用戶 - 目前在第 <?php echo $page ?> 頁 - 共 <?php echo $total_page ?> 頁
      </div>
      
      <div class="board__page-btn">
        <?php if ($page !== 1) { ?>
          <a class="top__page-btn style1-btn" href="W11_hw1_board_admin(ver_session).php?page=1">首頁</a>
          <a class="style1-btn style2-btn" href="W11_hw1_board_admin(ver_session).php?page=<?php echo $page - 1 ?>">
            &larr; 上一頁
          </a>
        <?php } ?>
        
        <?php if ($page !== $total_page) { ?>
          <a class="style1-btn style2-btn" href="W11_hw1_board_admin(ver_session).php?page=<?php echo $page + 1 ?>">
            下一頁 &rarr;
          </a>
          <a class="end__page-btn style1-btn" href="W11_hw1_board_admin(ver_session).php?page=<?php echo $total_page ?>">末頁</a>
        <?php } ?>
      </div>
    </div>
  </main>
  <script src="./W11_hw1_board_admin(ver_session).js"></script>
</body>

</html>