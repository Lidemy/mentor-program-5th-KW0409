
<?php
session_start();
require_once('W11_hw2_blog_conn.php');
require_once('W11_hw2_blog_utils(ver_session).php');

$username = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $user = getUsersFromUsername($username);
  if (empty($user)) {
    header('Location: W11_hw2_blog_handle_logout(ver_session).php');
    exit();
  }
}

if (empty($_GET['id'])) {
  header('Location: W11_hw2_blog_index(ver_session).php');
  exit();
}
$id = $_GET['id'];

$sql = 
'SELECT ' .
  'A.id as id, A.username as username, A.title as title, A.content as content, A.created_at as created_at, ' . 'U.nickname as nickname, U.username as username ' .
'FROM KWang_blog_articles as A ' .
'LEFT JOIN KWang_blog_users as U ' .
'ON A.username = U.username ' .
'WHERE is_deleted IS NULL AND A.id = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
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
  <title>部落格 - 文章頁面</title>
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='W11_hw2_blog_index(ver_session).php'>Blog</a>
      </div>

      <ul class="navbar__list">
        <div>
          <li><a href="W11_hw2_blog_article_list(ver_session).php">文章列表</a></li>
          <li><a href="#">分類專區(暫未開放)</a></li>
        </div>
        
        <?php if ($username) {?>
          <div>
            <span class="users__nickname">歡迎回來, <?php echo escape($user['nickname']) ?></span>
            <li><a href="W11_hw2_blog_admin(ver_session).php">管理後台</a></li>
            <li><a href="W11_hw2_blog_handle_logout(ver_session).php">登出</a></li>
          </div>
        <?php } else { ?>
          <div>
            <li><a href="W11_hw2_blog_login(ver_session).php">登入</a></li>
            <li><a href="W11_hw2_blog_register(ver_session).php">註冊</a></li>
          </div>
        <?php } ?>
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
    <div class="posts">
      <article class="post">
        <?php if ($data_arr) { ?>
          <div class="post__header">
            <div>
              <?php echo escape($data_arr['title']) ?>
            </div>

            <?php if ($username === $data_arr['username']) {?>
              <div class="post__actions">
                <a class="post__action" href="W11_hw2_blog_edit_article(ver_session).php?id=<?php echo escape($data_arr['id'])?>">編輯</a>
              </div>
            <?php } ?>
          </div>

          <div class="post__author-info">
            Posted by 
            <a class="post__author-link" href="W11_hw2_blog_author_page(ver_session).php?author_name=<?php echo escape($data_arr['username']) ?>&author_nickname=<?php echo escape($data_arr['nickname']) ?>">
              <?php echo escape($data_arr['nickname']) ?>
            </a>
          </div>

          <div class="post__info">
            <?php echo escape($data_arr['created_at']) ?>
          </div>

          <div class="post__content">
            <?php echo escape($data_arr['content']) ?>
          </div>
        <?php } else { ?>
          <h3 class="error">
            <?php echo '此文章不存在或是已遭作者刪除' ?>
          </h3>
        <?php } ?>
      </article>
    </div>
  </div>
  
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>