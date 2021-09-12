<?php

require_once('W12_hw2_Todo_List_conn.php');

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json ; charset=utf-8');

function responseMsg($status, $msg) {
  $json = array(
    'status' => $status,
    'message' => $msg
  );

  $response = json_encode($json);
  return $response;
}

function getData($id) {
  global $conn;

  $sql = 'SELECT * FROM KWang_todo_list WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (empty($result)) {
    $status = false;
    $msg = $conn->error;
    exit(responseMsg($status, $msg));
  }
  
  $result = $stmt->get_result();
  $data_arr = $result->fetch_assoc();
  return $data_arr;
}

if (empty($_GET['id'])) {
  $status = false;
  $msg = 'Please bring up your list id in URL';
  exit(responseMsg($status, $msg));
}
$id = $_GET['id'];
$data_arr = getData($id);

if (empty($_POST['password'])) {
  // 沒有傳 password，是第一次撈資料
  if ($data_arr['password']) {
    // 若有 password 就先回傳 msg，讓前端輸入 password 之後再來撈資料
    $status = 'need password';
    $msg = 'Please enter password';
    exit(responseMsg($status, $msg));
  } else {
    // 若沒有 password，就直接回傳資料
    $list_data = array(
      'id' => $data_arr['id'],
      'password' => false,
      'list_content' => $data_arr['list_content'],
      'created_at' => $data_arr['created_at'],
      'updated_at' => $data_arr['updated_at']
    );
  }
} else {
  // 若有傳 password，是第二次撈資料
  $password = $_POST['password'];

  $hash = $data_arr['password'];
  if (password_verify($password, $hash)) {
    $list_data = array(
      'id' => $data_arr['id'],
      'password' => true,
      'list_content' => $data_arr['list_content'],
      'created_at' => $data_arr['created_at'],
      'updated_at' => $data_arr['updated_at']
    );
  } else {
    $status = false;
    $msg = 'Wrong password! Please enter your password again!';
    exit(responseMsg($status, $msg));
  }
}

$json = array(
  'status' => true,
  'message' => 'Success!',
  'list_data' => $list_data
);
$response = json_encode($json);
echo $response;

?>