
<?php
session_start();
require_once('W11_hw2_blog_conn.php');
require_once('W11_hw2_blog_utils(ver_session).php');

if (empty($_GET['id'])) {
  header('Location: W11_hw2_blog_index(ver_session).php');
  exit();
}
$id = $_GET['id'];

if (empty($_SESSION['username'])) {
  header('Location: W11_hw2_blog_index(ver_session).php');
  exit();
}

$username = $_SESSION['username'];
$user = getUsersFromUsername($username);
if (empty($user)) {
  header('Location: W11_hw2_blog_handle_logout(ver_session).php');
  exit();
}

$sql = 'UPDATE KWang_blog_articles SET is_deleted = 1 WHERE id = ? AND username = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('is', $id, $username);
$result = $stmt->execute();
if (!($result)) {
  exit('Error:' . $conn->error);
}

header('Location: W11_hw2_blog_admin(ver_session).php');
?>