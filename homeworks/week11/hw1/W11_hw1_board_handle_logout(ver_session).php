<?php
  session_start();
  session_destroy();
  header("Location: W11_hw1_board_index(ver_session).php");
?>