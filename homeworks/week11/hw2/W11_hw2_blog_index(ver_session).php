
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

$page = 1;
if (!empty($_GET['page'])) {
  $page = intval($_GET['page']);
}
$num_per_page = 5;
$offset = ($page - 1) * $num_per_page;

$sql = 
'SELECT ' .
  'A.id as id, A.title as title, A.content as content, A.created_at as created_at, ' .
  'U.nickname as nickname, U.username as username ' .
'FROM KWang_blog_articles as A ' .
'LEFT JOIN KWang_blog_users as U '.
'ON A.username = U.username ' .
'WHERE is_deleted IS NULL ' .
'ORDER BY id DESC ' .
'LIMIT ? OFFSET ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $num_per_page, $offset);
$result = $stmt->execute();
if (empty($result)) {
  exit('Error:' . $conn->error);
}

$result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css"/>
  <link rel="stylesheet" href="W11_hw2_blog_style.css"/>
  <title>部落格 - 首頁</title>
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href="W11_hw2_blog_index(ver_session).php">Blog</a>
      </div>

      <ul class="navbar__list">
        <div>
          <li><a href="W11_hw2_blog_article_list(ver_session).php">文章列表</a></li>
          <li><a href="#">分類專區(暫未開放)</a></li>
        </div>

        <?php if ($username) { ?>
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
      <?php while ($data_arr = $result->fetch_assoc()) { ?>
        <article class="post">
          <div class="post__header">
            <div><?php echo escape($data_arr['title']) ?></div>
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

          <div class="post__content post__content-hide"><?php echo escape($data_arr['content']) ?></div>
          <a class="btn-read-more" target="_blank" href="W11_hw2_blog_article_page(ver_session).php?id=<?php echo escape($data_arr['id']) ?>">READ MORE</a>
        </article>
      <?php } ?>
    </div>
  </div>

  <div class="page__btn-area">
    <?php
      $sql = 'SELECT count(id) as total FROM KWang_blog_articles';
      $stmt = $conn->prepare($sql);
      $result = $stmt->execute();
      if (empty($result)) {
        exit('Error:' . $conn->error);
      }

      $result = $stmt->get_result();
      $data_arr = $result->fetch_assoc();
      $total_num = $data_arr['total'];
      $total_page = intval(ceil($total_num / $num_per_page));
    ?>

    <?php if ($page !== 1) { ?>
      <a class="top__page-btn style1-btn" href="W11_hw2_blog_index(ver_session).php?page=1">首頁</a>
      <a class="style1-btn style2-btn" href="W11_hw2_blog_index(ver_session).php?page=<?php echo $page - 1 ?>">
        &larr; 上一頁
      </a>
    <?php } ?>
    
    <?php if ($page !== $total_page) { ?>
      <a class="style1-btn style2-btn" href="W11_hw2_blog_index(ver_session).php?page=<?php echo $page + 1 ?>">
        下一頁 &rarr;
      </a>
      <a class="end__page-btn style1-btn" href="W11_hw2_blog_index(ver_session).php?page=<?php echo $total_page ?>">末頁</a>
    <?php } ?>
  </div>
  
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>