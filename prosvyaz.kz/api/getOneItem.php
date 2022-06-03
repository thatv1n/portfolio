<?php
include './db.php';
$id = $_POST['id'];
$result = $mysqli->query("SELECT * FROM `items` WHERE `id`='$id'");
$e = 0;
while ($row = mysqli_fetch_assoc($result)) {
  $array[$e] = $row;

  $photo = explode(" ", $row['img']);
  array_pop($photo);
  $array[$e]['img'] = $photo;
  $e++;
}



echo json_encode($array);
