
<?php
session_start();
require_once('W11_hw2_blog_conn.php');
require_once('W11_hw2_blog_utils(ver_session).php');

if (empty($_SESSION['username'])) {
  header('Location: W11_hw2_blog_index(ver_session).php');
  exit();
}

$title = $_POST['title'];
$content = $_POST['content'];
$username = $_SESSION['username'];
$user = getUsersFromUsername($username);
if (empty($user)) {
  header('Location: W11_hw2_blog_handle_logout(ver_session).php');
  exit();
}

$sql = 'INSERT INTO KWang_blog_articles(username, title, content) VALUES(?, ?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $username, $title, $content);
$result = $stmt->execute();
if (!($result)) {
  exit('Error:' . $conn->error);
}

header('Location: W11_hw2_blog_admin(ver_session).php');
?>