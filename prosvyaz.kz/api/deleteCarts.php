<?php
include './db.php';
if (isset($_POST['id'])) {
  chmod('../src/upload', 0777);

  $id = $_POST['id'];
  $deleteImg = $mysqli->query("SELECT * FROM `items` WHERE `id` = '$id'");
  $nameFile = mysqli_fetch_assoc($deleteImg);

  $result = $mysqli->query("DELETE FROM `items` WHERE `id` ='$id'");

  $dirFile = '../src/items/' . $nameFile['img'];
  unlink($dirFile);
  exit('sucess');
}
