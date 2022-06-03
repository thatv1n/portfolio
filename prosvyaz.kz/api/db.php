<?php
global $mysqli;

$mysqli = true;

$mysqli = new mysqli("localhost", "prosvyaz", "cP9qJ1aV9m", "prosvyaz");

if ($mysqli->connect_error) {
  echo "Нет подключения к БД. Ошибка:" . mysqli_connect_error();
  exit;
}
