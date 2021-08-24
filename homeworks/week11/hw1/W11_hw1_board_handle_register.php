
<?php
  session_start();
  require_once('W11_hw1_board_conn.php');

  if (empty($_POST['nickname'])) {
    header('Location: W11_hw1_board_register.php?errCode=1');
    exit();
  } else if (empty($_POST['username'])) {
    header('Location: W11_hw1_board_register.php?errCode=2');
    exit();
  } else if (empty($_POST['password'])) {
    header('Location: W11_hw1_board_register.php?errCode=3');
    exit();
  }

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];
  $hash = password_hash($password,PASSWORD_DEFAULT);
  
  $sql = 'INSERT INTO KWang_board_users(nickname, username, password) VALUES(?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $nickname, $username, $hash);
  $result = $stmt->execute();
  if (!($result)) {
    $code = $conn->errno;
    if ($code === 1062) {
      header('Location: W11_hw1_board_register.php?errCode=4');
      exit();
    }
    
    exit('Error:' . $conn->error);
  }

  $_SESSION['username'] = $username;
  header("Location: W11_hw1_board_index(ver_session).php");4
?>
