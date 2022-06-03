<?
date_default_timezone_set("Asia/Dhaka");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../phpmailer/src/Exception.php';
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';

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
$mail->Username = 'info.bshop.kz@gmail.com'; //реальная gmail почта
$mail->Password = 'ixueenlygiubzozo'; //реальный пароль от этой почты
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

// Адрес самой почты и имя отправителя
$mail->setFrom('info.bshop.kz@gmail.com', 'Bshop');

// Адрес самой почты и получателя
$mail->addAddress('bfgroup.adm@gmail.com');

$mail->Subject = 'Анкета клиента';

if (isset($_POST['preRegistr'])) {

  $mail->msgHTML("<html><body>
                <center>
                <table style='border:1px solid; font-size:1.3vw;'>
                <tbody>
                  <tr>
                    <td  style='border-bottom:1px solid;'><b>Дата регистрации:</b></td>
                    <td  style='border-bottom:1px solid;'>" . date('Y-m-d H:i:s') . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>ФИО:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['reg_FIO'] . "</td>
                  </tr>
                  <tr>
                  <td style='border-bottom:1px solid;'><b>Email:</b></td>
                  <td style='border-bottom:1px solid;'>" . $_POST['reg_MAIL'] . "</td>
                </tr>
                  <tr>
                    <td><b>Телефон:</b></td>
                    <td>" . $_POST['reg_PHONE'] . "</td>
                  </tr>
                </tbody>
              </table>
                </center>
               
                </html></body>");
} else {

  if ($_POST['question'] == 'ТОО') {
    $tipIp = 'ТОО';
  }
  if ($_POST['question'] == 'ИП') {
    $tipIp = 'ИП';
  }
  if ($_POST['question'] == '') {
    $tipIp = 'Не указано';
  }


  $mail->msgHTML("<html><body>
                <center>
                <table style='border:1px solid; font-size:1.3vw;'>
                <tbody>
                  <tr>
                    <td  style='border-bottom:1px solid;'><b>Дата регистрации:</b></td>
                    <td  style='border-bottom:1px solid;'>" . date('Y-m-d H:i:s') . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>Название бутика:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['NAME'] . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>Форма:</b></td>
                    <td style='border-bottom:1px solid;'>" . $tipIp  . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>Название:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['TD'] . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>Ревкизиты:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['PROP'] . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>Адрес юридический:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['reg_ADDRESS'] . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>Адрес фактический:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['reg_ADDRESS_ACTUAL'] . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>Номер бутика:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['reg_NUMBER'] . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>ФИО Руководителя:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['reg_FIO'] . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>Дата рождения руководителя:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['reg_BZD'] . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>Телефон руководителя:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['reg_PHONE'] . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>Email руководителя:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['reg_EMAIL'] . "</td>
                  </tr>
                  <tr>
                    <td style='border-bottom:1px solid;'><b>Тел. сотрудника кто имеет доступ к программе:</b></td>
                    <td style='border-bottom:1px solid;'>" . $_POST['reg_PHONE_EMPLOYEE'] . "</td>
                  </tr>
                  <tr>
                    <td><b>ФИО сотрудника:</b></td>
                    <td>" . $_POST['reg_FIO_EMPLOYEE'] . "</td>
                  </tr>
                </tbody>
              </table>
                </center>
               
                </html></body>");
}

if ($mail->send()) {
  echo 'Письмо отправлено!';
} else {
  echo 'Ошибка: ' . $mail->ErrorInfo;
}
