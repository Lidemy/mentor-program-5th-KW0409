
<?php
  require_once('W9_hw1_board_conn.php');

  if (empty($_POST['nickname'])) {
    header('Location: W9_hw1_board_register.php?errCode=1');
    exit();
  } else if (empty($_POST['username'])) {
    header('Location: W9_hw1_board_register.php?errCode=2');
    exit();
  } else if (empty($_POST['password'])) {
    header('Location: W9_hw1_board_register.php?errCode=3');
    exit();
  }

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf('INSERT INTO KWang_board_users(nickname, username, password) VALUES("%s","%s","%s")',
  $nickname,$username,$password);

  $result = $conn->query($sql);
  if (!($result)) {
    $code = $conn->errno;
    if ($code === 1062) {
      header('Location: W9_hw1_board_register.php?errCode=4');
      exit();
    }
    
    exit('Error:' . $conn->error);
  }
  
  header("Location: W9_hw1_board_login.php");
?>
