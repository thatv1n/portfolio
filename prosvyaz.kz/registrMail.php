<?
date_default_timezone_set("Asia/Dhaka");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);



$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';

$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);
// Настройки вашей почты
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';

$mail->SMTPAuth = true;
$mail->Username = 'info.prosvyaz@gmail.com'; //реальная gmail почта
$mail->Password = 'lugvpbczwxyfwjxt'; //сгенерирванный пароль, почта->аккаунт-> безопасность->пароль приложения
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

// Адрес самой почты и имя отправителя
$mail->setFrom('info.prosvyaz@gmail.com', 'ПРОСВЯЗЬ');

// Адрес самой почты и получателя
$mail->addAddress('prosvyaz2012@mail.ru');


$mail->Subject = 'Заявка';

$mail->msgHTML("<html><body>
                <center>
                <table style='border:1px solid; font-size:1.3vw;'>
                <tbody>
                  <tr>
                    <td  style='border-bottom:1px solid;'><b>Дата отправки:</b></td>
                    <td  style='border-bottom:1px solid;'>" . date('Y-m-d H:i:s') . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>Имя:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['sender_name'] . "</td>
                  </tr>
                  <tr>
                    <td><b>Телефон:</b></td>
                    <td>" . $_POST['sender_phone'] . "</td>
                  </tr>
                </tbody>
              </table>
                </center>
                </html></body>");



if ($mail->send()) {
  echo 'Письмо отправлено!';
} else {
  echo 'Ошибка: ' . $mail->ErrorInfo;
}
