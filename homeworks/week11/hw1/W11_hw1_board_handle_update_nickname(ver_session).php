
<?php
  session_start();
  require_once('W11_hw1_board_conn.php');

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }

  if (empty($_POST['nickname'])) {
    header('Location: W11_hw1_board_index(ver_session).php?errCode=2&page=' . $page);
    exit();
  }
  $nickname = $_POST['nickname'];

  if (empty($_SESSION['username'])) {
    header('Location: W11_hw1_board_index(ver_session).php');
    exit();
  }
  $username = $_SESSION['username'];
  
  $sql = 'UPDATE KWang_board_users SET nickname=? WHERE username=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();
  if (!($result)) {
    exit('Error:' . $conn->error);
  }
  
  header("Location: W11_hw1_board_index(ver_session).php?page=" . $page);
?>
