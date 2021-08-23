
<?php
  session_start();
  require_once('W11_hw1_board_conn.php');
  require_once('W11_hw1_board_utils(ver_session).php');

  if (empty($_POST['content'])) {
    header('Location: W11_hw1_board_index(ver_session).php?errCode=1');
    exit();
  }
  $content = $_POST['content'];

  if (empty($_SESSION['username'])) {
    header('Location: W11_hw1_board_index(ver_session).php');
    exit();
  }
  $username = $_SESSION['username'];
  $user = getUsersFromUsername($username);
  
  if (!actionPermission($user, 'create', null)) {
    header('Location: W11_hw1_board_index(ver_session).php');
    exit();
  }
  
  $sql = 'INSERT INTO KWang_board_comments(username, content) VALUES(?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $content);
  $result = $stmt->execute();
  if (!($result)) {
    exit('Error:' . $conn->error);
  }
  
  header('Location: W11_hw1_board_index(ver_session).php');
?>
