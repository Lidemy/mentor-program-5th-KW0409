
<?php
session_start();
require_once('W11_hw2_blog_conn.php');

if (empty($_POST['username'])) {
  header('Location: W11_hw2_blog_login(ver_session).php?errCode=1');
  exit();
} else if (empty($_POST['password'])) {
  header('Location: W11_hw2_blog_login(ver_session).php?errCode=2');
  exit();
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = 'SELECT * FROM  KWang_blog_users WHERE username = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$result = $stmt->execute();
if (empty($result)) {
  exit('Error:' . $conn->error);
}

$result = $stmt->get_result();
if ($result->num_rows === 0) {
  header('Location: W11_hw2_blog_login(ver_session).php?errCode=3');
  exit();
}

$data_arr = $result->fetch_assoc();
$hash = $data_arr['password'];
if (!password_verify($password, $hash)) {
  header('Location: W11_hw2_blog_login(ver_session).php?errCode=3');
  exit();
}

$_SESSION['username'] = $username;
header('Location: W11_hw2_blog_index(ver_session).php');
?>