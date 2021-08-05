
<?php

  session_start();
  require_once('W9_hw1_board_conn.php');
  require_once('W9_hw1_board_utils(ver_session).php');

  if(empty($_POST['content'])){
    header('Location: W9_hw1_board_index(ver_session).php?errCode=1');
    exit();
  }
  $content = $_POST['content'];


  if(empty($_SESSION['username'])){
    header('Location: W9_hw1_board_index(ver_session).php');
    exit();
  }
  $username = $_SESSION['username'];
  $user = getUsersFromUsername($username);
  $nickname = $user['nickname'];
  
  $sql = sprintf('INSERT INTO KWang_board_comments(nickname, content) VALUES("%s","%s")',
  $nickname,$content);

  $result = $conn->query($sql);
  if(!($result)){
    exit('Error:' . $conn->error);
  }
  
  header("Location: W9_hw1_board_index(ver_session).php");

?>
