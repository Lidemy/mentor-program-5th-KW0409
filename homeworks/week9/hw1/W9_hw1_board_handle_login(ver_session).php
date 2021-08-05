
<?php

  session_start();
  require_once('W9_hw1_board_conn.php');

  if(empty($_POST['username'])){
    header('Location: W9_hw1_board_login.php?errCode=1');
    exit();
  }else if(empty($_POST['password'])){
    header('Location: W9_hw1_board_login.php?errCode=2');
    exit();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf('SELECT * FROM KWang_board_users WHERE username="%s" AND password="%s"',
  $username,$password);

  $result = $conn->query($sql);
  if(empty($result)){
    exit('Error:' . $conn->error);
  }
  
  if($result->num_rows === 0){
    header('Location: W9_hw1_board_login.php?errCode=4');
  }else {
    $_SESSION['username'] = $username;
    header("Location: W9_hw1_board_index(ver_session).php");
  }
?>
