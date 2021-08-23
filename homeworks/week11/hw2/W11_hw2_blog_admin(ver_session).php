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

$page = 1;
if (!empty($_GET['page'])) {
  $page = intval($_GET['page']);
}
$num_per_page = 5;
$offset = ($page - 1) * $num_per_page;

$sql = 'SELECT * FROM KWang_blog_articles WHERE username = ? AND is_deleted IS NULL ORDER BY id DESC LIMIT ? OFFSET ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sii', $username, $num_per_page, $offset);
$result = $stmt->execute();
if (empty($result)) {
  exit('Error:' . $conn->error);
}

$result = $stmt->get_result();
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css"/>
  <link rel="stylesheet" href="W11_hw2_blog_style.css"/>
  <title>部落格 - 後台頁面</title>
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
          <li><a href="W11_hw2_blog_add_article(ver_session).php">新增文章</a></li>
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
      <?php while ($data_arr = $result->fetch_assoc()) { ?>
        <?php static $switch_num = 1; ?>
        <div class="admin-posts">
          <div class="admin-post">
            <div class="admin-post__title">
              <a class="article__link" target="_blank" href="W11_hw2_blog_article_page(ver_session).php?id=<?php echo escape($data_arr['id']) ?>"><?php echo escape($data_arr['title']) ?></a>
            </div>
            
            <div class="admin-post__info">
              <div class="switch">
                <input class="switch-checkbox" id="switchID<?php echo $switch_num ?>" type="checkbox" name="switch-checkbox" checked>
                <label class="switch-label" for="switchID<?php echo $switch_num ?>">
                  <span class="switch-txt" turnOn="顯示" turnOff="隱藏"></span>
                  <span class="switch-Round-btn"></span>
                </label>
              </div>

              <div class="admin-post__created-at">
                <?php echo escape($data_arr['created_at'])?>
              </div>

              <a class="admin-post__btn edit" href="W11_hw2_blog_edit_article(ver_session).php?id=<?php echo escape($data_arr['id'])?>">
                編輯
              </a>
              <a class="admin-post__btn delete" href="W11_hw2_blog_handle_delete_article(ver_session).php?id=<?php echo escape($data_arr['id'])?>">
                刪除
              </a>
            </div>
          </div>
        </div>
        <?php $switch_num ++; ?>
      <?php } ?>
    </div>
  </div>

  <div class="page__btn-area">
    <?php
      $sql = 'SELECT count(id) as total_articles FROM KWang_blog_articles WHERE username = ?';
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('s', $username);
      $result = $stmt->execute();
      if (empty($result)) {
        exit('Error: ' . $conn->error);
      }

      $result = $stmt->get_result();
      $data_arr = $result->fetch_assoc();

      $total_articles = $data_arr['total_articles'];
      $total_page = intval(ceil($total_articles / $num_per_page));
    ?>

    <?php if ($page !== 1) { ?>
      <a class="top__page-btn style1-btn" href="W11_hw2_blog_admin(ver_session).php?page=1">首頁</a>
      <a class="style1-btn style2-btn" href="W11_hw2_blog_admin(ver_session).php?page=<?php echo $page - 1 ?>">
        &larr; 上一頁
      </a>
    <?php } ?>
    
    <?php if ($page !== $total_page) { ?>
      <a class="style1-btn style2-btn" href="W11_hw2_blog_admin(ver_session).php?page=<?php echo $page + 1 ?>">
        下一頁 &rarr;
      </a>
      <a class="end__page-btn style1-btn" href="W11_hw2_blog_admin(ver_session).php?page=<?php echo $total_page ?>">末頁</a>
    <?php } ?>
  </div>
  
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>