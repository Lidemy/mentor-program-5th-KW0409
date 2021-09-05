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

if (empty($_POST['list_content'])) {
  $status = false;
  $msg = 'Please bring up your list content!';
  exit(responseMsg($status, $msg));
}
$list_content = $_POST['list_content'];

if (empty($_POST['password'])) {
  $password = $_POST['password'];
} else {
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
}

if (empty($_POST['list_id'])) {
  $sql = 'INSERT INTO KWang_todo_list(password, list_content) VALUES(?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $password, $list_content);
} else {
  $sql = 'UPDATE KWang_todo_list SET password = ?, list_content = ? WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssi', $password, $list_content, $_POST['list_id']);
}

$result = $stmt->execute();
if (!($result)) {
  $status = false;
  $msg = $conn->error;
  exit(responseMsg($status, $msg));
}

if (empty($_POST['list_id'])) {
  $json = array(
    'status' => true,
    'message' => 'Success to add todo list!',
    'id' => $conn->insert_id
  );
} else {
  $json = array(
    'status' => true,
    'message' => 'Success to add todo list!',
    'id' => $_POST['list_id']
  );
}
$response = json_encode($json);
echo $response;

?>