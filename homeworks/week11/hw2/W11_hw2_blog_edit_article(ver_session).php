<?php
session_start();
require_once('W11_hw2_blog_conn.php');
require_once('W11_hw2_blog_utils(ver_session).php');

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

if (empty($_GET['id'])) {
  header('Location: W11_hw2_blog_index(ver_session).php');
  exit();
}
$id = $_GET['id'];

$sql = 'SELECT * FROM KWang_blog_articles WHERE id = ? AND username = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('is', $id, $username);
$result = $stmt->execute();
if (empty($result)) {
  exit('Error:' . $conn->error);
}

$result = $stmt->get_result();
$data_arr = $result->fetch_assoc();
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css"/>
  <link rel="stylesheet" href="W11_hw2_blog_style.css"/>
  <title>部落格 - 編輯文章頁面</title>
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='W11_hw2_blog_admin(ver_session).php'><?php echo escape($user['nickname']) ?>'s Blog</a>
      </div>

      <ul class="navbar__list">
        <div>
          <li><a href="W11_hw2_blog_index(ver_session).php">回首頁</a></li>
          <li><a href="#">分類專區(暫未開放)</a></li>
          <li><a href="#">關於我(暫未開放)</a></li>
        </div>
        
        <div>
          <span class="users__nickname">歡迎回來, <?php echo escape($user['nickname']) ?></span>
          <li><a href="W11_hw2_blog_admin(ver_session).php">管理後台</a></li>
          <li><a href="W11_hw2_blog_handle_logout(ver_session).php">登出</a></li>
        </div>
      </ul>
    </div>
  </nav>

  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>

  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <h3 class="hide error"></h3>

        <form class="add__article-form" action="W11_hw2_blog_handle_edit_article(ver_session).php" method="POST">
          <div class="edit-post__title">
            發表文章：
          </div>

          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" name="title" value="<?php echo escape($data_arr['title']) ?>" placeholder="請輸入文章標題" />
          </div>

          <div class="edit-post__input-wrapper">
            <textarea rows="20" name="content" class="edit-post__content"><?php echo escape($data_arr['content']) ?></textarea>
            <input type="hidden" name="id" value="<?php echo $id?>">
          </div>

          <div class="edit-post__btn-wrapper">
              <input type="submit" class="edit-post__btn" value="送出"></input>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
  <script src="./W11_hw2_blog_add_and_edit_article(ver_session).js"></script>
</body>
</html>