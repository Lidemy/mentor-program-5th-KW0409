
<?php

  require_once('W9_hw1_board_conn.php');

  function getUsersFromUsername($username){
    global $conn;

    $sql = sprintf('SELECT * FROM KWang_board_users WHERE username = "%s"',$username);
    $result = $conn->query($sql);
    if(empty($result)){
      exit('Error:' . $conn->error);
    }
    $data_arr = $result->fetch_assoc();

    return $data_arr;
  }
  
?>
