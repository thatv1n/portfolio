<?php
include './db.php';
$id = $_POST['id'];
$result = $mysqli->query("SELECT * FROM `items` WHERE `category`='$id'");
$e=0;
while ($row = mysqli_fetch_assoc($result)) {
  $array[$e] = $row;
 
  $photo=explode(" ",$row['img']);
  $array[$e]['img']=$photo[0];
  $e++;
}



echo json_encode($array);
