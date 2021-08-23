
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

  if (empty($_POST['content'])) {
    header('Location: W11_hw1_board_update_comment(ver_session).php?errCode=1&id=' . $_POST['id'] . '&page=' . $page);
    exit();
  }
  $id = $_POST['id'];
  $content = $_POST['content'];
  
  if (isAdmin($user)) {
    $sql = 'UPDATE KWang_board_comments SET content = ? WHERE id = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $id);
  } else {
    $sql = 'UPDATE KWang_board_comments SET content = ? WHERE id = ? AND username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
  }
  $result = $stmt->execute();
  if (!($result)) {
    exit('Error:' . $conn->error);
  }
  
  header("Location: W11_hw1_board_index(ver_session).php?page=" . $page);
?>
