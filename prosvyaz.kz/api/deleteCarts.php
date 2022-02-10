<?php
include './db.php';
if (isset($_POST['id'])) {
  chmod('../src/upload', 0777);

  $id = $_POST['id'];

  $deleteImg = $mysqli->query("SELECT * FROM `name_files` WHERE `id` = '$id'");
  $nameFile = mysqli_fetch_assoc($deleteImg);

  $result = $mysqli->query("DELETE FROM `name_files` WHERE `name_files`.`id` ='$id'");

  $dirFile = '../src/upload/' . $nameFile['name_file'];
  unlink($dirFile);
  exit('sucess');
}
