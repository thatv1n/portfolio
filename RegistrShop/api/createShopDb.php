<?php
$mysqli = true;
$mysqli = new mysqli("localhost", "shopperbfg", "I5d0H9u3", "shopper");

if ($mysqli->connect_error) {
  echo "Нет подключения к БД. Ошибка:" . mysqli_connect_error();
  exit;
}
