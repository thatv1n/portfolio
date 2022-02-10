<?php
include './db.php';
$result = $mysqli->query("SELECT * FROM `name_files`");

while ($row = mysqli_fetch_assoc($result)) {
  $array[] = $row;
}
echo json_encode($array);
