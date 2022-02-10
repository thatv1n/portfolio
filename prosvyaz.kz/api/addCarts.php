<?php
include './db.php';

if (isset($_FILES)) {
  $title = $_POST['title'];
  $file_name = $_FILES["files"]["name"];
  $extension = 'jpg';
  $filename = uniqid() . '.' . $extension;
  $name = "../src/upload/" . $filename;

  if (move_uploaded_file($_FILES["files"]["tmp_name"], $name)) {
    $new_file = $mysqli->query("INSERT INTO `name_files` (`id`, `name_file`, `title`) VALUES (NULL, '$filename', '$title');");
    echo 'sucess';
  }
}
