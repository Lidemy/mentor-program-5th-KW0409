
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
  $id = $_GET['id'];
  $username = $_SESSION['username'];
  $user = getUsersFromUsername($username);
  
  if (isAdmin($user)) {
    $sql = 'UPDATE KWang_board_comments SET is_deleted = 1 WHERE id = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
  } else {
    $sql = 'UPDATE KWang_board_comments SET is_deleted = 1 WHERE id = ? AND username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
  }
  $result = $stmt->execute();
  if (!($result)) {
    exit('Error:' . $conn->error);
  }
  
  header("Location: W11_hw1_board_index(ver_session).php?page=" . $page);
?>
