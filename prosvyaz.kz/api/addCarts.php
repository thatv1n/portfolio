<?php
include './db.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (isset($_FILES)) {
  $title = $_POST['title'];
  $desc = $_POST['desc'];
  $price = $_POST['price'];
  $category = $_POST['category'];
  $AllRandom_key = "";
  for ($e = 0; $e < count($_FILES); $e++) {
    $random_key = uniqid();
    $den = substr(strrchr($_FILES[$e]["type"], '/'), 1);
    $random_key =  $random_key . '.' . $den;
    $uploadfile = "../src/items/" . $random_key;
    if (move_uploaded_file($_FILES[$e]['tmp_name'], $uploadfile)) {
      $AllRandom_key = $AllRandom_key . "https://prosvyaz.kz/src/items/" . $random_key . " ";
    }
  }
  $new_file = $mysqli->query("INSERT INTO `items` (`id`, `img`, `title`, `decs`, `price`, `category`) VALUES (NULL, '$AllRandom_key', '$title', '$desc', '$price','$category');");
  echo 'sucess';
}
