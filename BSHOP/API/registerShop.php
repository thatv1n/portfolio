<?php
require "./createShopDb.php";

$nameShop = $_POST['nameShop'];
$address = $_POST['address'];
$phoneShop = str_replace(str_split('()- '), '', $_POST['phoneShop']);
$commentShop = $_POST['commentShop'];
$data = date('Y-m-d H:i:s');
$discount_type = $_POST['discount_type'];

$loginSotr = $_POST['loginSotr'];
$passSotr = $_POST['passSotr'];

if (isset($_POST['loginSotr'])) {
  $users = $mysqli->query("SELECT * FROM `USERS`");
  while ($row = mysqli_fetch_assoc($users)) {
    $loginArr[] = $row['login'];
  }

  if (!in_array($loginSotr, $loginArr)) {
    //Регистрация магазина
    $result = $mysqli->query("INSERT INTO `SHOPS` (`id`, `name`, `discount_type`, `cashback`, `image`, `adres`, `phone`, `comment`, `opisanie`, `etiketka_height`, `etiketka_code`, `check_top`, `check_bottom`, `datecreate`, `data_oplaty`, `multiAccount`, `chat_id`, `balans`, `e_mail`, `social_net`, `dolg`) VALUES (NULL, '$nameShop', '$discount_type', '0', '', '$address', '$phoneShop', '$commentShop', '', '0', 'code128', '', '', CURRENT_TIMESTAMP, '', '', '', '', '', '', '');");

    if ($result) {

      //Получение ID магазина
      $idShop = $mysqli->query("SELECT * FROM `SHOPS` WHERE `datecreate`='$data' and `name`='$nameShop' and `phone`='$phoneShop'");
      $shopId = $idShop->fetch_assoc();
      $shopIdUser = $shopId['id']; //ID магазина

      if (isset($_POST['nameSotr'])) {
        $nameSotr = $_POST['nameSotr'];
        $pravaSotr = $_POST['pravaSotr'];


        // //Добавление руководителя
        $addRuck = $mysqli->query("INSERT INTO `USERS` (`id`, `name`, `login`, `pass`, `shopId`, `prava`, `multiAccount`, `oklad`, `procent`, `zp`, `buttonclear`, `zpDay`) VALUES (NULL, '$nameSotr', '$loginSotr', '$passSotr', '$shopIdUser', '1', '', '', '', '', '', '');");

        if ($addRuck === TRUE) {
          echo "\nРуководитель создан, shopID - " . $shopIdUser . "\n";

          //Добавление таблицы buhHist
          $buhHist = "CREATE TABLE `buhHist.$shopIdUser` (id INT(11) AUTO_INCREMENT PRIMARY KEY, summa INT(11) NOT NULL,tip INT(11) NOT NULL COMMENT '1-списание,2-пополнение', comment text NOT NULL, dateCreate timestamp, userId INT(11) NOT NULL,shopId INT(11) NOT NULL,tipNal INT(11) NOT NULL COMMENT '1-нал,2-безнал')";

          if ($mysqli->query($buhHist) === TRUE) {
            echo "Таблица создана buhHist." . $shopIdUser . "\n";

            //Создание таблицы category
            $category = "CREATE TABLE `category.$shopIdUser` (id INT(11) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL,shopid INT(11) NOT NULL)";

            if ($mysqli->query($category) === TRUE) {
              echo "Таблица создана category." . $shopIdUser . "\n";

              //Создание таблицы clients 
              $clients  = "CREATE TABLE `clients.$shopIdUser` (id INT(11) AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(255) NOT NULL,name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, client_bd VARCHAR(255) NOT NULL, client_phone VARCHAR(255) NOT NULL, client_card VARCHAR(255) NOT NULL, shop_id INT(11) NOT NULL, seller_id INT(11) NOT NULL, dateCreate timestamp, procent INT(11) NOT NULL, balans INT(11) NOT NULL)";
              if ($mysqli->query($clients) === TRUE) {
                echo "Таблица создана clients." . $shopIdUser . "\n";

                //Создание таблицы goods  
                $goods  = "CREATE TABLE `goods.$shopIdUser` (id INT(11) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL,price INT(11) NOT NULL, shopid INT(11) NOT NULL, size VARCHAR(255) NOT NULL, status INT(11) NOT NULL, sellerId INT(11) NOT NULL, date timestamp, sellDate datetime NOT NULL, skidka INT(11) NOT NULL, sku VARCHAR(255) NOT NULL, photo VARCHAR(255) NOT NULL, zakupId VARCHAR(255) NOT NULL, zakupPrice VARCHAR(255) NOT NULL, qnt INT(11) NOT NULL, catId INT(11) NOT NULL)";
                if ($mysqli->query($goods) === TRUE) {
                  echo "Таблица создана goods." . $shopIdUser . "\n";

                  //Создание таблицы goodsSizes   
                  $goodsSizes  = "CREATE TABLE `goodsSizes.$shopIdUser` (id INT(11) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL,shopid INT(11) NOT NULL, size VARCHAR(255) NOT NULL, sellerId INT(11) NOT NULL, date timestamp, sellDate datetime NOT NULL, skidka INT(11) NOT NULL, goodId INT(11) NOT NULL, price INT(11) NOT NULL, status INT(11) NOT NULL, skidkaSumma INT(11) NOT NULL, sellSumma INT(11) NOT NULL, sku VARCHAR(255) NOT NULL, zakupPrice VARCHAR(255) NOT NULL, zakupId INT(11) NOT NULL, clientId INT(11) NOT NULL, tipoplaty INT(11) NOT NULL, catId INT(11) NOT NULL, discount INT(11) NOT NULL, comment VARCHAR(255) NOT NULL)";

                  if ($mysqli->query($goodsSizes) === TRUE) {
                    echo "Таблица создана goodsSizes." . $shopIdUser . "\n";

                    //Создание таблицы revision   
                    $revision  = "CREATE TABLE `revision.$shopIdUser` (id INT(11) AUTO_INCREMENT PRIMARY KEY, goodId INT(11) NOT NULL,dateRev timestamp)";

                    if ($mysqli->query($revision) === TRUE) {
                      echo "Таблица создана revision." . $shopIdUser . "\n";

                      //Создание таблицы zakup   
                      $zakup  = "CREATE TABLE `zakup.$shopIdUser` (id INT(11) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, kurs VARCHAR(255) NOT NULL, dateCreate timestamp,shopId INT(11) NOT NULL)";

                      if ($mysqli->query($zakup) === TRUE) {
                        echo "Таблица создана zakup." . $shopIdUser . "\n";
                      } else {
                        echo "Error create table zakup: " . $mysqli->error;
                      }
                    } else {
                      echo "Error create table revision: " . $mysqli->error;
                    }
                  } else {
                    echo "Error create table goodsSizes: " . $mysqli->error;
                  }
                } else {
                  echo "Error create table goods: " . $mysqli->error;
                }
              } else {
                echo "Error create table clients: " . $mysqli->error;
              }
            } else {
              echo "Error create table category: " . $mysqli->error;
            }
          } else {
            echo "Error create table buhHist: " . $mysqli->error;
          }
        } else {
          echo "\nРуководитель не создан" . $shopIdUser . "\n";
        }
      }
    } else {
      echo 'error';
    }
  } else {
    exit('Такой логин уже зарегестрирован!');
  }
}
