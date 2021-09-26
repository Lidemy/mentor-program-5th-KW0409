<?php

require_once('W13_hw2_JS_board_conn.php');

// 這兩個 header 都要放在最前面，不然的話會變成每個回傳的資料前面都要加上這兩個 header，否則 request 會出問題
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json ; charset=utf-8');

function responseMsg($status, $str) {
  $json = array(
    'status' => $status,
    'message' => $str
  );

  $response = json_encode($json);
  return $response;
}

// 若沒有接收到 nickname, content 的資料
if (empty($_POST['web_key'])) {
  $status = false;
  $str = 'Please enter the missing key';
} else if (empty($_POST['nickname']) && empty($_POST['content'])) {
  $status = false;
  $str = 'Please enter your nickname and comment';
} else if (empty($_POST['nickname'])) {
  $status = false;
  $str = 'Please enter your nickname';
} else if (empty($_POST['content'])) {
  $status = false;
  $str = 'Please enter your comment';
} else {
  $status = true;
}

if (!$status) {
  exit(responseMsg($status, $str));
}
$web_key = $_POST['web_key'];
$nickname = $_POST['nickname'];
$content = $_POST['content'];

$sql = 'INSERT INTO KWang_JS_board_comments(web_key, nickname, content) VALUES(?, ?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $web_key, $nickname, $content);
$result = $stmt->execute();
// 若 sql query 執行失敗(例如：username 的欄位是 unique，但輸入了重複的 username，是 sql 執行失敗而非 sql 語法有錯)
// 如果是 sql 語法有錯，會在執行到 43, 44 行時就出問題
if (!($result)) {
  $status = false;
  $str = $conn->error;
  exit(responseMsg($status, $str));
}

// 若 sql query 執行成功
$status = true;
$str = 'Success to add Comments!';
echo responseMsg($status, $str);

?>