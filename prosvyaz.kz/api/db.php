<?php
global $mysqli;

$mysqli = true;

$mysqli = new mysqli("localhost", "root", "", "prosvyaz");

if ($mysqli->connect_error) {
  echo "Нет подключения к БД. Ошибка:" . mysqli_connect_error();
  exit;
}
