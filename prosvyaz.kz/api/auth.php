<?php
include './db.php';
session_start();

function auth($login, $password)
{
  global $mysqli;
  $result = $mysqli->query("SELECT * FROM `admins` WHERE `login`='$login' AND `password`='$password'");
  $admins = $result->fetch_assoc();

  if ($login == $admins['login'] && $password == $admins['password']) {
    $arr = ["login" => $login, "password" => $password, "prava" => $admins['prava']];
    echo json_encode($arr);
  } else {
    exit('error');
  }
}

auth($_POST['login'], $_POST['password']);
