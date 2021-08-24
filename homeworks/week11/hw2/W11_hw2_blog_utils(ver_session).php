
<?php
require_once('W11_hw2_blog_conn.php');

function escape($str) {
  return htmlspecialchars($str, ENT_QUOTES);
}

function getUsersFromUsername($username) {
  global $conn;

  $sql = 'SELECT * FROM KWang_blog_users WHERE username = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  if (empty($result)) {
    exit('Error:' . $conn->error);
  }
  $result = $stmt->get_result();

  $data_arr = $result->fetch_assoc();
  return $data_arr;
}
