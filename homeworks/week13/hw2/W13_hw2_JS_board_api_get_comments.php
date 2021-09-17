<?php

require_once('W13_hw2_JS_board_conn.php');

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

// 若沒有接收到 web_key 的資料
if (empty($_GET['web_key'])) {
  $status = false;
  $str = 'Please enter the missing key';
  exit(responseMsg($status, $str));
}
$web_key = $_GET['web_key'];

// 到資料庫撈資料，並用有無 cursor 來區分是剛開始的網頁載入或是載入更多
if (!empty($_GET['cursor'])) {
  $cursor = intval($_GET['cursor']);
  $sql = 'SELECT * FROM KWang_JS_board_comments WHERE web_key = ? AND id < ? ORDER BY id DESC LIMIT 6';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $web_key, $cursor);
} else {
  $sql = 'SELECT * FROM KWang_JS_board_comments WHERE web_key = ? ORDER BY id DESC LIMIT 6';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $web_key);
}

$result = $stmt->execute();
if (empty($result)) {
  $status = false;
  $str = $conn->error;
  exit(responseMsg($status, $str));
}

$result = $stmt->get_result();

$comments = array();
while ($data_arr = $result->fetch_assoc()) {
  array_push($comments, array(
    'id' => $data_arr['id'],
    'nickname' => $data_arr['nickname'],
    'content' => $data_arr['content'],
    'created_at' => $data_arr['created_at']
  ));
}

$json = array(
  'status' => true,
  'comments' => $comments
);
$response = json_encode($json);
echo $response;

?>