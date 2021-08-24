
<?php
  require_once('W11_hw1_board_conn.php');

  function getUsersFromUsername($username) {
    global $conn;

    $sql = sprintf('SELECT * FROM KWang_board_users WHERE username = "%s"', $username);
    $result = $conn->query($sql);
    if (empty($result)) {
      exit('Error:' . $conn->error);
    }

    $data_arr = $result->fetch_assoc();
    return $data_arr;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
  
  function isAdmin($user) {
    $user_auth = intval($user['user_auth']);
    return $user_auth >= 1;
  }

  // $action = create, update, delete
  function actionPermission($user, $action, $target_data) {
    $user_auth = intval($user['user_auth']);

    if ($user_auth === 2) {
      if ($action === 'update') {
        if ($user['username'] === $target_data['username']) {
          // 當留言為管理員本人時，不看管理權限
          return true;
        }
        // 同層級的管理員無法管理彼此的發言
        return $user_auth > $target_data['user_auth'];
      }

      if ($action === 'manage') {
        // 同層級的管理員無法管理彼此或自己的權限
        return $user_auth > $target_data['user_auth'];
      }

      return true;
    }

    if ($user_auth === 1) {
      if ($action === 'update') {
        if ($user['username'] === $target_data['username']) {
          // 當留言為管理員本人時，不看管理權限
          return true;
        }
        // 同層級的管理員無法管理彼此的發言
        return $user_auth > $target_data['user_auth'];
      }

      if ($action === 'manage') {
        // 同層級的管理員無法管理彼此或自己的權限
        return $user_auth > $target_data['user_auth'];
      }
      
      return true;
    }

    if ($user_auth === 0) {
      if ($action === 'create') return true;
      return $user['username'] === $target_data['username'];
    }

    if ($user_auth === -1) {
      if ($action === 'create') return false;
      return $user['username'] === $target_data['username'];
    }
  }
?>
