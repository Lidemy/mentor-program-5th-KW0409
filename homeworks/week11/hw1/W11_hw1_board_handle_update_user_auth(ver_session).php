
<?php
  session_start();
  require_once('W11_hw1_board_conn.php');
  require_once('W11_hw1_board_utils(ver_session).php');
  
  $page = 1;
  if (!empty($_POST['page'])) {
    $page = $_POST['page'];
  }

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

  // 如果用 empty 來判斷的話，0 也會被當作是 empty
  if (!isset($_POST['user_auth']) || empty($_POST['id'])) {
    header('Location: W11_hw1_board_handle_logout(ver_session).php');
    exit();
  }
  $id = $_POST['id'];
  $user_auth = $_POST['user_auth'];
  
  $sql = 'UPDATE KWang_board_users SET user_auth = ? WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $user_auth, $id);
  $result = $stmt->execute();
  if (!($result)) {
    exit('Error:' . $conn->error);
  }
  
  header("Location: W11_hw1_board_admin(ver_session).php?page=" . $page);
  
  // 同時有兩個 prepare statement 在同一個檔案時，前一個 prepare statement 的最後一定要加上 $stmt->get_result() 才會讓這個 prepare statement 完全結束，下一個 prepare statement 才能正常執行(不加的話，下一個 prepare statement 在 $conn->prepare($sql) 時會出錯，並回傳 false)
?>
